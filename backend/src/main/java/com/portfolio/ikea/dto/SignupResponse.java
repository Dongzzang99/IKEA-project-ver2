package com.portfolio.ikea.dto;

import com.portfolio.ikea.entity.User;
import lombok.Builder;
import lombok.Getter;

// 회원가입 성공 후 프론트로 보내는 값
@Getter
@Builder
public class SignupResponse {

    private Long id;
    private String name;
    private String email;
    private String phone;
    private String message;

    public static SignupResponse from(User user) {
        return SignupResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .message("회원가입이 완료되었습니다.")
                .build();
    }
}
