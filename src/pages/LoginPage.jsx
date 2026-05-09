//로그인페이지
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

function LoginPage() {
  const navigate = useNavigate();
  // 로그인 입력값 저장
  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 입력창 값 바뀔 때마다 form에 저장
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 로그인 버튼 눌렀을 때 백엔드로 보내기
  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message ?? "로그인에 실패했습니다.");
        return;
      }

      // 로그인 성공한 회원 정보와 JWT를 브라우저에 저장
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem(
        "loginUser",
        JSON.stringify({
          id: data.id,
          name: data.name,
          email: data.email,
          phone: data.phone,
        }),
      );
      window.dispatchEvent(new Event("loginUserChanged"));
      navigate("/");

      setForm((prev) => ({
        ...prev,
        password: "",
      }));
    } catch {
      setMessage("서버 연결을 확인해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-8 md:py-14">
      <div className="mx-auto grid w-full max-w-[980px] gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-12">
        <section className="flex flex-col justify-between bg-[#0058a3] px-6 py-8 text-white md:min-h-[520px] md:px-10">
          <div>
            <p className="mb-4 text-sm font-bold">IKEA 계정</p>
            <h1 className="text-3xl font-bold leading-tight md:text-4xl">
              로그인
            </h1>
            <p className="mt-5 max-w-[340px] text-sm leading-6 text-blue-50">
              주문 내역, 장바구니, 관심 상품을 한 곳에서 확인하세요.
            </p>
          </div>

          <div className="mt-10 border-t border-white/30 pt-6 text-sm leading-6 text-blue-50">
            아직 계정이 없다면 IKEA Family 혜택을 받을 수 있는 계정을
            만들어보세요.
          </div>
        </section>

        <section className="border border-gray-300 px-5 py-6 md:px-8 md:py-8">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold">이메일</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="h-12 rounded-[4px] border border-gray-400 px-4 outline-none focus:border-black"
                placeholder="example@email.com"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold">비밀번호</span>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="h-12 rounded-[4px] border border-gray-400 px-4 outline-none focus:border-black"
                placeholder="비밀번호 입력"
              />
            </label>

            <div className="flex items-center justify-between gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input
                  name="rememberMe"
                  type="checkbox"
                  checked={form.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                로그인 상태 유지
              </label>
              <button type="button" className="font-bold underline">
                비밀번호 찾기
              </button>
            </div>

            {message && (
              <p className="rounded-[4px] bg-gray-100 px-4 py-3 text-sm font-bold text-gray-800">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 h-12 rounded-full bg-blue-600 px-6 font-bold text-white hover:bg-blue-700"
            >
              {isSubmitting ? "로그인 처리 중" : "로그인"}
            </button>
          </form>

          <div className="mt-8 border-t border-gray-300 pt-6">
            <p className="text-sm text-gray-700">IKEA 계정이 없으신가요?</p>
            <Link
              to="/signup"
              className="mt-4 flex h-12 items-center justify-center rounded-full border border-gray-900 px-6 font-bold hover:border-gray-600"
            >
              회원가입
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default LoginPage;
