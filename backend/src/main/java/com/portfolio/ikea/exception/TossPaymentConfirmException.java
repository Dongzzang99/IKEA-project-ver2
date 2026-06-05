// 토스 결제 승인 요청이 실패했을 때 사용하는 예외 파일
package com.portfolio.ikea.exception;

public class TossPaymentConfirmException extends RuntimeException {

    public TossPaymentConfirmException() {
        super("토스 결제 승인에 실패했습니다.");
    }
}
