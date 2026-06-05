// 전체 라우팅과 공통 레이아웃을 관리하는 파일
import { useEffect, useState } from "react";
import "./App.css";

import {
  ContainerHeader,
  MainLayout,
  ContainerNavbar,
  Footer,
} from "./components/layout";
import { MenuNavbar, CategoryProductList } from "./components/menu";
import { HomePage, BusanApi, LoginPage, SignupPage } from "./pages";
import ProductDetailPage from "./pages/ProductDetailPage";
import Cart from "./pages/Cart";
import OrderPage from "./pages/OrderPage";
import ProfilePage from "./pages/ProfilePage";
import OrderListPage from "./pages/OrderListPage";
import AccountPage from "./pages/AccountPage";
import SignupWelcomePage from "./pages/SignupWelcomePage";
import AdminPage from "./pages/AdminPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PaymentFailPage from "./pages/PaymentFailPage";

import { Route, Routes, useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function App() {
  const location = useLocation();
  const [categoryMenu, setCategoryMenu] = useState({
    selectedCategory: "none",
    isOpen: false,
    pathname: location.pathname,
  });

  const isSamePage = categoryMenu.pathname === location.pathname;
  const selectedCategory = isSamePage ? categoryMenu.selectedCategory : "none";
  const isOpen = isSamePage ? categoryMenu.isOpen : false;

  const handleSelectCategory = (category) => {
    // 같은 페이지에서 같은 카테고리 클릭 시 열림/닫힘 토글
    setCategoryMenu((prev) => {
      const isSameCategory =
        prev.pathname === location.pathname && prev.selectedCategory === category;

      return {
        selectedCategory: category,
        isOpen: isSameCategory ? !prev.isOpen : true,
        pathname: location.pathname,
      };
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <ContainerHeader />

      <div className="flex-1">
        <MainLayout>
          <ContainerNavbar />
          <div className="hidden lg:block">
            <MenuNavbar onSelectCategory={handleSelectCategory} />
            <CategoryProductList category={selectedCategory} isOpen={isOpen} />
          </div>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/mypage/profile" element={<ProfilePage />} />
            <Route path="/mypage/orders" element={<OrderListPage />} />
            <Route path="/mypage/account" element={<AccountPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/payment/success" element={<PaymentSuccessPage />} />
            <Route path="/payment/fail" element={<PaymentFailPage />} />
            <Route path="/ebusan" element={<BusanApi />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signup/welcome" element={<SignupWelcomePage />} />
          </Routes>
        </MainLayout>
      </div>
      <Footer />
    </div>
  );
}

export default App;
