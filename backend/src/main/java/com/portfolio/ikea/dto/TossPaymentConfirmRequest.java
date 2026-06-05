// 토스 결제 승인 요청 DTO 파일
package com.portfolio.ikea.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TossPaymentConfirmRequest {

    @Schema(description = "토스 결제 성공 후 전달받은 paymentKey", example = "tgen_20260605123456")
    @NotBlank(message = "paymentKey가 필요합니다.")
    private String paymentKey;

    @Schema(description = "토스 결제 요청에 사용한 주문 ID", example = "ORDER-1")
    @NotBlank(message = "orderId가 필요합니다.")
    private String orderId;

    @Schema(description = "토스 결제 성공 후 전달받은 결제 금액", example = "129000")
    @Min(value = 1, message = "결제 금액은 1원 이상이어야 합니다.")
    private int amount;
}
