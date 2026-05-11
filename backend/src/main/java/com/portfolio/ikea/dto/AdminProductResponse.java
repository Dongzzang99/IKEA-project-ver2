// 관리자 상품 수정 응답 DTO 파일
package com.portfolio.ikea.dto;

import com.portfolio.ikea.entity.Product;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AdminProductResponse {

    private Long id;
    private String title;
    private int price;
    private int sale;
    private int stock;
    private boolean specialPrice;
    private String image;
    private String note;
    private String category;

    public static AdminProductResponse from(Product product) {
        return AdminProductResponse.builder()
                .id(product.getId())
                .title(product.getTitle())
                .price(product.getPrice())
                .sale(product.getSale())
                .stock(product.getStock())
                .specialPrice(product.isSpecialPrice())
                .image(product.getImage())
                .note(product.getNote())
                .category(product.getCategory())
                .build();
    }
}
