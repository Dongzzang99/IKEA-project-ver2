// 로그인 정보가 틀렸을 때 사용하는 예외 파일
package com.portfolio.ikea.exception;

// 이메일 또는 비밀번호가 맞지 않을 때 쓰는 예외
public class InvalidLoginException extends RuntimeException {

    public InvalidLoginException() {
        super("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
}
