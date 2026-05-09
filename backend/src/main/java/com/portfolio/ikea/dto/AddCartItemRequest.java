package com.portfolio.ikea.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

// 장바구니 상품 추가 요청 DTO
@Getter
@NoArgsConstructor
public class AddCartItemRequest {

    @NotNull(message = "상품 id가 필요합니다.")
    private Long productId;

    @Min(value = 1, message = "수량은 1개 이상이어야 합니다.")
    private int quantity;
}
