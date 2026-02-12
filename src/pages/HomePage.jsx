import HomePage_SpecialPrice from "./HomePage_SpecialPrice";

function HomePage() {
  return (
    <div>
      {/* 카테고리 분류 메뉴바 */}

      {/* main homepage */}
      <div className="lg:px-4 flex flex-col ">
        <HomePage_Main />
        <HomePage_SpecialPrice />
      </div>
    </div>
  );
}

function HomePage_Main() {
  return (
    <div>
      
      {/* 바로 위 상단 검색바 \components\layout\ContainerNavbar.jsx */}
      {/* main 상단 버튼 2개  */}
      <div className="flex justify-between gap-4 pb-8">
        <div className="border-2 rounded-[4px] border-gray-300 w-full flex justify-between items-center hover:border-gray-500 py-2 px-4 md:py-4 md:px-6">
          <div>
            <p className="font-semibold">쇼핑 계속 하기</p>
            <span className="hidden lg:inline">최근에 본 제품으로 가기</span>
          </div>
          <i className="fas fa-arrow-right !hidden lg:!inline"></i>
        </div>
        <div className="border-2 rounded-[4px] border-gray-300 w-full flex justify-between items-center hover:border-gray-500 py-2 px-4 md:py-4 md:px-6">
          <div>
            <p className=" font-semibold">로그인 또는 IKEA Family 가입하기</p>
            <span className="hidden lg:inline">
              집에 관한 아이디어를 현실로 만들어보세요
            </span>
          </div>
          <i className="fas fa-arrow-right  !hidden lg:!inline"></i>
        </div>
      </div>

      {/* main 신제품,이벤트 홍보 */}
      <div className="flex flex-col md:flex-row gap-4 w-full">
        {/* 왼쪽 1번 카드 */}
        <div className="w-full md:w-1/2 relative">
          <a
            href="/IKEA-project-ver2/ebusan"
            className="relative block w-full aspect-square md:aspect-auto md:h-full"
          >
            <img
              src={`${import.meta.env.BASE_URL}img/event_img/event_img1.jpg`}
              className="h-full w-full object-cover"
              alt=""
            />

            {/* 1번 카드 그라데이션 */}
            <div className="absolute bottom-0 left-0 w-full h-[30%] bg-[linear-gradient(0deg,#111c,#1110)]" />

            {/*  1번 카드 왼쪽 하단 텍스트 */}
            <div className="absolute bottom-4 left-4 text-white">
              <div className="bg-orange-400 w-fit px-[2px]">New</div>
              <p className="text-white text-lg font-bold">
                이케아 동부산점, 10월 29일 오픈!
              </p>
              <p>
                <i className="fas fa-arrow-right text-white"></i>
              </p>
            </div>
          </a>
        </div>

        {/* 오른쪽 영역 (2번 + 3번) */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          {/* 2번 카드 */}
          <a
            href="www.naver.com"
            className="relative block w-full aspect-square md:aspect-auto md:h-[49%]"
          >
            <img
              src={`${import.meta.env.BASE_URL}img/event_img/event_img2.jpg`}
              className="h-full w-full object-cover"
              alt=""
            />

            {/* 2번카드 그라데이션 */}
            <div className="absolute bottom-0 left-0 w-full h-[30%] bg-[linear-gradient(0deg,#111c,#1110)]" />

            <div className="absolute bottom-4 left-4 text-white">
              <div className="bg-orange-400 w-fit px-[2px]">New</div>
              <p className="text-white text-xl font-bold">이달의 신제품</p>
              <p>
                <i className="fas fa-arrow-right text-white"></i>
              </p>
            </div>
          </a>

          {/* 3번 카드 */}
          <a
            href="www.naver.com"
            className="relative block w-full aspect-square md:aspect-auto md:h-[49%]"
          >
            <div className="bg-orange-600 h-full w-full" />

            <div className="absolute inset-0 flex items-center px-4">
              <div className="text-white">
                <p className="font-bold py-4 text-3xl">모든 신제품 보러가기</p>
                <p className="py-2 text-lg">더 많은 신제품을 둘러보세요!</p>
                <p>
                  <i className="fas fa-arrow-right text-white"></i>
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
