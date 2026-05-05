//회원가입 페이지
import { Link } from "react-router-dom";

function SignupPage() {
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
          <form className="grid gap-5">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold">이름</span>
              <input
                type="text"
                className="h-12 rounded-[4px] border border-gray-400 px-4 outline-none focus:border-black"
                placeholder="이름 입력"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold">이메일</span>
              <input
                type="email"
                className="h-12 rounded-[4px] border border-gray-400 px-4 outline-none focus:border-black"
                placeholder="example@email.com"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold">비밀번호</span>
              <input
                type="password"
                className="h-12 rounded-[4px] border border-gray-400 px-4 outline-none focus:border-black"
                placeholder="8자 이상 입력"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold">비밀번호 확인</span>
              <input
                type="password"
                className="h-12 rounded-[4px] border border-gray-400 px-4 outline-none focus:border-black"
                placeholder="비밀번호 다시 입력"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold">휴대폰 번호</span>
              <input
                type="tel"
                className="h-12 rounded-[4px] border border-gray-400 px-4 outline-none focus:border-black"
                placeholder="010-0000-0000"
              />
            </label>

            <label className="flex items-start gap-3 text-sm leading-6">
              <input type="checkbox" className="mt-1 h-4 w-4" />
              <span>이용약관과 개인정보 처리방침에 동의합니다.</span>
            </label>

            <button
              type="button"
              className="mt-2 h-12 rounded-full bg-blue-600 px-6 font-bold text-white hover:bg-blue-700"
            >
              가입하기
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

