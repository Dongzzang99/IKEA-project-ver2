//회원 정보 페이지
import { Link, Navigate } from "react-router-dom";

const getLoginUser = () => {
  try {
    return JSON.parse(localStorage.getItem("loginUser"));
  } catch {
    return null;
  }
};

function ProfilePage() {
  const loginUser = getLoginUser();
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken || !loginUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="bg-white px-4 py-10">
      <div className="mx-auto max-w-[920px]">
        <p className="text-sm font-bold text-blue-700">IKEA Family</p>
        <h1 className="mt-3 text-3xl font-bold">회원 정보</h1>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <ProfileInfoCard label="이름" value={loginUser.name} />
          <ProfileInfoCard label="이메일" value={loginUser.email} />
          <ProfileInfoCard label="전화번호" value={loginUser.phone ?? "미입력"} />
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6">
          <Link
            to="/mypage/orders"
            className="inline-flex h-12 items-center rounded-full bg-blue-600 px-6 font-bold text-white hover:bg-blue-700"
          >
            주문 목록 보기
          </Link>
        </div>
      </div>
    </div>
  );
}

function ProfileInfoCard({ label, value }) {
  return (
    <div className="rounded-[4px] border border-gray-200 px-5 py-5">
      <p className="text-xs font-bold text-gray-500">{label}</p>
      <p className="mt-3 break-words text-lg font-bold">{value}</p>
    </div>
  );
}

export default ProfilePage;
