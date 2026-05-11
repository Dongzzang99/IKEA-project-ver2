// 상품 재고가 부족할 때 사용하는 예외 파일
package com.portfolio.ikea.exception;

public class OutOfStockException extends RuntimeException {

    public OutOfStockException(String productTitle, int stock, int quantity) {
        super(productTitle + " 재고가 부족합니다. 현재 재고: " + stock + "개, 주문 수량: " + quantity + "개");
    }
}
