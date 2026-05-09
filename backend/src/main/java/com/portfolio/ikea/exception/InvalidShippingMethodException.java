package com.portfolio.ikea.exception;

public class InvalidShippingMethodException extends RuntimeException {

    public InvalidShippingMethodException() {
        super("배송 방법을 다시 선택해주세요.");
    }
}
