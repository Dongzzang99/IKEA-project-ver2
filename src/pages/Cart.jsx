import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { updateQuantity } from "../data/Cart_Redux";

function Cart() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  //  로컬에서만 조절할 장바구니 아이템 상태
  const [localItems, setLocalItems] = useState([]);

  //  Redux items가 바뀔 때마다 로컬 상태 초기화
  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  //  로컬 수량 변경 함수 - 이때 실시간으로 redux 값은 변하지 않음
  const changeLocalQuantity = (id, delta) => {
    setLocalItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  // 화면에 보여줄 총 금액은 로컬 기준으로 계산
  const totalPrice = localItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  //  결제하기 버튼 클릭  → 로컬 수량을 Redux에 반영
  const handleCheckout = () => {
    localItems.forEach((item) => {
      dispatch(
        updateQuantity({
          id: item.id,
          quantity: item.quantity,
        })
      );
    });

    alert("결제 로직은 아직 구현 전입니다 수량만 Redux에 반영");
  };

  if (items.length === 0) {
    return (
      <div className="p-8 bg-gray-100 flex justify-between">
        <div>
          <div className="text-[1.5rem] font-bold pb-[1rem]">
            장바구니가 비어 있습니다.
          </div>
          <div className="text-[0.8rem] text-gray-800">
            <div className="py-4">
              장바구니에 제품을 추가하면 여기에서 볼 수 있습니다.
            </div>
            <div>
              추가한 제품이 보이지 않는다면, 제품을 한번 더 추가해 주세요
            </div>
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

  // item.title 물건 이름
  return (
    <div className="flex justify-center gap-6 p-3">
      <div className="w-5/10">
        <div className="text-[2rem] font-bold mb-4">장바구니</div>

        {/* 여부 확인 박스 */}
        <div className="border-2 rounded-[4px] border-gray-300 py-6 px-6 mb-4 w-[100%] flex justify-between items-center hover:border-gray-500 ">
          <div>
            <p className=" text-[0.8rem] font-semibold">
              배송 및 기타 서비스 이용 가능 여부 확인
            </p>
          </div>
          <i className="fas fa-arrow-right "></i>
        </div>

        {/* 물건 표시 창 */}
        {localItems.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 items-center border-b border-gray-200 pb-4 mb-4"
          >
            <img
              src={`${import.meta.env.BASE_URL}${item.image.replace(
                /^\//,
                ""
              )}`}
              alt={item.title}
              className="w-24 h-24 object-cover rounded"
            />

            <div className="flex-1">
              <Link
                to={`/products/${item.id}`}
                className="font-bold block hover:underline pb-1"
              >
                {item.title}
              </Link>
              <p className="text-sm text-gray-600 pb-2">{item.note}</p>

              {/* 수량 조절 박스*/}
              <div className="flex items-center justify-between w-[120px] h-[40px] border border-gray-300 rounded-full px-4">
                <button
                  className="text-xl font-bold cursor-pointer"
                  onClick={() => changeLocalQuantity(item.id, -1)}
                >
                  −
                </button>
                <span className="text-lg font-medium">{item.quantity}</span>
                <button
                  className="text-xl font-bold cursor-pointer"
                  onClick={() => changeLocalQuantity(item.id, 1)}
                >
                  ＋
                </button>
              </div>
            </div>

            <div className="text-right">
              <p className="font-bold">
                ￦{(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 주문 내역 div */}
      <div className="w-4/10 ">
        <div className="text-[1rem] font-bold mb-8">주문내역</div>

        <div className="flex justify-between border-b border-gray-500 pb-8 mb-8">
          <div className="text-gray-400 text-[0.8rem]">
            <div className="mb-4">제품</div>
            <div className="mb-4">배송비는 결제시 계산 됩니다.</div>
          </div>
          <div className="text-gray-500 text-[0.8rem] font-bold">
            ₩ {totalPrice.toLocaleString()}
          </div>
        </div>

        <div className=" mb-16 pb-8 flex items-center justify-between border-b border-gray-300">
          <div>합계(VAT 포함)</div>
          <div className="text-[1.3rem] font-bold">
            ₩ {totalPrice.toLocaleString()}
          </div>
        </div>

        <div>
          <div
            className="rounded-[4px] bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-bold py-8 px-6 w-[90%] flex justify-between items-center mx-auto"
            onClick={handleCheckout} // 결제 버튼에서 Redux 반영
          >
            <div>
              <p className=" text-[0.8rem] font-semibold">결제하기</p>
            </div>
            <i className="fas fa-arrow-right "></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
