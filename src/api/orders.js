// 주문 API 요청을 모아둔 파일
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const createOrder = async (orderData) => {
  const response = await fetch(`${API_BASE_URL}/api/orders`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(orderData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "주문 생성에 실패했습니다.");
  }

  return data;
};

export const getOrders = async () => {
  const response = await fetch(`${API_BASE_URL}/api/orders`, {
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "주문 목록을 불러오지 못했습니다.");
  }

  return data;
};
