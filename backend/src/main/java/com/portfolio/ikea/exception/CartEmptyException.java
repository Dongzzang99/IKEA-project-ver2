package com.portfolio.ikea.exception;

public class CartEmptyException extends RuntimeException {

    public CartEmptyException() {
        super("장바구니에 상품이 없습니다.");
    }
}
