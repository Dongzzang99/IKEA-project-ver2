// 장바구니 상품 응답 DTO 파일
package com.portfolio.ikea.dto;

import com.portfolio.ikea.entity.CartItem;
import com.portfolio.ikea.entity.Product;
import lombok.Builder;
import lombok.Getter;

// 장바구니 상품 응답 DTO
@Getter
@Builder
public class CartItemResponse {

    private Long id;
    private Long productId;
    private String title;
    private int price;
    private String image;
    private String note;
    private int quantity;
    private int stock;

    public static CartItemResponse from(CartItem cartItem) {
        Product product = cartItem.getProduct();

        return CartItemResponse.builder()
                .id(cartItem.getId())
                .productId(product.getId())
                .title(product.getTitle())
                .price(product.getPrice())
                .image(product.getImage())
                .note(product.getNote())
                .quantity(cartItem.getQuantity())
                .stock(product.getStock())
                .build();
    }
}
