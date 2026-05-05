//로그인페이지
import { Link } from "react-router-dom";

function LoginPage() {
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
          <form className="flex flex-col gap-5">
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
                placeholder="비밀번호 입력"
              />
            </label>

            <div className="flex items-center justify-between gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4" />
                로그인 상태 유지
              </label>
              <button type="button" className="font-bold underline">
                비밀번호 찾기
              </button>
            </div>

            <button
              type="button"
              className="mt-2 h-12 rounded-full bg-blue-600 px-6 font-bold text-white hover:bg-blue-700"
            >
              로그인
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

