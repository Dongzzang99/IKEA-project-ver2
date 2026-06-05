// 토스 결제 실패 후 재고 복구 요청을 하는 페이지
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { failTossPayment } from "../api/payments";

function PaymentFailPage() {
  const [message, setMessage] = useState("결제가 취소되었거나 실패했습니다.");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get("orderId");
    const code = params.get("code");
    const failMessage = params.get("message");

    if (failMessage) {
      setMessage(failMessage);
    }

    if (!orderId || !localStorage.getItem("accessToken")) {
      return;
    }

    failTossPayment({ orderId, code, message: failMessage })
      .catch((error) => setMessage(error.message));
  }, []);

  return (
    <div className="flex min-h-[520px] items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-[440px] bg-white px-8 py-10 text-center shadow-sm">
        <p className="text-sm font-bold text-red-600">결제 실패</p>
        <h1 className="mt-3 text-2xl font-bold">결제가 완료되지 않았습니다.</h1>
        <p className="mt-3 text-sm text-gray-600">{message}</p>
        <p className="mt-3 text-xs text-gray-500">
          결제 실패 주문은 재고를 복구하고, 장바구니는 그대로 유지됩니다.
        </p>
        <Link
          to="/cart"
          className="mt-8 inline-flex h-12 items-center rounded-full bg-blue-600 px-6 font-bold text-white hover:bg-blue-700"
        >
          장바구니로 돌아가기
        </Link>
      </div>
    </div>
  );
}

export default PaymentFailPage;
