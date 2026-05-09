package com.portfolio.ikea.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

// 주문하기 버튼을 눌렀을 때 프론트에서 보내는 배송정보
@Getter
@NoArgsConstructor
public class CreateOrderRequest {

    @NotBlank(message = "배송 방법을 선택해주세요.")
    private String shippingMethod;

    @NotBlank(message = "이메일을 입력해주세요.")
    private String email;

    @NotBlank(message = "전화번호를 입력해주세요.")
    private String phone;

    @NotBlank(message = "이름을 입력해주세요.")
    private String receiverName;

    @NotBlank(message = "주소를 입력해주세요.")
    private String address;

    @NotBlank(message = "상세주소를 입력해주세요.")
    private String detailAddress;
}
