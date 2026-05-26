// 주문 생성 요청 DTO 파일
package com.portfolio.ikea.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CreateOrderRequest {

    @Schema(description = "배송 방법, SAVER/STANDARD/CUSTOM 중 하나", example = "STANDARD")
    @NotBlank(message = "배송 방법을 선택해주세요.")
    private String shippingMethod;

    @Schema(description = "주문자 이메일", example = "user@example.com")
    @NotBlank(message = "이메일을 입력해주세요.")
    private String email;

    @Schema(description = "주문자 전화번호", example = "010-1234-5678")
    @NotBlank(message = "전화번호를 입력해주세요.")
    private String phone;

    @Schema(description = "받는 사람 이름", example = "홍길동")
    @NotBlank(message = "이름을 입력해주세요.")
    private String receiverName;

    @Schema(description = "배송지 주소", example = "서울시 강남구 테헤란로")
    @NotBlank(message = "주소를 입력해주세요.")
    private String address;

    @Schema(description = "배송지 상세 주소", example = "101동 1001호")
    @NotBlank(message = "상세주소를 입력해주세요.")
    private String detailAddress;
}
