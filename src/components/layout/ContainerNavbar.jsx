import { Link } from "react-router-dom";

function ContainerNavbar() {
  return (
    <div className="navbar">
      {/* 이케아 로고 */}
      <Link to="/">
        <img
          src={`${import.meta.env.BASE_URL}img/ikea_icon.png`}
          alt="IKEA"
          className="w-[98.359px] h-[40px] max-w-none flex-none"
        />
      </Link>

      {/* 검색바 */}
      <div className="navbar-search">
        <i className="fas fa-search"></i>
        <input type="text" placeholder="검색어 입력" />
        <div className="navbar-carmera">
          <i className="fas fa-camera"></i>
        </div>
      </div>

      {/* 우측 아이콘 그룹 */}
      <div className="navbar-icon-group">
        <i className="fas fa-user"></i>
        <i className="far fa-heart"></i>
        <Link to="/cart">
          <i className="fas fa-shopping-bag cursor-pointer"></i>
        </Link>
        <i className="fas fa-bars"></i>
      </div>
    </div>
  );
}

export default ContainerNavbar;
