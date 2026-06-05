// 토스 결제 API 요청을 모아둔 파일
import { clearStoredLogin } from "./auth";
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const confirmTossPayment = async ({ paymentKey, orderId, amount }) => {
  const response = await fetch(`${API_BASE_URL}/api/payments/toss/confirm`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ paymentKey, orderId, amount }),
  });

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      clearStoredLogin();
    }

    throw new Error(data.message ?? "토스 결제 승인에 실패했습니다.");
  }

  return data;
};

export const failTossPayment = async ({ orderId, code, message }) => {
  const response = await fetch(`${API_BASE_URL}/api/payments/toss/fail`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ orderId, code, message }),
  });

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      clearStoredLogin();
    }

    throw new Error(data.message ?? "토스 결제 실패 처리에 실패했습니다.");
  }

  return data;
};
