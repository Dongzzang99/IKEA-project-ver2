// 장바구니 수량 변경 요청 DTO 파일
package com.portfolio.ikea.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UpdateCartItemRequest {

    @Schema(description = "변경할 장바구니 상품 수량", example = "3")
    @Min(value = 1, message = "수량은 1개 이상이어야 합니다.")
    private int quantity;
}
