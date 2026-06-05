// 토스 결제 승인과 실패 처리를 담당하는 서비스 파일
package com.portfolio.ikea.service;

import com.portfolio.ikea.dto.OrderResponse;
import com.portfolio.ikea.dto.TossPaymentConfirmRequest;
import com.portfolio.ikea.dto.TossPaymentFailRequest;
import com.portfolio.ikea.entity.CustomerOrder;
import com.portfolio.ikea.entity.OrderItem;
import com.portfolio.ikea.entity.Product;
import com.portfolio.ikea.entity.User;
import com.portfolio.ikea.exception.AuthenticationRequiredException;
import com.portfolio.ikea.exception.InvalidOrderStatusException;
import com.portfolio.ikea.exception.OrderNotFoundException;
import com.portfolio.ikea.exception.PaymentAmountMismatchException;
import com.portfolio.ikea.exception.TossPaymentConfirmException;
import com.portfolio.ikea.repository.CartItemRepository;
import com.portfolio.ikea.repository.OrderRepository;
import com.portfolio.ikea.repository.ProductRepository;
import com.portfolio.ikea.repository.UserRepository;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final HttpClient httpClient = HttpClient.newHttpClient();

    @Value("${toss.payments.secret-key}")
    private String tossSecretKey;

    @Value("${toss.payments.confirm-url}")
    private String tossConfirmUrl;

    @Transactional
    public OrderResponse confirmTossPayment(Long userId, TossPaymentConfirmRequest request) {
        User user = getUser(userId);
        CustomerOrder order = getOrder(request.getOrderId());
        validateOrderOwner(order, user);

        if (!order.isPendingPayment()) {
            throw new InvalidOrderStatusException();
        }

        if (order.getTotalPrice() != request.getAmount()) {
            throw new PaymentAmountMismatchException();
        }

        requestTossConfirm(request);
        order.markPaid();
        cartItemRepository.deleteByUser(user);

        return OrderResponse.from(order);
    }

    @Transactional
    public OrderResponse failTossPayment(Long userId, TossPaymentFailRequest request) {
        User user = getUser(userId);
        CustomerOrder order = getOrder(request.getOrderId());
        validateOrderOwner(order, user);

        if (!order.isPendingPayment()) {
            return OrderResponse.from(order);
        }

        restoreOrderStock(order);
        order.markPaymentFailed();

        return OrderResponse.from(order);
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(AuthenticationRequiredException::new);
    }

    private CustomerOrder getOrder(String tossOrderId) {
        return orderRepository.findById(parseOrderId(tossOrderId))
                .orElseThrow(OrderNotFoundException::new);
    }

    private Long parseOrderId(String tossOrderId) {
        try {
            return Long.valueOf(tossOrderId.replace("ORDER-", ""));
        } catch (NumberFormatException exception) {
            throw new OrderNotFoundException();
        }
    }

    private void validateOrderOwner(CustomerOrder order, User user) {
        if (!order.getUser().getId().equals(user.getId())) {
            throw new OrderNotFoundException();
        }
    }

    private void restoreOrderStock(CustomerOrder order) {
        List<Long> productIds = order.getOrderItems().stream()
                .map(item -> item.getProduct().getId())
                .distinct()
                .toList();
        Map<Long, Product> lockedProducts = productRepository.findAllByIdInWithLock(productIds)
                .stream()
                .collect(Collectors.toMap(Product::getId, Function.identity()));

        order.getOrderItems().forEach(item -> {
            Product product = lockedProducts.get(item.getProduct().getId());
            product.restoreStock(item.getQuantity());
        });
    }

    private void requestTossConfirm(TossPaymentConfirmRequest request) {
        String authorization = Base64.getEncoder()
                .encodeToString((tossSecretKey + ":").getBytes(StandardCharsets.UTF_8));
        String requestBody = """
                {
                  "paymentKey": "%s",
                  "orderId": "%s",
                  "amount": %d
                }
                """.formatted(escapeJson(request.getPaymentKey()), escapeJson(request.getOrderId()), request.getAmount());

        HttpRequest httpRequest = HttpRequest.newBuilder()
                .uri(URI.create(tossConfirmUrl))
                .header("Authorization", "Basic " + authorization)
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();

        try {
            HttpResponse<String> response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() < 200 || response.statusCode() >= 300) {
                throw new TossPaymentConfirmException();
            }
        } catch (InterruptedException exception) {
            Thread.currentThread().interrupt();
            throw new TossPaymentConfirmException();
        } catch (Exception exception) {
            throw new TossPaymentConfirmException();
        }
    }

    private String escapeJson(String value) {
        return value.replace("\\", "\\\\").replace("\"", "\\\"");
    }
}
