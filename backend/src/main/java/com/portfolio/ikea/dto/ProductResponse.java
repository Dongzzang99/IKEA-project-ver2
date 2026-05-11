// 상품 조회 응답 DTO 파일
package com.portfolio.ikea.dto;

import com.portfolio.ikea.entity.Product;
import lombok.Builder;
import lombok.Getter;

// 상품 조회 응답 DTO
@Getter
@Builder
public class ProductResponse {

    private Long id;
    private boolean specialPrice;
    private int price;
    private int sale;
    private String title;
    private String image;
    private String note;
    private String category;
    private double rating;
    private int stock;

    public static ProductResponse from(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .specialPrice(product.isSpecialPrice())
                .price(product.getPrice())
                .sale(product.getSale())
                .title(product.getTitle())
                .image(product.getImage())
                .note(product.getNote())
                .category(product.getCategory())
                .rating(product.getRating())
                .stock(product.getStock())
                .build();
    }
}
