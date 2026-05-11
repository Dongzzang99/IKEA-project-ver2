// 이메일이 중복될 때 사용하는 예외 파일
package com.portfolio.ikea.exception;

// 이메일 중복 가입 예외
public class DuplicateEmailException extends RuntimeException {

    public DuplicateEmailException() {
        super("이미 가입된 이메일입니다.");
    }
}
