// 장바구니가 비어 있을 때 사용하는 예외 파일
package com.portfolio.ikea.exception;

public class CartEmptyException extends RuntimeException {

    public CartEmptyException() {
        super("장바구니에 상품이 없습니다.");
    }
}
