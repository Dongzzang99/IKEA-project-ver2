// 장바구니 상품 추가 요청 DTO 파일
package com.portfolio.ikea.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AddCartItemRequest {

    @Schema(description = "장바구니에 담을 상품 ID", example = "1")
    @NotNull(message = "상품 id가 필요합니다.")
    private Long productId;

    @Schema(description = "장바구니에 담을 수량", example = "2")
    @Min(value = 1, message = "수량은 1개 이상이어야 합니다.")
    private int quantity;
}
