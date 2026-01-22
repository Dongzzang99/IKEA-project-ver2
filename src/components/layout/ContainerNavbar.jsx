import { Link } from "react-router-dom";

function ContainerNavbar() {
  return (
    <div className="w-full">
      <div className="flex flex-wrap lg:flex-nowrap items-center w-full">
        {/* 로고 */}
        <Link
          to="/"
          className="order-1 flex items-center h-[44px] lg:h-[48px] flex-none"
        >
          <img
            src={`${import.meta.env.BASE_URL}img/ikea_icon.png`}
            alt="IKEA"
            className="block w-[98.359px] h-[40px]"
          />
        </Link>

        {/* 아이콘 그룹 */}
        <div className="order-2 lg:order-3 ml-auto flex gap-[10px] items-center h-[44px] lg:h-[48px] flex-none">
          <div className="flex items-center justify-center w-[44px] h-[44px] rounded-full hover:bg-[#b0b0b0] cursor-pointer">
            <i className="fas fa-user text-[18px] lg:text-[20px] leading-none"></i>
          </div>

          <div className="flex items-center justify-center w-[44px] h-[44px] rounded-full hover:bg-[#b0b0b0] cursor-pointer">
            <i className="far fa-heart text-[18px] lg:text-[20px] leading-none"></i>
          </div>

          <Link
            to="/cart"
            className="flex items-center justify-center w-[44px] h-[44px] rounded-full hover:bg-[#b0b0b0]"
          >
            <i className="fas fa-shopping-bag text-[18px] lg:text-[20px] leading-none"></i>
          </Link>

          <div className="flex items-center justify-center w-[44px] h-[44px] rounded-full hover:bg-[#b0b0b0] cursor-pointer">
            <i className="fas fa-bars text-[18px] lg:text-[20px] leading-none"></i>
          </div>
        </div>

        {/* 검색바 */}
        <div className="order-3 lg:order-2 w-full mt-3 lg:mt-0 lg:mx-[40px] lg:flex-1 lg:min-w-0 lg:max-w-[600px] py-4 lg:py-0">
          <div className="flex items-center bg-[lightgray] h-[48px] rounded-[64px] px-4 w-full">
            <i className="fas fa-search mx-[10px]"></i>

            <input
              type="text"
              placeholder="검색어 입력"
              className="flex-1 min-w-0 h-full border-none bg-transparent outline-none mx-[10px]"
            />

            <div className="w-[32px] h-[32px] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#b0b0b0]">
              <i className="fas fa-camera"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContainerNavbar;
