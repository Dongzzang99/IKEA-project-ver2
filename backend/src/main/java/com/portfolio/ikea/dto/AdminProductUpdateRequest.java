// 관리자 상품 수정 요청 DTO 파일
package com.portfolio.ikea.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AdminProductUpdateRequest {

    @Min(value = 0, message = "가격은 0원 이상이어야 합니다.")
    private int price;

    @Min(value = 0, message = "할인율은 0 이상이어야 합니다.")
    @Max(value = 100, message = "할인율은 100 이하이어야 합니다.")
    private int sale;

    @Min(value = 0, message = "재고는 0개 이상이어야 합니다.")
    private int stock;
}
