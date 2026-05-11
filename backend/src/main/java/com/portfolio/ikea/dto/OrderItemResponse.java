// 주문 상품 응답 DTO 파일
package com.portfolio.ikea.dto;

import com.portfolio.ikea.entity.OrderItem;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OrderItemResponse {

    private Long productId;
    private String productTitle;
    private String image;
    private int productPrice;
    private int quantity;
    private int lineTotalPrice;

    public static OrderItemResponse from(OrderItem orderItem) {
        return OrderItemResponse.builder()
                .productId(orderItem.getProduct().getId())
                .productTitle(orderItem.getProductTitle())
                .image(orderItem.getProduct().getImage())
                .productPrice(orderItem.getProductPrice())
                .quantity(orderItem.getQuantity())
                .lineTotalPrice(orderItem.getLineTotalPrice())
                .build();
    }
}
