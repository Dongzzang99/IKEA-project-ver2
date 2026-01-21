<p align="center">
<img width="353" height="143" alt="ikea_icon" src="https://github.com/user-attachments/assets/42ea9955-90f0-4152-a2df-6f4d4206a6f3" />
</p>
## 🪑 IKEA Clone – 가구 주문 웹 페이지

IKEA 공식 웹사이트를 참고하여 제작한 **가구 주문 웹 페이지 클론 프로젝트**입니다.  

미리보기 사이트 주소 : https://dongzzang99.github.io/IKEA-project/


---

## 📌 프로젝트 목표
- React 기반 **컴포넌트 설계 능력 향상**
- Redux Toolkit을 활용한 **전역 상태 관리**
- 실제 서비스와 유사한 **쇼핑몰 UI/UX 구조 설계**
- 레이아웃 / 데이터 / 페이지 단위 분리 설계 연습

---

## 🛠 기술 스택

- **Frontend**
  - React
  - Vite
  - JavaScript
- **Routing**
  - React Router  
  → 페이지 이동 및 장바구니 상태를 여러 페이지에서 공유
- **State Management**
  - Redux Toolkit  
  → 장바구니 상태를 전역에서 관리
- **Styling**
  - Tailwind CSS
- **Version Control**
  - Git / GitHub

---

## ✨ 주요 기능

- 카테고리별 가구 상품 조회
- 슬라이드 방식의 상품 리스트 UI
- 개별 상품 상세 페이지
- 장바구니 담기 / 수량 관리
- 장바구니 주문 요약 및 총 금액 계산
- 공통 레이아웃을 활용한 페이지 구성

---

## 📂 프로젝트 파일 구조

### 📁 `src/components/layout/`
공통 레이아웃 및 전역 UI 컴포넌트

- `ContainerHeader.jsx`  
  → 상단 헤더 (로고, 상단 바)
- `ContainerNavbar.jsx`  
  → 검색바 / 상단 네비게이션
- `MainLayout.jsx`  
  → 페이지 공통 레이아웃 래퍼
- `Footer.jsx`  
  → 하단 Footer  

📌 **레이아웃 / 공통 UI 컴포넌트들을 관리하는 폴더**

---

### 📁 `src/components/menu/`
카테고리 및 상품 선택 관련 UI

- `MenuNavbar.jsx`  
  → 카테고리 카드 / 메뉴 UI
- `CategoryProductList.jsx`  
  → 카테고리 선택 시 슬라이드로 열리는 상품 리스트
- `index.jsx`  
  → menu 관련 컴포넌트 일괄 export  

📌 **카테고리 선택 + 상품 리스트 UI를 모듈화**

---

### 📁 `src/data/`
데이터 및 전역 상태 관리

- `productList.jsx`  
  → 상품 데이터 (카테고리, 가격, 세일 정보, 이미지 경로 등)
- `Cart_Redux.jsx`  
  → Redux Toolkit을 이용한 장바구니 상태 관리  

📌 **UI와 데이터 / 전역 상태를 분리한 구조**

---

### 📁 `src/pages/`
라우팅되는 페이지 단위 컴포넌트

- `HomePage.jsx`  
  → 메인 페이지
- `HomePage_SpecialPrice.jsx`  
  → 특가 상품 리스트 페이지
- `ProductDetailPage.jsx`  
  → 개별 상품 상세 페이지
- `Cart.jsx`  
  → 장바구니 페이지 (상품 목록 + 주문 요약)
- `index.jsx`  
  → 페이지 컴포넌트 일괄 export  

📌 **React Router를 통해 실제 라우팅되는 페이지 영역**

---

### 📄 `App.jsx`

- `ContainerHeader`
- `ContainerNavbar`
- `MenuNavbar`
- `CategoryProductList`
- `Footer`

위 컴포넌트들을 조합하여 **공통 레이아웃 구조 구성**

---
### 📄 `실제 동작 gif`
![최종3](https://github.com/user-attachments/assets/77878b15-c726-4b94-ad03-ce5359262543)


--
## 📈 향후 개선 사항 (Optional)

- 실제 API 연동
- 로그인 / 사용자별 장바구니 관리

ver.2 제작 예정 - 새로운 기술 스택을 포함하여 리팩토링 예정
