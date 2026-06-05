// 결제 API 컨트롤러 파일
package com.portfolio.ikea.controller;

import com.portfolio.ikea.config.JwtTokenProvider;
import com.portfolio.ikea.dto.OrderResponse;
import com.portfolio.ikea.dto.TossPaymentConfirmRequest;
import com.portfolio.ikea.dto.TossPaymentFailRequest;
import com.portfolio.ikea.exception.AuthenticationRequiredException;
import com.portfolio.ikea.service.PaymentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payments/toss")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;
    private final JwtTokenProvider jwtTokenProvider;

    @Operation(summary = "토스 결제 승인", description = "토스 결제 성공 후 서버 주문 금액을 검증하고 최종 결제를 승인하는 API")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "결제 승인 성공"),
            @ApiResponse(responseCode = "400", description = "입력값이 올바르지 않음"),
            @ApiResponse(responseCode = "401", description = "로그인이 필요함"),
            @ApiResponse(responseCode = "404", description = "주문을 찾을 수 없음"),
            @ApiResponse(responseCode = "409", description = "주문 상태 또는 결제 금액이 맞지 않음"),
            @ApiResponse(responseCode = "502", description = "토스 결제 승인 실패")
    })
    @PostMapping("/confirm")
    public OrderResponse confirm(
            @RequestHeader("Authorization") String authorization,
            @Valid @RequestBody TossPaymentConfirmRequest request
    ) {
        return paymentService.confirmTossPayment(getUserId(authorization), request);
    }

    @Operation(summary = "토스 결제 실패 처리", description = "토스 결제 실패 또는 취소 시 주문 상태를 실패로 변경하고 재고를 복구하는 API")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "결제 실패 처리 성공"),
            @ApiResponse(responseCode = "401", description = "로그인이 필요함"),
            @ApiResponse(responseCode = "404", description = "주문을 찾을 수 없음")
    })
    @PostMapping("/fail")
    public OrderResponse fail(
            @RequestHeader("Authorization") String authorization,
            @Valid @RequestBody TossPaymentFailRequest request
    ) {
        return paymentService.failTossPayment(getUserId(authorization), request);
    }

    private Long getUserId(String authorization) {
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            throw new AuthenticationRequiredException();
        }

        return jwtTokenProvider.getUserId(authorization.substring(7));
    }
}
