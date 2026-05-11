// 계정 페이지 파일
import { Navigate } from "react-router-dom";

function AccountPage() {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="bg-white px-4 py-10">
      <div className="mx-auto max-w-[920px]">
        <p className="text-sm font-bold text-blue-700">IKEA Family</p>
        <h1 className="mt-3 text-3xl font-bold">계정</h1>
        <div className="mt-8 rounded-[4px] border border-gray-200 px-5 py-5">
          <p className="text-sm text-gray-600">
            계정 설정 화면은 이후 단계에서 연결할 예정입니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
