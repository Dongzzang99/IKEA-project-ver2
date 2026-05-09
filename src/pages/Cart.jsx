//장바구니 페이지
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { removeFromCart, updateQuantity } from "../data/Cart_Redux";
import {
  getCartItems,
  hasAccessToken,
  removeCartItem,
  updateCartItem,
} from "../api/cart";

function Cart() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = hasAccessToken();

  // 로그인 사용자는 DB 장바구니를 화면 상태로 가져와서 보여줌
  const [localItems, setLocalItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const cartItems = isLoggedIn ? localItems : items;

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    getCartItems()
      .then((data) => {
        setLocalItems(
          data.map((item) => ({
            id: item.productId,
            title: item.title,
            price: item.price,
            image: item.image,
            note: item.note,
            quantity: item.quantity,
          })),
        );
        setErrorMessage("");
      })
      .catch(() => {
        setErrorMessage("장바구니를 불러오지 못했습니다.");
      });
  }, [isLoggedIn]);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const changeLocalQuantity = (id, delta) => {
    if (!isLoggedIn) {
      const target = items.find((item) => item.id === id);

      if (!target) return;

      dispatch(
        updateQuantity({
          id,
          quantity: Math.max(1, target.quantity + delta),
        }),
      );
      return;
    }

    setLocalItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const handleRemoveItem = (id) => {
    if (!isLoggedIn) {
      dispatch(removeFromCart(id));
      return;
    }

    removeCartItem(id)
      .then(() => {
        setLocalItems((prev) => prev.filter((item) => item.id !== id));
      })
      .catch(() => {
        alert("장바구니 상품 삭제에 실패했습니다.");
      });
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      alert("주문은 로그인 후 이용할 수 있습니다.");
      return;
    }

    Promise.all(
      localItems.map((item) =>
        updateCartItem({
          productId: item.id,
          quantity: item.quantity,
        }),
      ),
    )
      .then(() => {
        navigate("/order");
      })
      .catch(() => {
        alert("수량 반영에 실패했습니다.");
      });
  };

  if (errorMessage) {
    return <div className="bg-gray-100 p-8">{errorMessage}</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex justify-between bg-gray-100 p-8">
        <div>
          <div className="pb-[1rem] text-[1.5rem] font-bold">
            장바구니가 비어 있습니다.
          </div>
          <div className="text-[0.8rem] text-gray-800">
            <div className="py-4">
              장바구니에 상품을 추가하면 여기에서 볼 수 있습니다.
            </div>
            <div>추가한 상품이 보이지 않는다면, 상품을 다시 추가해주세요.</div>
          </div>
        </div>
        <div>
          <img
            className="w-[300px]"
            src={`${import.meta.env.BASE_URL}img/ikea-bag.png`}
            alt="IKEA bag"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6 p-3 md:flex-row md:justify-center">
      <div className="w-full md:w-3/5">
        <div className="mb-4 text-[2rem] font-bold">장바구니</div>

        <div className="mb-4 flex w-full items-center justify-between rounded-[4px] border-2 border-gray-300 px-6 py-6 hover:border-gray-500">
          <div>
            <p className="text-[0.8rem] font-semibold">
              배송 및 기타 서비스 이용 가능 여부 확인
            </p>
          </div>
          <i className="fas fa-arrow-right"></i>
        </div>

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="mb-4 flex items-center gap-4 border-b border-gray-200 pb-4"
          >
            <img
              src={`${import.meta.env.BASE_URL}${item.image.replace(
                /^\//,
                "",
              )}`}
              alt={item.title}
              className="h-24 w-24 rounded object-cover"
            />

            <div className="flex-1">
              <Link
                to={`/products/${item.id}`}
                className="block pb-1 font-bold hover:underline"
              >
                {item.title}
              </Link>
              <p className="pb-2 text-sm text-gray-600">{item.note}</p>

              <div className="flex items-center gap-3">
                <div className="flex h-[40px] w-[120px] items-center justify-between rounded-full border border-gray-300 px-4">
                  <button
                    className="cursor-pointer text-xl font-bold"
                    onClick={() => changeLocalQuantity(item.id, -1)}
                  >
                    -
                  </button>
                  <span className="text-lg font-medium">{item.quantity}</span>
                  <button
                    className="cursor-pointer text-xl font-bold"
                    onClick={() => changeLocalQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className="h-[40px] rounded-full border border-blue-600 bg-blue-600 px-4 text-sm font-bold text-white hover:bg-white hover:text-blue-600"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  삭제
                </button>
              </div>
            </div>

            <div className="text-right">
              <p className="font-bold">
                ₩{(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full md:w-2/5">
        <div className="mb-8 text-[1rem] font-bold">주문내역</div>

        <div className="mb-8 flex justify-between border-b border-gray-500 pb-8">
          <div className="text-[0.8rem] text-gray-400">
            <div className="mb-4">제품</div>
            <div className="mb-4">배송비는 결제 시 계산됩니다.</div>
          </div>
          <div className="text-right text-[0.8rem] font-bold text-gray-500">
            ₩{totalPrice.toLocaleString()}
          </div>
        </div>

        <div className="mb-16 flex items-center justify-between border-b border-gray-300 pb-8">
          <div>합계(VAT 포함)</div>
          <div className="text-[1.3rem] font-bold">
            ₩{totalPrice.toLocaleString()}
          </div>
        </div>

        <button
          type="button"
          className="mx-auto flex w-[90%] cursor-pointer items-center justify-between rounded-[4px] bg-blue-600 px-6 py-8 font-bold text-white hover:bg-blue-700"
          onClick={handleCheckout}
        >
          <p className="text-[0.8rem] font-semibold">결제하기</p>
          <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}

export default Cart;
