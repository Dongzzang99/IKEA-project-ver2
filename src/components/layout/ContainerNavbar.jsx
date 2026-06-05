// 상단 네비게이션과 오른쪽 패널을 관리하는 파일
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { clearStoredLogin, getCurrentUser } from "../../api/auth";
import { getProducts } from "../../api/products";
import { getRecentViewedProducts } from "../../api/recentViewed";
import { getImagePath } from "../../utils/imagePath";

const MENU_ITEMS = [
  { path: "/mypage/profile", label: "회원 정보" },
  { path: "/mypage/orders", label: "주문 목록" },
  { path: "/mypage/account", label: "계정" },
];

function ContainerNavbar() {
  const navigate = useNavigate();

  // 저장된 로그인 정보를 가져옴
  const getLoginUser = () => {
    const accessToken = localStorage.getItem("accessToken");
    const savedUser = localStorage.getItem("loginUser");

    if (!accessToken || !savedUser) {
      localStorage.removeItem("loginUser");
      localStorage.removeItem("accessToken");
      return null;
    }

    try {
      return JSON.parse(savedUser);
    } catch {
      return null;
    }
  };

  const [loginUser, setLoginUser] = useState(getLoginUser);
  const [isAccountPanelOpen, setIsAccountPanelOpen] = useState(false);
  const [isRecentPanelOpen, setIsRecentPanelOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // 검색어 변경 시 상품명/카테고리 비교 후 결과 생성
  const trimmedSearchText = searchText.trim().toLowerCase();
  const searchResults = trimmedSearchText
    ? products
        .filter((product) => {
          const title = product.title.toLowerCase();
          const category = product.category.toLowerCase();

          return (
            title.includes(trimmedSearchText) ||
            category.includes(trimmedSearchText)
          );
        })
        .slice(0, 6)
    : [];

  const handleLogout = () => {
    // 로그아웃 시 브라우저에 저장된 토큰/회원 정보 삭제
    clearStoredLogin();
    setLoginUser(null);
    setIsAccountPanelOpen(false);
    setIsRecentPanelOpen(false);
  };

  useEffect(() => {
    let isMounted = true;

    // 화면에 남아있는 로그인 정보가 실제 서버에서도 유효한지 확인
    getCurrentUser()
      .then((currentUser) => {
        if (!isMounted) {
          return;
        }

        if (!currentUser) {
          setLoginUser(null);
          setIsAccountPanelOpen(false);
          return;
        }

        localStorage.setItem(
          "loginUser",
          JSON.stringify({
            id: currentUser.id,
            name: currentUser.name,
            email: currentUser.email,
            phone: currentUser.phone,
            role: currentUser.role,
          }),
        );
        setLoginUser(getLoginUser());
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    // 로그인/로그아웃 변경 시 navbar 상태 동기화
    const syncLoginUser = () => {
      setLoginUser(getLoginUser());
    };

    window.addEventListener("loginUserChanged", syncLoginUser);
    window.addEventListener("storage", syncLoginUser);

    return () => {
      window.removeEventListener("loginUserChanged", syncLoginUser);
      window.removeEventListener("storage", syncLoginUser);
    };
  }, []);

  useEffect(() => {
    // 전체 상품 목록 조회 후 프론트 검색에 사용
    getProducts()
      .then(setProducts)
      .catch(() => setProducts([]));
  }, []);

  const moveToProduct = (productId) => {
    // 검색 결과 클릭 시 검색창 초기화 후 상세 페이지 이동
    setSearchText("");
    setIsSearchOpen(false);
    navigate(`/products/${productId}`);
  };

  return (
    <div className="w-full">
      <div className="flex w-full flex-wrap items-center lg:flex-nowrap">
        {/* 로고 */}
        <Link
          to="/"
          className="order-1 flex h-[44px] flex-none items-center lg:h-[48px]"
        >
          <img
            src={`${import.meta.env.BASE_URL}img/ikea_icon.png`}
            alt="IKEA"
            className="block h-[40px] w-[98.359px]"
          />
        </Link>

        {/* 아이콘 그룹 */}
        <div className="order-2 ml-auto flex h-[44px] flex-none items-center gap-[10px] lg:order-3 lg:h-[48px]">
          {loginUser ? (
            <button
              type="button"
              className="flex min-w-[92px] items-center justify-center rounded-full px-3 py-2 text-sm font-bold hover:bg-[#b0b0b0]"
              onClick={() => setIsAccountPanelOpen(true)}
            >
              Hej! {loginUser.name}!
            </button>
          ) : (
            <Link
              to="/login"
              className="flex h-[44px] w-[44px] items-center justify-center rounded-full hover:bg-[#b0b0b0]"
            >
              <i className="fas fa-user text-[18px] leading-none lg:text-[20px]"></i>
            </Link>
          )}

          <div className="flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-full hover:bg-[#b0b0b0]">
            <i className="far fa-heart text-[18px] leading-none lg:text-[20px]"></i>
          </div>

          <Link
            to="/cart"
            className="flex h-[44px] w-[44px] items-center justify-center rounded-full hover:bg-[#b0b0b0]"
          >
            <i className="fas fa-shopping-bag text-[18px] leading-none lg:text-[20px]"></i>
          </Link>

          <button
            type="button"
            className="flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-full hover:bg-[#b0b0b0]"
            onClick={() => setIsRecentPanelOpen(true)}
            aria-label="최근 본 가구 열기"
          >
            <i className="fas fa-bars text-[18px] leading-none lg:text-[20px]"></i>
          </button>
        </div>

        {/* 검색바 */}
        <div className="relative order-3 mt-3 w-full py-4 lg:order-2 lg:mx-[40px] lg:mt-0 lg:max-w-[600px] lg:flex-1 lg:py-0">
          <div className="flex h-[48px] w-full items-center rounded-[64px] bg-[lightgray] px-4">
            <i className="fas fa-search mx-[10px]"></i>

            <input
              type="text"
              placeholder="검색어 입력"
              className="mx-[10px] h-full min-w-0 flex-1 border-none bg-transparent outline-none"
              value={searchText}
              onChange={(event) => {
                setSearchText(event.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
            />

            <div className="flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-full hover:bg-[#b0b0b0]">
              <i className="fas fa-camera"></i>
            </div>
          </div>

          {isSearchOpen && trimmedSearchText && (
            <SearchResultDropdown
              searchText={searchText}
              searchResults={searchResults}
              onSelectProduct={moveToProduct}
            />
          )}
        </div>
      </div>

      {loginUser && isAccountPanelOpen && (
        <AccountPanel
          loginUser={loginUser}
          onClose={() => setIsAccountPanelOpen(false)}
          onLogout={handleLogout}
        />
      )}

      {isRecentPanelOpen && (
        <RecentViewedPanel onClose={() => setIsRecentPanelOpen(false)} />
      )}
    </div>
  );
}

function SearchResultDropdown({ searchText, searchResults, onSelectProduct }) {
  return (
    <div className="absolute left-0 right-0 top-[68px] z-40 overflow-hidden rounded-[8px] border border-gray-200 bg-white shadow-xl lg:top-[56px]">
      <div className="border-b border-gray-100 px-5 py-3 text-sm font-bold text-gray-700">
        검색 결과
      </div>

      {searchResults.length === 0 ? (
        <p className="px-5 py-5 text-sm font-bold text-gray-500">
          "{searchText}"에 맞는 가구가 없습니다.
        </p>
      ) : (
        <div className="max-h-[390px] overflow-y-auto">
          {searchResults.map((product) => (
            <button
              key={product.id}
              type="button"
              className="grid w-full grid-cols-[64px_1fr_auto] items-center gap-4 px-4 py-3 text-left hover:bg-gray-100"
              onMouseDown={() => onSelectProduct(product.id)}
            >
              <img
                src={getImagePath(product.image)}
                alt={product.title}
                className="h-[64px] w-[64px] rounded object-cover"
                loading="lazy"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">{product.title}</p>
                <p className="mt-1 text-xs font-bold text-blue-700">
                  {product.category}
                </p>
                <p className="mt-1 text-sm font-bold text-gray-700">
                  {product.price.toLocaleString()}원
                </p>
                <p className="mt-1 text-xs font-bold text-gray-600">
                  총 재고 {product.stock}개
                </p>
              </div>
              <i className="fas fa-chevron-right text-xs text-gray-500"></i>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function AccountPanel({ loginUser, onClose, onLogout }) {
  const navigate = useNavigate();

  const moveToPage = (path) => {
    // 오른쪽 패널은 메뉴 역할만 하고 실제 내용은 메인 페이지로 이동해서 보여줌
    onClose();
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        className="absolute inset-0 bg-black/35"
        aria-label="회원 메뉴 닫기"
        onClick={onClose}
      ></button>

      <aside className="account-panel-slide absolute right-0 top-0 h-full w-full bg-white px-6 py-7 shadow-2xl sm:w-[420px] lg:w-1/3">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-bold text-blue-700">IKEA Family</p>
            <h2 className="mt-2 text-3xl font-bold leading-tight">
              HEJ! {loginUser.name}
            </h2>
          </div>
          <button
            type="button"
            className="mt-7 h-[36px] shrink-0 rounded-full border border-gray-800 px-3 text-sm font-bold hover:bg-gray-100"
            onClick={onLogout}
          >
            로그아웃
          </button>
        </div>

        <nav className="grid gap-2 border-t border-gray-200 pt-5">
          {MENU_ITEMS.map((menu) => (
            <button
              key={menu.path}
              type="button"
              className="flex h-12 items-center justify-between rounded-[4px] px-3 text-left text-sm font-bold hover:bg-gray-100"
              onClick={() => moveToPage(menu.path)}
            >
              <span>{menu.label}</span>
              <i className="fas fa-chevron-right text-xs"></i>
            </button>
          ))}
          {loginUser.role === "ADMIN" && (
            <button
              type="button"
              className="flex h-12 items-center justify-between rounded-[4px] px-3 text-left text-sm font-bold hover:bg-gray-100"
              onClick={() => moveToPage("/admin")}
            >
              <span>관리자</span>
              <i className="fas fa-chevron-right text-xs"></i>
            </button>
          )}
        </nav>
      </aside>
    </div>
  );
}

function RecentViewedPanel({ onClose }) {
  const [recentProducts] = useState(getRecentViewedProducts);

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        className="absolute inset-0 bg-black/35"
        aria-label="최근 본 가구 닫기"
        onClick={onClose}
      ></button>

      <aside className="account-panel-slide absolute right-0 top-0 h-full w-full overflow-y-auto bg-white px-6 py-7 shadow-2xl sm:w-[420px] lg:w-1/3">
        <div className="mb-8">
          <p className="text-sm font-bold text-blue-700">IKEA</p>
          <h2 className="mt-2 text-3xl font-bold leading-tight">
            최근 본 가구
          </h2>
        </div>

        {recentProducts.length === 0 ? (
          <p className="rounded-[4px] bg-gray-100 px-4 py-4 text-sm font-bold text-gray-700">
            최근 본 가구가 없습니다.
          </p>
        ) : (
          <div className="grid gap-4">
            {recentProducts.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="grid grid-cols-[88px_1fr_auto] items-center gap-4 rounded-[4px] border border-gray-200 px-3 py-3 hover:border-gray-500"
                onClick={onClose}
              >
                <img
                  src={getImagePath(product.image)}
                  alt={product.title}
                  className="h-[88px] w-[88px] rounded object-cover"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">{product.title}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                    {product.note}
                  </p>
                  <p className="mt-3 text-sm font-bold">
                    ₩{product.price.toLocaleString()}
                  </p>
                </div>
                <i className="fas fa-chevron-right text-sm text-gray-500"></i>
              </Link>
            ))}
          </div>
        )}
      </aside>
    </div>
  );
}

export default ContainerNavbar;
