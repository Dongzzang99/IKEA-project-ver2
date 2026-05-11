// 관리자 API 요청을 모아둔 파일
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

const requestAdmin = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "관리자 요청에 실패했습니다.");
  }

  return data;
};

export const getAdminOrders = () => requestAdmin("/api/admin/orders");

export const getAdminUsers = () => requestAdmin("/api/admin/users");

export const updateAdminProduct = ({ productId, price, sale, stock }) =>
  requestAdmin(`/api/admin/products/${productId}`, {
    method: "PATCH",
    body: JSON.stringify({ price, sale, stock }),
  });
