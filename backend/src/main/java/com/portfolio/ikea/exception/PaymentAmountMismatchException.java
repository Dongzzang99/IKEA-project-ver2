// 결제 금액이 서버 주문 금액과 다를 때 사용하는 예외 파일
package com.portfolio.ikea.exception;

public class PaymentAmountMismatchException extends RuntimeException {

    public PaymentAmountMismatchException() {
        super("결제 금액이 주문 금액과 일치하지 않습니다.");
    }
}
