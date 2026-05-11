// 관리자 권한이 없을 때 사용하는 예외 파일
package com.portfolio.ikea.exception;

public class AdminPermissionException extends RuntimeException {

    public AdminPermissionException() {
        super("관리자 권한이 필요합니다.");
    }
}
