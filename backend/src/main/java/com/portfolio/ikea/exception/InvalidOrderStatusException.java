// 주문 상태가 현재 요청과 맞지 않을 때 사용하는 예외 파일
package com.portfolio.ikea.exception;

public class InvalidOrderStatusException extends RuntimeException {

    public InvalidOrderStatusException() {
        super("현재 주문 상태에서는 처리할 수 없습니다.");
    }
}
