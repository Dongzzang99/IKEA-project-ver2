package com.portfolio.ikea.dto;

import com.portfolio.ikea.entity.User;
import lombok.Builder;
import lombok.Getter;

// 로그인 응답 DTO
@Getter
@Builder
public class LoginResponse {

    private Long id;
    private String name;
    private String email;
    private String phone;
    private String tokenType;
    private String accessToken;
    private String message;

    // 로그인 응답에도 비밀번호는 포함하지 않음
    public static LoginResponse from(User user, String accessToken) {
        return LoginResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .tokenType("Bearer")
                .accessToken(accessToken)
                .message("로그인에 성공했습니다.")
                .build();
    }
}
