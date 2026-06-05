// 토스 결제 실패 요청 DTO 파일
package com.portfolio.ikea.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TossPaymentFailRequest {

    @Schema(description = "토스 결제 요청에 사용한 주문 ID", example = "ORDER-1")
    @NotBlank(message = "orderId가 필요합니다.")
    private String orderId;

    @Schema(description = "토스 결제 실패 코드", example = "PAY_PROCESS_CANCELED")
    private String code;

    @Schema(description = "토스 결제 실패 메시지", example = "사용자가 결제를 취소했습니다.")
    private String message;
}
