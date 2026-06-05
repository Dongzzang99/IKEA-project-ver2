// 로그인 인증 상태를 확인하는 API 파일
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

export const clearStoredLogin = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("loginUser");
  window.dispatchEvent(new Event("loginUserChanged"));
};

export const getStoredToken = () => localStorage.getItem("accessToken");

export const getCurrentUser = async () => {
  const token = getStoredToken();

  if (!token) {
    clearStoredLogin();
    return null;
  }

  const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401 || response.status === 403) {
    clearStoredLogin();
    return null;
  }

  if (!response.ok) {
    throw new Error("로그인 상태를 확인하지 못했습니다.");
  }

  return response.json();
};
