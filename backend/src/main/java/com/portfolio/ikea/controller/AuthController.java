// 회원가입과 로그인 API 컨트롤러 파일
package com.portfolio.ikea.controller;

import com.portfolio.ikea.dto.LoginRequest;
import com.portfolio.ikea.dto.LoginResponse;
import com.portfolio.ikea.dto.SignupRequest;
import com.portfolio.ikea.dto.SignupResponse;
import com.portfolio.ikea.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
// 회원가입, 로그인처럼 인증 관련 요청 처리
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // 회원가입 정보 전달 후 새 회원 생성
    @Operation(summary = "회원가입", description = "사용자가 이름, 이메일, 비밀번호, 전화번호를 입력해서 계정을 만들 때 사용하는 API")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "회원가입 성공"),
            @ApiResponse(responseCode = "400", description = "입력값이 올바르지 않음"),
            @ApiResponse(responseCode = "409", description = "이미 가입된 이메일")
    })
    @PostMapping("/signup")
    public ResponseEntity<SignupResponse> signup(@Valid @RequestBody SignupRequest request) {
        SignupResponse response = authService.signup(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // 이메일, 비밀번호 확인 후 JWT와 회원 정보 전달
    @Operation(summary = "로그인", description = "이메일과 비밀번호를 확인하고 이후 요청에서 사용할 JWT를 발급하는 API")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "로그인 성공"),
            @ApiResponse(responseCode = "400", description = "입력값이 올바르지 않음"),
            @ApiResponse(responseCode = "401", description = "이메일 또는 비밀번호가 맞지 않음")
    })
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);

        return ResponseEntity.ok(response);
    }

    // 지금 저장된 JWT가 실제로 유효한지 확인하고 현재 로그인한 회원 정보를 가져옴
    @Operation(summary = "현재 로그인 회원 확인", description = "브라우저에 저장된 JWT가 아직 유효한지 확인하고 로그인한 회원 정보를 다시 가져오는 API")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "로그인 상태 확인 성공"),
            @ApiResponse(responseCode = "401", description = "토큰이 없거나 만료되어 다시 로그인이 필요함")
    })
    @GetMapping("/me")
    public ResponseEntity<LoginResponse> me(@RequestHeader("Authorization") String authorization) {
        LoginResponse response = authService.getCurrentUser(getToken(authorization));

        return ResponseEntity.ok(response);
    }

    private String getToken(String authorization) {
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            throw new com.portfolio.ikea.exception.AuthenticationRequiredException();
        }

        return authorization.substring(7);
    }
}
