// src/App.jsx
import { useState, useEffect } from "react";
import "./App.css";

import {
  ContainerHeader,
  MainLayout,
  ContainerNavbar,
  Footer,
} from "./components/layout";
import { MenuNavbar, CategoryProductList } from "./components/menu";
import { HomePage,BusanApi } from "./pages";
import ProductDetailPage from "./pages/ProductDetailPage";
import Cart from "./pages/Cart";

import { Route, Routes, useLocation } from "react-router-dom";

function ScrollToTop(){
  const {pathname} = useLocation();

  useEffect(()=>{
    window.scrollTo({top:0, left:0, behavior:"auto"});
  },[pathname]);

  return null;
}

function App() {
  // 카테고리 상태 + 열림 상태 추가
  const [selectedCategory, setSelectedCategory] = useState("none");
  const [isOpen, setIsOpen] = useState(false);

  // 라우트 변경 감지 - url 주소가 바뀌는걸 감지
  const location = useLocation();

  //카테고리 버튼 토글
  const handleSelectCategory = (category) => {
    // 같은 카테고리 다시 누르면 열림/닫힘 토글
    if (category === selectedCategory) {
      setIsOpen((prev) => !prev);
    } else {
      // 다른 카테고리 누르면 선택 변경 + 항상 열기
      setSelectedCategory(category);
      setIsOpen(true);
    }
  };

  //  라우터가 바뀔 때마다 카테고리 리스트 닫기

  useEffect(() => {
    setSelectedCategory("none");
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <ContainerHeader />

      <div className="flex-1">
        <MainLayout>
          {/* 로고, 검색, 아이콘 컴포넌트 */}
          <ContainerNavbar />
          <div className="hidden lg:block">
            {/* 가구 카테고리 카드1 */}
            <MenuNavbar onSelectCategory={handleSelectCategory} />
            {/* 가구 카테고리 카드2 - 카테고리 카드 누르면 나오는 리스트 */}
            <CategoryProductList category={selectedCategory} isOpen={isOpen} />
          </div>
          <ScrollToTop/>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/ebusan" element={<BusanApi/>} />
          </Routes>
        </MainLayout>
      </div>
      <Footer />
    </div>
  );
}

export default App;
