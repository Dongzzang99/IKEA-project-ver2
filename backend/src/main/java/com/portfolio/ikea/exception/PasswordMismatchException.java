package com.portfolio.ikea.exception;

// 비밀번호와 비밀번호 확인이 다를 때 쓰는 에러
public class PasswordMismatchException extends RuntimeException {

    public PasswordMismatchException() {
        super("비밀번호가 일치하지 않습니다.");
    }
}
