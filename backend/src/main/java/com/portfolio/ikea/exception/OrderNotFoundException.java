// 주문을 찾지 못했을 때 사용하는 예외 파일
package com.portfolio.ikea.exception;

public class OrderNotFoundException extends RuntimeException {

    public OrderNotFoundException() {
        super("주문 정보를 찾을 수 없습니다.");
    }
}
