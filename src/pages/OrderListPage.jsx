// 주문 목록 페이지 파일
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getOrders } from "../api/orders";
import { getImagePath } from "../utils/imagePath";

function OrderListPage() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    getOrders()
      .then((data) => {
        setOrders(data);
        setMessage("");
      })
      .catch((error) => {
        setMessage(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [accessToken]);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="bg-white px-4 py-10">
      <div className="mx-auto max-w-[1040px]">
        <p className="text-sm font-bold text-blue-700">IKEA Family</p>
        <h1 className="mt-3 text-3xl font-bold">주문 목록</h1>

        {isLoading && (
          <p className="mt-8 rounded-[4px] bg-gray-100 px-4 py-4 text-sm font-bold">
            주문 목록을 불러오는 중입니다.
          </p>
        )}

        {!isLoading && message && (
          <p className="mt-8 rounded-[4px] bg-gray-100 px-4 py-4 text-sm font-bold">
            {message}
          </p>
        )}

        {!isLoading && !message && orders.length === 0 && (
          <p className="mt-8 text-sm text-gray-600">주문 내역이 없습니다.</p>
        )}

        <div className="mt-8 grid gap-5">
          {orders.map((order) => (
            <article
              key={order.id}
              className="rounded-[4px] border border-gray-200 px-5 py-5"
            >
              <div className="flex flex-col gap-3 border-b border-gray-200 pb-5 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-lg font-bold">주문 #{order.id}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    {order.status}
                  </p>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-sm text-gray-500">총 결제금액</p>
                  <p className="mt-1 text-2xl font-bold">
                    ₩{order.totalPrice.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 border-b border-gray-200 py-5">
                {order.items.map((item) => (
                  <div
                    key={`${order.id}-${item.productId}`}
                    className="grid grid-cols-[72px_1fr_auto] items-center gap-4"
                  >
                    <img
                      src={getImagePath(item.image)}
                      alt={item.productTitle}
                      className="h-[72px] w-[72px] rounded object-cover"
                      loading="lazy"
                    />
                    <div className="min-w-0">
                      <p className="truncate font-bold">{item.productTitle}</p>
                      <p className="mt-1 text-sm text-gray-500">
                        ₩{item.productPrice.toLocaleString()} · 수량{" "}
                        {item.quantity}
                      </p>
                    </div>
                    <p className="font-bold">
                      ₩{item.lineTotalPrice.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-5 md:grid-cols-[1fr_320px] md:items-start">
                <div className="rounded-[4px] bg-gray-50 px-4 py-4 text-sm">
                  <p className="font-bold">{order.shippingMethod}</p>
                  <p className="mt-2 text-gray-600">
                    {order.shippingDescription}
                  </p>
                  <div className="mt-4 text-gray-700">
                    <p>{order.address}</p>
                    <p>{order.detailAddress}</p>
                  </div>
                </div>

                <div className="grid gap-2 text-sm">
                  <PriceRow label="제품가격" value={order.productTotalPrice} />
                  <PriceRow label="배송비" value={order.shippingPrice} />
                  <PriceRow label="합계" value={order.totalPrice} isStrong />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function PriceRow({ label, value, isStrong = false }) {
  return (
    <div
      className={`flex justify-between ${
        isStrong ? "text-lg font-bold text-black" : "text-gray-600"
      }`}
    >
      <span>{label}</span>
      <span>₩{value.toLocaleString()}</span>
    </div>
  );
}

export default OrderListPage;
