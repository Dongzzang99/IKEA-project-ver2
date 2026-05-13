// 관리자 API 컨트롤러 파일
package com.portfolio.ikea.controller;

import com.portfolio.ikea.config.JwtTokenProvider;
import com.portfolio.ikea.dto.AdminProductResponse;
import com.portfolio.ikea.dto.AdminProductUpdateRequest;
import com.portfolio.ikea.dto.AdminUserResponse;
import com.portfolio.ikea.dto.OrderResponse;
import com.portfolio.ikea.exception.AuthenticationRequiredException;
import com.portfolio.ikea.service.AdminService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
// 관리자 권한으로 주문, 회원, 상품 관리 데이터 요청 처리
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    private final JwtTokenProvider jwtTokenProvider;

    // 모든 사용자의 주문 목록을 관리자 화면에 전달
    @GetMapping("/orders")
    public List<OrderResponse> getAllOrders(@RequestHeader("Authorization") String authorization) {
        return adminService.getAllOrders(getUserId(authorization));
    }

    // 가입한 회원 목록과 권한 정보를 관리자 화면에 전달
    @GetMapping("/users")
    public List<AdminUserResponse> getUsers(@RequestHeader("Authorization") String authorization) {
        return adminService.getUsers(getUserId(authorization));
    }

    // 관리자가 선택한 상품의 가격, 할인율, 재고 수정
    @PatchMapping("/products/{productId}")
    public AdminProductResponse updateProduct(
            @RequestHeader("Authorization") String authorization,
            @PathVariable Long productId,
            @Valid @RequestBody AdminProductUpdateRequest request
    ) {
        return adminService.updateProduct(getUserId(authorization), productId, request);
    }

    private Long getUserId(String authorization) {
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            throw new AuthenticationRequiredException();
        }

        return jwtTokenProvider.getUserId(authorization.substring(7));
    }
}
