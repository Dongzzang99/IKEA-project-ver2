// 장바구니 API 요청을 모아둔 파일
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

const requestCart = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error("장바구니 요청에 실패했습니다.");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

export const hasAccessToken = () => Boolean(localStorage.getItem("accessToken"));

export const getCartItems = () => requestCart("/api/cart");

export const addCartItem = ({ productId, quantity }) =>
  requestCart("/api/cart/items", {
    method: "POST",
    body: JSON.stringify({ productId, quantity }),
  });

export const updateCartItem = ({ productId, quantity }) =>
  requestCart(`/api/cart/items/${productId}`, {
    method: "PATCH",
    body: JSON.stringify({ quantity }),
  });

export const removeCartItem = (productId) =>
  requestCart(`/api/cart/items/${productId}`, {
    method: "DELETE",
  });
