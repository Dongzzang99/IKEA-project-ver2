# API Guide

## 기본 정보

- 로컬 백엔드 주소: `http://localhost:8080`
- 배포 백엔드 주소: 배포 환경의 서버 주소 사용
- 요청/응답 형식: JSON

로그인이 필요한 API는 아래 Header를 함께 보냅니다.

```http
Authorization: Bearer {accessToken}
Content-Type: application/json
```

## 인증 API

### 회원가입

```http
POST /api/auth/signup
```

사용자 계정을 생성합니다.

```json
{
  "name": "홍길동",
  "email": "user@example.com",
  "password": "password123",
  "passwordConfirm": "password123",
  "phone": "010-1234-5678",
  "termsAgreed": true
}
```

### 로그인

```http
POST /api/auth/login
```

이메일과 비밀번호를 확인하고 JWT를 발급합니다.

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

응답에는 `accessToken`, `name`, `email`, `role` 등의 정보가 포함됩니다.

## 상품 API

### 상품 목록 조회

```http
GET /api/products
```

전체 상품 목록을 조회합니다.

### 카테고리별 상품 조회

```http
GET /api/products?category=침대
```

선택한 카테고리에 해당하는 상품 목록을 조회합니다.

### 상품 상세 조회

```http
GET /api/products/{productId}
```

사용자가 선택한 상품의 상세 정보를 조회합니다.

### 특가 상품 조회

```http
GET /api/products/special-price
```

특가 상품 목록을 조회합니다.

## 장바구니 API

장바구니 API는 로그인 후 이용할 수 있습니다.

### 장바구니 조회

```http
GET /api/cart
```

현재 로그인한 사용자의 장바구니 목록을 조회합니다.

### 장바구니 상품 추가

```http
POST /api/cart/items
```

상품을 장바구니에 추가합니다. 이미 같은 상품이 있으면 수량을 증가시킵니다.

```json
{
  "productId": 1,
  "quantity": 2
}
```

### 장바구니 수량 변경

```http
PATCH /api/cart/items/{productId}
```

장바구니에 담긴 상품 수량을 변경합니다.

```json
{
  "quantity": 3
}
```

### 장바구니 상품 삭제

```http
DELETE /api/cart/items/{productId}
```

선택한 상품을 장바구니에서 삭제합니다.

### 장바구니 전체 비우기

```http
DELETE /api/cart
```

현재 로그인한 사용자의 장바구니를 전체 삭제합니다.

## 주문 API

주문 API는 로그인 후 이용할 수 있습니다.

### 내 주문 목록 조회

```http
GET /api/orders
```

현재 로그인한 사용자의 주문 목록을 조회합니다.

### 주문 생성

```http
POST /api/orders
```

장바구니에 담긴 상품을 기준으로 주문을 생성합니다. 주문 생성 시 서버에서 상품 가격을 다시 계산하고 재고를 차감합니다.

```json
{
  "shippingMethod": "STANDARD",
  "email": "user@example.com",
  "phone": "010-1234-5678",
  "receiverName": "홍길동",
  "address": "서울시 강남구",
  "detailAddress": "101동 1001호"
}
```

배송 방법 값은 아래 중 하나를 사용합니다.

- `SAVER`: 알뜰배송
- `STANDARD`: 일반배송
- `CUSTOM`: 맞춤배송

## 관리자 API

관리자 API는 로그인 후 이용할 수 있으며, DB의 사용자 `role` 값이 `ADMIN`이어야 접근할 수 있습니다.

### 전체 주문 조회

```http
GET /api/admin/orders
```

모든 사용자의 주문 목록을 조회합니다.

### 회원 목록 조회

```http
GET /api/admin/users
```

가입한 회원 목록과 권한 정보를 조회합니다.

### 상품 정보 수정

```http
PATCH /api/admin/products/{productId}
```

관리자가 상품의 가격, 할인율, 재고를 수정합니다.

```json
{
  "price": 99000,
  "sale": 10,
  "stock": 100
}
```

## 권한 정리

| API 구분 | 인증 필요 | ADMIN 권한 필요 |
| --- | --- | --- |
| 회원가입 | 아니오 | 아니오 |
| 로그인 | 아니오 | 아니오 |
| 상품 조회 | 아니오 | 아니오 |
| 장바구니 | 예 | 아니오 |
| 주문 | 예 | 아니오 |
| 관리자 | 예 | 예 |

## 주요 에러 응답

| 상태 코드 | 의미 |
| --- | --- |
| `400 Bad Request` | 요청 값이 올바르지 않음 |
| `401 Unauthorized` | 로그인 인증이 필요함 |
| `403 Forbidden` | 관리자 권한이 없음 |
| `404 Not Found` | 상품 등 요청한 데이터를 찾을 수 없음 |
| `409 Conflict` | 이메일 중복 또는 재고 부족 |
