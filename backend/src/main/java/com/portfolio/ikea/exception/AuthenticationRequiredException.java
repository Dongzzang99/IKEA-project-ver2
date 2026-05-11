// 로그인이 필요할 때 사용하는 예외 파일
package com.portfolio.ikea.exception;

// 로그인이 필요한 API에서 인증 정보가 없거나 잘못됐을 때 쓰는 예외
public class AuthenticationRequiredException extends RuntimeException {

    public AuthenticationRequiredException() {
        super("로그인이 필요합니다.");
    }
}
