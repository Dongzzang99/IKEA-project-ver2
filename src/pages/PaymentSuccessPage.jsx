// 토스 결제 성공 후 승인 처리를 하는 페이지
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { confirmTossPayment } from "../api/payments";

function PaymentSuccessPage() {
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const [order, setOrder] = useState(null);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentKey = params.get("paymentKey");
    const orderId = params.get("orderId");
    const amount = Number(params.get("amount"));

    if (!paymentKey || !orderId || !amount) {
      setStatus("error");
      setMessage("결제 승인에 필요한 값이 부족합니다.");
      return;
    }

    confirmTossPayment({ paymentKey, orderId, amount })
      .then((data) => {
        setOrder(data);
        setStatus("success");
      })
      .catch((error) => {
        setMessage(error.message);
        setStatus("error");
      });
  }, []);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  if (status === "loading") {
    return (
      <PaymentMessage
        title="결제를 승인하고 있습니다"
        description="토스 결제 결과와 주문 금액을 확인하는 중입니다."
        isLoading
      />
    );
  }

  if (status === "error") {
    return (
      <PaymentMessage
        title="결제 승인에 실패했습니다"
        description={message}
        actionLabel="장바구니로 돌아가기"
        actionTo="/cart"
      />
    );
  }

  return (
    <div className="bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-[760px] bg-white px-6 py-8 shadow-sm md:px-10">
        <p className="text-sm font-bold text-blue-700">주문 완료</p>
        <h1 className="mt-3 text-3xl font-bold">
          결제가 완료되어 주문이 접수되었습니다.
        </h1>
        <div className="mt-8 grid gap-4 border-y border-gray-200 py-6 text-sm md:grid-cols-2">
          <div>
            <p className="text-gray-500">주문번호</p>
            <p className="mt-1 font-bold">#{order.id}</p>
          </div>
          <div>
            <p className="text-gray-500">주문상태</p>
            <p className="mt-1 font-bold">{order.status}</p>
          </div>
          <div>
            <p className="text-gray-500">배송방법</p>
            <p className="mt-1 font-bold">{order.shippingMethod}</p>
          </div>
          <div>
            <p className="text-gray-500">총 결제금액</p>
            <p className="mt-1 font-bold">
              {order.totalPrice.toLocaleString()}원
            </p>
          </div>
        </div>
        <div className="mt-6 text-sm text-gray-700">
          <p>{order.receiverName}</p>
          <p>{order.address}</p>
          <p>{order.detailAddress}</p>
        </div>
        <Link
          to="/"
          className="mt-8 inline-flex h-12 items-center rounded-full bg-blue-600 px-6 font-bold text-white hover:bg-blue-700"
        >
          쇼핑 계속하기
        </Link>
      </div>
    </div>
  );
}

function PaymentMessage({ title, description, isLoading, actionLabel, actionTo }) {
  return (
    <div className="flex min-h-[520px] items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-[440px] bg-white px-8 py-10 text-center shadow-sm">
        {isLoading && (
          <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
        )}
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="mt-3 text-sm text-gray-600">{description}</p>
        {actionLabel && (
          <Link
            to={actionTo}
            className="mt-8 inline-flex h-12 items-center rounded-full bg-blue-600 px-6 font-bold text-white hover:bg-blue-700"
          >
            {actionLabel}
          </Link>
        )}
      </div>
    </div>
  );
}

export default PaymentSuccessPage;
