// 주문 페이지 파일
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCartItems, hasAccessToken } from "../api/cart";
import { createOrder } from "../api/orders";
import { failTossPayment } from "../api/payments";
import { getImagePath } from "../utils/imagePath";

const shippingOptions = [
  {
    value: "SAVER",
    name: "알뜰배송",
    description: "문앞까지 비대면 배송",
    notice: "조립 서비스 이용불가",
    price: 29000,
  },
  {
    value: "STANDARD",
    name: "일반배송",
    description: "집안까지 대면 배송",
    notice: "",
    price: 34000,
  },
  {
    value: "CUSTOM",
    name: "맞춤배송",
    description: "지정한 시간에 집안까지 대면배송",
    notice: "",
    price: 39000,
  },
];

const getLoginUser = () => {
  try {
    return JSON.parse(localStorage.getItem("loginUser")) ?? {};
  } catch {
    return {};
  }
};

const getPaymentUrl = (path) =>
  `${window.location.origin}${import.meta.env.BASE_URL}${path}`;

const getTossCustomerKey = (loginUser, deliveryInfo) => {
  if (loginUser.id) {
    return `USER-${loginUser.id}`;
  }

  return loginUser.email || deliveryInfo.email;
};

function OrderPage() {
  const navigate = useNavigate();
  const loginUser = getLoginUser();
  const [cartItems, setCartItems] = useState([]);
  const [checkoutStep, setCheckoutStep] = useState("shipping");
  const [completedSteps, setCompletedSteps] = useState({
    shipping: false,
    deliveryInfo: false,
  });
  const [shippingMethod, setShippingMethod] = useState("SAVER");
  const [deliveryInfo, setDeliveryInfo] = useState({
    email: loginUser.email ?? "",
    phone: loginUser.phone ?? "",
    receiverName: loginUser.name ?? "",
    address: "",
    detailAddress: "",
  });
  const [message, setMessage] = useState("");
  const [isOrdering, setIsOrdering] = useState(false);

  useEffect(() => {
    // 토큰이 없으면 주문 페이지 접근 전에 로그인 페이지로 이동
    if (!hasAccessToken()) {
      alert("주문은 로그인 후 이용할 수 있습니다.");
      navigate("/login");
      return;
    }

    getCartItems()
      .then((data) => {
        setCartItems(
          data.map((item) => ({
            id: item.productId,
            title: item.title,
            price: item.price,
            image: item.image,
            note: item.note,
            quantity: item.quantity,
          })),
        );
      })
      .catch(() => {
        setMessage("주문할 상품을 불러오지 못했습니다.");
      });
  }, [navigate]);

  const selectedShipping = useMemo(
    () => shippingOptions.find((option) => option.value === shippingMethod),
    [shippingMethod],
  );

  const productTotalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalPrice = productTotalPrice + selectedShipping.price;
  const canOrder = completedSteps.deliveryInfo && cartItems.length > 0;

  const handleDeliveryChange = (event) => {
    const { name, value } = event.target;

    setDeliveryInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const completeShipping = () => {
    setCompletedSteps({
      shipping: true,
      deliveryInfo: false,
    });
    setCheckoutStep("deliveryInfo");
  };

  const completeDeliveryInfo = () => {
    if (
      !deliveryInfo.email ||
      !deliveryInfo.phone ||
      !deliveryInfo.receiverName ||
      !deliveryInfo.address ||
      !deliveryInfo.detailAddress
    ) {
      setMessage("배송 정보를 모두 입력해주세요.");
      return;
    }

    setMessage("");
    setCompletedSteps({
      shipping: true,
      deliveryInfo: true,
    });
  };

  const handleCreateOrder = async () => {
    const clientKey = import.meta.env.VITE_TOSS_CLIENT_KEY;

    if (!clientKey) {
      setMessage("VITE_TOSS_CLIENT_KEY를 .env에 설정해주세요.");
      return;
    }

    setMessage("");
    setIsOrdering(true);

    let createdOrder = null;

    try {
      createdOrder = await createOrder({
        shippingMethod,
        email: deliveryInfo.email,
        phone: deliveryInfo.phone,
        receiverName: deliveryInfo.receiverName,
        address: deliveryInfo.address,
        detailAddress: deliveryInfo.detailAddress,
      });

      const tossPayments = await loadTossPayments(clientKey);
      const widgets = tossPayments.widgets({
        customerKey: getTossCustomerKey(loginUser, deliveryInfo),
      });
      const tossOrderId = `ORDER-${createdOrder.id}`;
      const orderName =
        cartItems.length > 1
          ? `${cartItems[0].title} 외 ${cartItems.length - 1}건`
          : cartItems[0].title;

      // 서버에서 주문을 먼저 만들고, DB 기준 금액을 토스 결제위젯에 설정
      await widgets.setAmount({
        currency: "KRW",
        value: createdOrder.totalPrice,
      });

      const paymentWindow = await widgets.renderPaymentWindow();

      paymentWindow.on("paymentRequest", async () => {
        await widgets.requestPayment({
          orderId: tossOrderId,
          orderName,
          customerName: deliveryInfo.receiverName,
          customerEmail: deliveryInfo.email,
          successUrl: getPaymentUrl("payment/success"),
          failUrl: getPaymentUrl("payment/fail"),
        });
      });
    } catch (error) {
      if (createdOrder) {
        await failTossPayment({
          orderId: `ORDER-${createdOrder.id}`,
          code: "PAYMENT_WINDOW_FAILED",
          message: error.message,
        }).catch(() => {});
      }

      setMessage(error.message);
      setIsOrdering(false);
    }
  };

  if (isOrdering) {
    return (
      <div className="flex min-h-[520px] items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-[420px] bg-white px-8 py-10 text-center shadow-sm">
          <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
          <h1 className="text-2xl font-bold">결제창을 준비하고 있습니다</h1>
          <p className="mt-3 text-sm text-gray-600">
            주문 금액과 재고를 확인한 뒤 토스 결제창으로 이동합니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid w-full gap-8 bg-white p-4 md:grid-cols-[minmax(0,1fr)_420px] md:p-8">
      <section className="min-w-0">
        <h1 className="mb-6 text-3xl font-bold">주문 정보</h1>

        <CheckoutSection
          title="배송방법 선택"
          isCompleted={completedSteps.shipping}
          isActive={checkoutStep === "shipping"}
          summary={`${selectedShipping.name} · ${selectedShipping.price.toLocaleString()}원`}
          onEdit={() => {
            setCompletedSteps({
              shipping: false,
              deliveryInfo: false,
            });
            setCheckoutStep("shipping");
          }}
        >
          <div className="grid gap-3">
            {shippingOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`w-full rounded-[4px] border px-5 py-4 text-left transition ${
                  shippingMethod === option.value
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300 bg-white hover:border-gray-600"
                }`}
                onClick={() => setShippingMethod(option.value)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-bold">{option.name}</p>
                    <p className="mt-1 text-sm text-gray-700">
                      {option.description}
                    </p>
                    {option.notice && (
                      <p className="mt-1 text-xs text-gray-400">
                        {option.notice}
                      </p>
                    )}
                  </div>
                  <p className="font-bold">{option.price.toLocaleString()}원</p>
                </div>
              </button>
            ))}
          </div>
          <button
            type="button"
            className="mt-5 h-12 rounded-full bg-blue-600 px-7 font-bold text-white hover:bg-blue-700"
            onClick={completeShipping}
          >
            계속
          </button>
        </CheckoutSection>

        <CheckoutSection
          title="상세정보 입력"
          isCompleted={completedSteps.deliveryInfo}
          isActive={checkoutStep === "deliveryInfo"}
          summary={`${deliveryInfo.receiverName || "이름 미입력"} · ${
            deliveryInfo.address || "주소 미입력"
          }`}
          onEdit={() => {
            setCompletedSteps({
              shipping: true,
              deliveryInfo: false,
            });
            setCheckoutStep("deliveryInfo");
          }}
        >
          <div className="grid gap-4">
            <CheckoutInput
              label="이메일"
              name="email"
              type="email"
              value={deliveryInfo.email}
              onChange={handleDeliveryChange}
            />
            <CheckoutInput
              label="전화번호"
              name="phone"
              value={deliveryInfo.phone}
              onChange={handleDeliveryChange}
            />
            <CheckoutInput
              label="이름"
              name="receiverName"
              value={deliveryInfo.receiverName}
              onChange={handleDeliveryChange}
            />
            <CheckoutInput
              label="주소"
              name="address"
              value={deliveryInfo.address}
              onChange={handleDeliveryChange}
            />
            <CheckoutInput
              label="상세주소"
              name="detailAddress"
              value={deliveryInfo.detailAddress}
              onChange={handleDeliveryChange}
            />
          </div>
          <button
            type="button"
            className="mt-5 h-12 rounded-full bg-blue-600 px-7 font-bold text-white hover:bg-blue-700"
            onClick={completeDeliveryInfo}
          >
            계속
          </button>
        </CheckoutSection>

        {message && (
          <p className="mt-4 rounded-[4px] bg-white px-4 py-3 text-sm font-bold text-gray-800">
            {message}
          </p>
        )}
      </section>

      <aside className="h-fit bg-white px-5 py-6 shadow-sm md:sticky md:top-4">
        <h2 className="mb-5 text-xl font-bold">주문내역</h2>

        <div className="grid gap-4 border-b border-gray-200 pb-5">
          {cartItems.map((item) => (
            <div key={item.id} className="grid grid-cols-[72px_1fr] gap-3">
              <img
                src={getImagePath(item.image)}
                alt={item.title}
                className="h-[72px] w-[72px] rounded object-cover"
                loading="lazy"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">{item.title}</p>
                <p className="mt-1 text-xs text-gray-500">수량 {item.quantity}</p>
                <p className="mt-2 text-sm font-bold">
                  {(item.price * item.quantity).toLocaleString()}원
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-3 border-b border-gray-300 py-5 text-sm">
          <SummaryRow label="제품가격" value={productTotalPrice} />
          <SummaryRow label="배송비" value={selectedShipping.price} />
          <SummaryRow label="합계" value={totalPrice} isStrong />
        </div>

        <button
          type="button"
          disabled={!canOrder}
          className={`mt-6 flex w-full items-center justify-between rounded-[4px] px-6 font-bold text-white transition-all ${
            canOrder
              ? "cursor-pointer bg-blue-600 py-8 hover:bg-blue-700"
              : "cursor-not-allowed bg-gray-300 py-6"
          }`}
          onClick={handleCreateOrder}
        >
          <span className="text-[0.8rem] font-semibold">결제하기</span>
          <i className="fas fa-arrow-right"></i>
        </button>
      </aside>
    </div>
  );
}

function CheckoutSection({
  title,
  isCompleted,
  isActive,
  summary,
  onEdit,
  children,
}) {
  return (
    <div
      className={`mb-4 overflow-hidden rounded-[4px] border border-gray-300 bg-white transition-all duration-300 ${
        isCompleted && !isActive ? "max-h-[90px]" : "max-h-[760px]"
      }`}
    >
      <div className="flex items-center justify-between px-5 py-4">
        <div>
          <h3 className="font-bold">{title}</h3>
          {isCompleted && !isActive && (
            <p className="mt-1 text-sm text-gray-600">{summary}</p>
          )}
        </div>
        {isCompleted && (
          <button
            type="button"
            className="rounded-full border border-gray-800 px-4 py-2 text-sm font-bold hover:border-gray-500"
            onClick={onEdit}
          >
            수정
          </button>
        )}
      </div>

      {isActive && (
        <div className="border-t border-gray-200 px-5 py-5">{children}</div>
      )}
    </div>
  );
}

function CheckoutInput({ label, name, value, onChange, type = "text" }) {
  return (
    <label className="block">
      <span className="text-sm font-bold">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="mt-2 h-12 w-full rounded-[4px] border border-gray-400 px-4 outline-none focus:border-black"
      />
    </label>
  );
}

function SummaryRow({ label, value, isStrong = false }) {
  return (
    <div
      className={`flex justify-between ${
        isStrong ? "text-lg font-bold" : "text-gray-600"
      }`}
    >
      <span>{label}</span>
      <span>{value.toLocaleString()}원</span>
    </div>
  );
}

export default OrderPage;
