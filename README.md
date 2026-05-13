<p align="center">
<img width="353" height="143" alt="ikea_icon" src="https://github.com/user-attachments/assets/42ea9955-90f0-4152-a2df-6f4d4206a6f3" />
</p>
## 🪑 IKEA Clone – 가구 주문 웹 페이지

React로 만든 IKEA-Clone 프론트엔드 프로젝트를 백엔드 기반 주문 시스템으로 확장한 포트폴리오 프로젝트입니다.

기존에는 상품 데이터와 장바구니를 프론트(Redux)에서만 처리했지만, 리팩토링 과정에서 회원, JWT인증, 장바구니, 주문, 관리자 권한 부여 기능을 백엔드 API와 DB 중심 구조로 변경했습니다.

## 프로젝트 목표

- 프론트엔드 중심 프로젝트를 실제 주문 흐름이 IKEA 백엔드 프로젝트로 확장
- JWT 로그인 인증 구현
- 로그인 사용자별 장바구니 DB 저장
- 서버 기준 주문 생성과 재고 차감 처리
- 관리자 권한 기반 주문, 회원, 상품 관리 기능 구현
- 이미지 최적화와 배포 전 빌드 문제 해결 경험 정리

## 기술 스택

### Frontend

- React
- Vite
- React Router
- Redux Toolkit
- Tailwind CSS

### Backend

- Java 17
- Spring Boot 3.3.5
- Spring Web
- Spring Data JPA
- Validation (DB들어오는 데이터 형식 검사)
- JWT

### Database

- MySQL / MariaDB

## 주요 추가 기능

### 회원 / 인증

- 회원가입
- 로그인
- JWT 발급
- 로그인 상태 유지
- 로그아웃
- 관리자 권한 분리

### 상품

- 상품 목록 조회
- 상품 상세 조회
- 특가 상품 조회
- 카테고리별 상품 조회
- 검색어 기반 상품 검색
- 최근 본 가구 표시
- 상품별 재고 표시

### 장바구니

- 로그인 사용자 기준 장바구니 DB 저장
- 장바구니 상품 추가
- 장바구니 수량 수정
- 장바구니 상품 삭제
- 새로고침 후에도 장바구니 유지
- 재고보다 많은 수량 추가 방지

### 주문

- 배송 방법 선택
- 배송 정보 입력
- 주문 생성
- 주문 완료 화면
- 주문 목록 조회
- 주문 생성 시 DB 장바구니 기준으로 금액 계산
- 주문 생성 시 재고 차감
- 트랜잭션 적용으로 주문 저장, 주문 상품 저장, 재고 차감, 장바구니 삭제를 하나의 흐름으로 처리

### 관리자

- 관리자 페이지 접근 제한
- 모든 주문 조회
- 회원 목록 조회
- 상품 가격 수정
- 상품 할인율 수정
- 상품 재고 수정

## API

사용한 API는 [docs/API.md] 에서 보실 수 있습니다.

주요 API:

```text
POST   /api/auth/signup
POST   /api/auth/login

GET    /api/products
GET    /api/products/{productId}
GET    /api/products/special-price

GET    /api/cart
POST   /api/cart/items
PATCH  /api/cart/items/{productId}
DELETE /api/cart/items/{productId}

GET    /api/orders
POST   /api/orders

GET    /api/admin/orders
GET    /api/admin/users
PATCH  /api/admin/products/{productId}
```

## 프로젝트 구조

```text
IKEA-project-ver2
├─ backend
│  ├─ src/main/java/com/portfolio/ikea
│  │  ├─ controller
│  │  ├─ service
│  │  ├─ repository
│  │  ├─ entity
│  │  ├─ dto
│  │  ├─ config
│  │  └─ exception
│  └─ pom.xml
├─ src
│  ├─ api
│  ├─ components
│  ├─ pages
│  ├─ data
│  └─ utils
├─ public
├─ docs
├─ scripts
└─ package.json
```

## 문제 해결 기록

### 장바구니 새로고침 문제

초기 장바구니는 Redux를 활용한 프론트 상태로만 저장 및 관리되어 새로고침하면 데이터가 사라졌습니다.

이를 해결하기 위해 로그인 사용자 기준으로 장바구니 데이터를 DB에 저장하도록 변경했습니다. 이후 주문 생성도 프론트에서 전달한 상품 정보가 아니라 서버의 DB 장바구니를 기준으로 처리하도록 개선했습니다.

### 클라이언트 가격 조작 방지

주문 금액을 프론트에서 전달받으면 사용자가 가격을 조작할 수 있는 문제가 있다고 생각했습니다.

주문 생성 시 서버에서 상품 가격과 수량을 다시 조회하고, DB 기준으로 상품 금액과 배송비를 계산하도록 변경했습니다.

### 주문 생성 트랜잭션과 재고 관리

주문 생성 시에는 주문 저장, 주문 상품 저장, 재고 차감, 장바구니 삭제가 함께 처리됩니다.

이 과정 중 하나라도 실패하면 데이터가 꼬일 수 있기 때문에 `@Transactional`을 적용해 모든 작업이 성공했을 때만 저장되도록 했습니다.

또한 여러 사용자가 동시에 주문했을때 재고가 음수가 되면 안되기 때문에, 상품을 조회할 때 비관적 락을 사용해 재고 차감 중에는 다른 요청이 동시에 수정하지 못하게 처리했습니다.

### 이미지 최적화 (이미지 리사이징)

상품 이미지 최적화를 위해 이미지 처리 라이브러리인 sharp을 사용 했습니다.
기존 PNG 이미지 파일을 WebP로 변환했습니다.

```text
원본 평균 용량: 약 22.13KB
WebP 평균 용량: 약 8.12KB
```

자세한 이미지 리사이징 결과는 포트폴리오 [https://dongzzang99.github.io/portfolio/]에 작성 완료 했습니다.

또 반복적으로 노출되는 상품 이미지에는 `loading="lazy"`를 적용해 초기 로딩 부담을 줄였습니다.

## 검색 기능 관련

- 현재 검색 기능은 db에 저장된 상품 데이터를 가지고온 뒤, 프론트에서 상품명과 카테고리를 기준으로 필터링 하는 방식으로 구현했습니다.
  검색량 수가 많지 않은 초기에 적합하다 생각하였지만 추후 데이터가 많아질 경우 백엔드 검색 API로 확장 할 수 있도록 개선 할 예정입니다.

## 앞으로 개선할 점

- 주문 상태 관리 (배송중, 배송 완료 등 시간별 상태)
- 상품 검색 API 백엔드로 관리
- 리뷰 및 별점 기능 추가

