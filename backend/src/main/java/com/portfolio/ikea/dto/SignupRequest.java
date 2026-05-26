// 회원가입 요청 DTO 파일
package com.portfolio.ikea.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SignupRequest {

    @Schema(description = "회원 이름", example = "홍길동")
    @NotBlank(message = "이름을 입력해주세요.")
    private String name;

    @Schema(description = "회원 이메일", example = "user@example.com")
    @Email(message = "이메일 형식이 올바르지 않습니다.")
    @NotBlank(message = "이메일을 입력해주세요.")
    private String email;

    @Schema(description = "회원 비밀번호, 8자 이상 입력", example = "password123")
    @Size(min = 8, message = "비밀번호는 8자 이상 입력해주세요.")
    @NotBlank(message = "비밀번호를 입력해주세요.")
    private String password;

    @Schema(description = "비밀번호 확인 값", example = "password123")
    @NotBlank(message = "비밀번호 확인을 입력해주세요.")
    private String passwordConfirm;

    @Schema(description = "회원 전화번호", example = "010-1234-5678")
    @NotBlank(message = "휴대폰 번호를 입력해주세요.")
    private String phone;

    @Schema(description = "이용약관 동의 여부", example = "true")
    @AssertTrue(message = "이용약관에 동의해주세요.")
    private boolean termsAgreed;
}
