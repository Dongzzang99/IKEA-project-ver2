//회원가입 환영 페이지
import { Link, useLocation } from "react-router-dom";

function SignupWelcomePage() {
  const location = useLocation();
  const name = location.state?.name;

  return (
    <div className="bg-white px-4 py-12">
      <div className="mx-auto max-w-[760px] border border-gray-200 px-6 py-10 text-center md:px-10">
        <p className="text-sm font-bold text-blue-700">IKEA Family</p>
        <h1 className="mt-4 text-3xl font-bold md:text-4xl">
          {name ? `${name}님, 회원가입을 환영합니다.` : "회원가입을 환영합니다."}
        </h1>
        <p className="mx-auto mt-5 max-w-[460px] text-sm leading-6 text-gray-600">
          이제 로그인해서 장바구니, 주문 내역, 관심 상품을 더 편하게 관리할 수
          있습니다.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/login"
            className="inline-flex h-12 items-center justify-center rounded-full bg-blue-600 px-6 font-bold text-white hover:bg-blue-700"
          >
            로그인하기
          </Link>
          <Link
            to="/"
            className="inline-flex h-12 items-center justify-center rounded-full border border-gray-900 px-6 font-bold hover:border-gray-600"
          >
            홈으로 가기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignupWelcomePage;
