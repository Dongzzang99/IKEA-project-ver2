// 주문 상태를 관리하는 enum 파일
package com.portfolio.ikea.entity;

public enum OrderStatus {
    PENDING_PAYMENT,
    PAID,
    PAYMENT_FAILED,
    CANCELED,
    ORDERED
}
