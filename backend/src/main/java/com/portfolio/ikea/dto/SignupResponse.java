// 회원가입 응답 DTO 파일
package com.portfolio.ikea.dto;

import com.portfolio.ikea.entity.User;
import lombok.Builder;
import lombok.Getter;

// 회원가입 응답 DTO
@Getter
@Builder
public class SignupResponse {

    private Long id;
    private String name;
    private String email;
    private String phone;
    private String message;

    // 응답에는 비밀번호를 포함하지 않음
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
