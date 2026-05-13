// 회원가입과 로그인 API 컨트롤러 파일
package com.portfolio.ikea.controller;

import com.portfolio.ikea.dto.LoginRequest;
import com.portfolio.ikea.dto.LoginResponse;
import com.portfolio.ikea.dto.SignupRequest;
import com.portfolio.ikea.dto.SignupResponse;
import com.portfolio.ikea.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
// 회원가입, 로그인처럼 인증 관련 요청 처리
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // 회원가입 정보 전달 후 새 회원 생성
    @PostMapping("/signup")
    public ResponseEntity<SignupResponse> signup(@Valid @RequestBody SignupRequest request) {
        SignupResponse response = authService.signup(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // 이메일, 비밀번호 확인 후 JWT와 회원 정보 전달
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);

        return ResponseEntity.ok(response);
    }
}
