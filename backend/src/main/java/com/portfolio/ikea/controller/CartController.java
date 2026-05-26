// 장바구니 API 컨트롤러 파일
package com.portfolio.ikea.controller;

import com.portfolio.ikea.config.JwtTokenProvider;
import com.portfolio.ikea.dto.AddCartItemRequest;
import com.portfolio.ikea.dto.CartItemResponse;
import com.portfolio.ikea.dto.UpdateCartItemRequest;
import com.portfolio.ikea.exception.AuthenticationRequiredException;
import com.portfolio.ikea.service.CartService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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

    @Operation(summary = "장바구니 조회", description = "현재 로그인한 사용자의 장바구니 상품 목록을 가져오는 API")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "장바구니 조회 성공"),
            @ApiResponse(responseCode = "401", description = "로그인이 필요함")
    })
    @GetMapping
    public List<CartItemResponse> getCartItems(@RequestHeader("Authorization") String authorization) {
        return cartService.getCartItems(getUserId(authorization));
    }

    @Operation(summary = "장바구니 상품 추가", description = "사용자가 선택한 상품과 수량을 장바구니에 담는 API")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "장바구니 상품 추가 성공"),
            @ApiResponse(responseCode = "400", description = "입력값이 올바르지 않음"),
            @ApiResponse(responseCode = "401", description = "로그인이 필요함"),
            @ApiResponse(responseCode = "404", description = "상품을 찾을 수 없음"),
            @ApiResponse(responseCode = "409", description = "재고가 부족함")
    })
    @PostMapping("/items")
    @ResponseStatus(HttpStatus.CREATED)
    public CartItemResponse addCartItem(
            @RequestHeader("Authorization") String authorization,
            @Valid @RequestBody AddCartItemRequest request
    ) {
        return cartService.addCartItem(getUserId(authorization), request);
    }

    @Operation(summary = "장바구니 수량 변경", description = "장바구니에 담긴 상품의 수량을 사용자가 선택한 값으로 변경하는 API")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "장바구니 수량 변경 성공"),
            @ApiResponse(responseCode = "400", description = "입력값이 올바르지 않음"),
            @ApiResponse(responseCode = "401", description = "로그인이 필요함"),
            @ApiResponse(responseCode = "404", description = "상품을 찾을 수 없음"),
            @ApiResponse(responseCode = "409", description = "재고가 부족함")
    })
    @PatchMapping("/items/{productId}")
    public CartItemResponse updateCartItem(
            @RequestHeader("Authorization") String authorization,
            @PathVariable Long productId,
            @Valid @RequestBody UpdateCartItemRequest request
    ) {
        return cartService.updateCartItem(getUserId(authorization), productId, request);
    }

    @Operation(summary = "장바구니 상품 삭제", description = "사용자가 선택한 상품을 장바구니에서 삭제하는 API")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "장바구니 상품 삭제 성공"),
            @ApiResponse(responseCode = "401", description = "로그인이 필요함")
    })
    @DeleteMapping("/items/{productId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeCartItem(
            @RequestHeader("Authorization") String authorization,
            @PathVariable Long productId
    ) {
        cartService.removeCartItem(getUserId(authorization), productId);
    }

    @Operation(summary = "장바구니 전체 비우기", description = "현재 로그인한 사용자의 장바구니를 전부 비우는 API")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "장바구니 전체 비우기 성공"),
            @ApiResponse(responseCode = "401", description = "로그인이 필요함")
    })
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
