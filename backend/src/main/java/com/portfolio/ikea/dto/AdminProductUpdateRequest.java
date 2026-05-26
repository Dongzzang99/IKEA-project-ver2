// 관리자 상품 수정 요청 DTO 파일
package com.portfolio.ikea.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AdminProductUpdateRequest {

    @Schema(description = "수정할 상품 가격", example = "99000")
    @Min(value = 0, message = "가격은 0원 이상이어야 합니다.")
    private int price;

    @Schema(description = "수정할 상품 할인율, 0부터 100까지 입력", example = "10")
    @Min(value = 0, message = "할인율은 0 이상이어야 합니다.")
    @Max(value = 100, message = "할인율은 100 이하여야 합니다.")
    private int sale;

    @Schema(description = "수정할 상품 재고", example = "100")
    @Min(value = 0, message = "재고는 0개 이상이어야 합니다.")
    private int stock;
}
