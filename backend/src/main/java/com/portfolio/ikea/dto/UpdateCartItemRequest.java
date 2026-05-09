package com.portfolio.ikea.dto;

import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.NoArgsConstructor;

// 장바구니 수량 변경 요청 DTO
@Getter
@NoArgsConstructor
public class UpdateCartItemRequest {

    @Min(value = 1, message = "수량은 1개 이상이어야 합니다.")
    private int quantity;
}
