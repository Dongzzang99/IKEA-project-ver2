// 상품을 찾지 못했을 때 사용하는 예외 파일
package com.portfolio.ikea.exception;

// 상품을 찾지 못했을 때 쓰는 예외
public class ProductNotFoundException extends RuntimeException {

    public ProductNotFoundException() {
        super("상품을 찾을 수 없습니다.");
    }
}
