// 주문 API 컨트롤러 파일
package com.portfolio.ikea.controller;

import com.portfolio.ikea.config.JwtTokenProvider;
import com.portfolio.ikea.dto.CreateOrderRequest;
import com.portfolio.ikea.dto.OrderResponse;
import com.portfolio.ikea.exception.AuthenticationRequiredException;
import com.portfolio.ikea.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
// 로그인한 사용자의 주문 생성과 주문 목록 조회 요청 처리
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final JwtTokenProvider jwtTokenProvider;

    // 현재 로그인한 사용자의 주문 목록 조회
    @Operation(summary = "내 주문 목록 조회", description = "현재 로그인한 사용자가 주문했던 내역을 가져오는 API")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "내 주문 목록 조회 성공"),
            @ApiResponse(responseCode = "401", description = "로그인이 필요함")
    })
    @GetMapping
    public List<OrderResponse> getOrders(@RequestHeader("Authorization") String authorization) {
        return orderService.getOrders(getUserId(authorization));
    }

    // 장바구니 상품과 배송 정보를 기준으로 새 주문 생성
    @Operation(summary = "주문 생성", description = "장바구니 상품과 배송 정보를 기준으로 주문을 생성하고 재고를 차감하는 API")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "주문 생성 성공"),
            @ApiResponse(responseCode = "400", description = "입력값이 올바르지 않거나 장바구니가 비어 있음"),
            @ApiResponse(responseCode = "401", description = "로그인이 필요함"),
            @ApiResponse(responseCode = "409", description = "재고가 부족함")
    })
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OrderResponse createOrder(
            @RequestHeader("Authorization") String authorization,
            @Valid @RequestBody CreateOrderRequest request
    ) {
        return orderService.createOrder(getUserId(authorization), request);
    }

    private Long getUserId(String authorization) {
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            throw new AuthenticationRequiredException();
        }

        return jwtTokenProvider.getUserId(authorization.substring(7));
    }
}
