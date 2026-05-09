//회원가입 페이지
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

function SignupPage() {
  const navigate = useNavigate();
  // 회원가입 입력값 저장
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    phone: "",
    termsAgreed: false,
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

  // 가입하기 버튼 눌렀을 때 백엔드로 보내기
  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (form.password !== form.passwordConfirm) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message ?? "회원가입에 실패했습니다.");
        return;
      }

      navigate("/signup/welcome", {
        state: {
          name: data.name ?? form.name,
          email: data.email ?? form.email,
        },
      });
    } catch {
      setMessage("서버 연결을 확인해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-8 md:py-14">
      <div className="mx-auto grid w-full max-w-[1080px] gap-8 md:grid-cols-[0.85fr_1.15fr] md:gap-12">
        <section className="bg-[#ffdb00] px-6 py-8 text-black md:min-h-[620px] md:px-10">
          <p className="mb-4 text-sm font-bold">IKEA Family</p>
          <h1 className="text-3xl font-bold leading-tight md:text-4xl">
            회원가입
          </h1>
          <p className="mt-5 max-w-[360px] text-sm leading-6">
            관심 상품 저장, 주문 정보 확인, 맞춤 혜택을 이용할 수 있는 IKEA
            계정을 만들어보세요.
          </p>

          <div className="mt-10 space-y-4 border-t border-black/20 pt-6 text-sm">
            <div className="flex gap-3">
              <i className="fas fa-check mt-1"></i>
              <p>장바구니와 주문 내역 관리</p>
            </div>
            <div className="flex gap-3">
              <i className="fas fa-check mt-1"></i>
              <p>관심 상품 저장</p>
            </div>
            <div className="flex gap-3">
              <i className="fas fa-check mt-1"></i>
              <p>배송지 정보 저장</p>
            </div>
          </div>
        </section>

        <section className="border border-gray-300 px-5 py-6 md:px-8 md:py-8">
          <form className="grid gap-5" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold">이름</span>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className="h-12 rounded-[4px] border border-gray-400 px-4 outline-none focus:border-black"
                placeholder="이름 입력"
              />
            </label>

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
                placeholder="8자 이상 입력"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold">비밀번호 확인</span>
              <input
                name="passwordConfirm"
                type="password"
                value={form.passwordConfirm}
                onChange={handleChange}
                className="h-12 rounded-[4px] border border-gray-400 px-4 outline-none focus:border-black"
                placeholder="비밀번호 다시 입력"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold">휴대폰 번호</span>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                className="h-12 rounded-[4px] border border-gray-400 px-4 outline-none focus:border-black"
                placeholder="010-0000-0000"
              />
            </label>

            <label className="flex items-start gap-3 text-sm leading-6">
              <input
                name="termsAgreed"
                type="checkbox"
                checked={form.termsAgreed}
                onChange={handleChange}
                className="mt-1 h-4 w-4"
              />
              <span>이용약관과 개인정보 처리방침에 동의합니다.</span>
            </label>

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
              {isSubmitting ? "가입 처리 중" : "가입하기"}
            </button>
          </form>

          <div className="mt-8 border-t border-gray-300 pt-6">
            <p className="text-sm text-gray-700">이미 계정이 있으신가요?</p>
            <Link to="/login" className="mt-4 inline-flex font-bold underline">
              로그인하기
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default SignupPage;
