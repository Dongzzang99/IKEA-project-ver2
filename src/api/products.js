// 상품 API 요청을 모아둔 파일
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

const requestProducts = async (path) => {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error("상품 정보를 불러오지 못했습니다.");
  }

  return response.json();
};

export const getProducts = (category) => {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";

  return requestProducts(`/api/products${query}`);
};

export const getProduct = (id) => requestProducts(`/api/products/${id}`);

export const getSpecialPriceProducts = () =>
  requestProducts("/api/products/special-price");
