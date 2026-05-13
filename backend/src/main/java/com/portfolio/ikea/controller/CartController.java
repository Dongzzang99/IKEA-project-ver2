// 장바구니 API 컨트롤러 파일
package com.portfolio.ikea.controller;

import com.portfolio.ikea.config.JwtTokenProvider;
import com.portfolio.ikea.dto.AddCartItemRequest;
import com.portfolio.ikea.dto.CartItemResponse;
import com.portfolio.ikea.dto.UpdateCartItemRequest;
import com.portfolio.ikea.exception.AuthenticationRequiredException;
import com.portfolio.ikea.service.CartService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
// 로그인한 사용자의 장바구니 조회, 추가, 수정, 삭제 요청 처리
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;
    private final JwtTokenProvider jwtTokenProvider;

    // 현재 로그인한 사용자의 장바구니 목록 조회
    @GetMapping
    public List<CartItemResponse> getCartItems(@RequestHeader("Authorization") String authorization) {
        return cartService.getCartItems(getUserId(authorization));
    }

    // 상품 id와 수량을 받아 장바구니에 상품 추가
    @PostMapping("/items")
    @ResponseStatus(HttpStatus.CREATED)
    public CartItemResponse addCartItem(
            @RequestHeader("Authorization") String authorization,
            @Valid @RequestBody AddCartItemRequest request
    ) {
        return cartService.addCartItem(getUserId(authorization), request);
    }

    // 사용자가 장바구니에 담아둔 상품의 수량 수정
    @PatchMapping("/items/{productId}")
    public CartItemResponse updateCartItem(
            @RequestHeader("Authorization") String authorization,
            @PathVariable Long productId,
            @Valid @RequestBody UpdateCartItemRequest request
    ) {
        return cartService.updateCartItem(getUserId(authorization), productId, request);
    }

    // 사용자가 선택한 상품을 장바구니에서 삭제
    @DeleteMapping("/items/{productId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeCartItem(
            @RequestHeader("Authorization") String authorization,
            @PathVariable Long productId
    ) {
        cartService.removeCartItem(getUserId(authorization), productId);
    }

    // 현재 사용자의 장바구니 전체 비우기
    @DeleteMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void clearCart(@RequestHeader("Authorization") String authorization) {
        cartService.clearCart(getUserId(authorization));
    }

    private Long getUserId(String authorization) {
        // JWT에서 userId를 꺼내 누구의 장바구니인지 구분
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            throw new AuthenticationRequiredException();
        }

        return jwtTokenProvider.getUserId(authorization.substring(7));
    }
}
