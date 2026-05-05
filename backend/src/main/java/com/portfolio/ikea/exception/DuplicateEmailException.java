package com.portfolio.ikea.exception;

// 이미 가입된 이메일일 때 쓰는 에러
public class DuplicateEmailException extends RuntimeException {

    public DuplicateEmailException() {
        super("이미 가입된 이메일입니다.");
    }
}
