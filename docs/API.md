## API 명세

### 회원가입

POST /api/auth/signup

### 로그인

POST /api/auth/login

### 상품 목록 조회

GET /api/products

### 상품 상세 조회

GET /api/products/{productId}

### 특가 상품 조회

GET /api/products/special-price

### 장바구니 조회

GET /api/cart  
(로그인 후 이용 가능)

### 장바구니 상품 추가

POST /api/cart/items  
(로그인 후 이용 가능)

### 장바구니 수량 변경

PATCH /api/cart/items/{productId}  
(로그인 후 이용 가능)

### 장바구니 상품 삭제

DELETE /api/cart/items/{productId}  
(로그인 후 이용 가능)

### 장바구니 전체 삭제

DELETE /api/cart  
(로그인 후 이용 가능)

### 내 주문 목록 조회

GET /api/orders  
(로그인 후 이용 가능)

### 주문 생성

POST /api/orders  
(로그인 후 이용 가능)

### 관리자 전체 주문 조회

GET /api/admin/orders  
(권한(role)이 ADMIN만 접근 가능)

### 관리자 회원 목록 조회

GET /api/admin/users  
(권한(role)이 ADMIN만 접근 가능)

### 관리자 상품 수정

PATCH /api/admin/products/{productId}  
(권한(role)이 ADMIN만 접근 가능)

