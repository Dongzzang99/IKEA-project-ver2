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

// 장바구니 API 진입점
@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;
    private final JwtTokenProvider jwtTokenProvider;

    @GetMapping
    public List<CartItemResponse> getCartItems(@RequestHeader("Authorization") String authorization) {
        return cartService.getCartItems(getUserId(authorization));
    }

    @PostMapping("/items")
    @ResponseStatus(HttpStatus.CREATED)
    public CartItemResponse addCartItem(
            @RequestHeader("Authorization") String authorization,
            @Valid @RequestBody AddCartItemRequest request
    ) {
        return cartService.addCartItem(getUserId(authorization), request);
    }

    @PatchMapping("/items/{productId}")
    public CartItemResponse updateCartItem(
            @RequestHeader("Authorization") String authorization,
            @PathVariable Long productId,
            @Valid @RequestBody UpdateCartItemRequest request
    ) {
        return cartService.updateCartItem(getUserId(authorization), productId, request);
    }

    @DeleteMapping("/items/{productId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeCartItem(
            @RequestHeader("Authorization") String authorization,
            @PathVariable Long productId
    ) {
        cartService.removeCartItem(getUserId(authorization), productId);
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void clearCart(@RequestHeader("Authorization") String authorization) {
        cartService.clearCart(getUserId(authorization));
    }

    private Long getUserId(String authorization) {
        // JWT에서 userId를 꺼내서 누구의 장바구니인지 구분함
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            throw new AuthenticationRequiredException();
        }

        return jwtTokenProvider.getUserId(authorization.substring(7));
    }
}
