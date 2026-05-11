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
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    private final JwtTokenProvider jwtTokenProvider;

    @GetMapping("/orders")
    public List<OrderResponse> getAllOrders(@RequestHeader("Authorization") String authorization) {
        // 관리자 API는 프론트에서 메뉴를 숨기는 것만으로 부족해서 서버에서도 권한을 확인함
        return adminService.getAllOrders(getUserId(authorization));
    }

    @GetMapping("/users")
    public List<AdminUserResponse> getUsers(@RequestHeader("Authorization") String authorization) {
        return adminService.getUsers(getUserId(authorization));
    }

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
