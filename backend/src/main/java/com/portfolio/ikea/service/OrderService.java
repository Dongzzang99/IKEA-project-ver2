// 주문 생성과 주문 조회 비즈니스 로직 파일
package com.portfolio.ikea.service;

import com.portfolio.ikea.dto.CreateOrderRequest;
import com.portfolio.ikea.dto.OrderResponse;
import com.portfolio.ikea.entity.CartItem;
import com.portfolio.ikea.entity.CustomerOrder;
import com.portfolio.ikea.entity.OrderItem;
import com.portfolio.ikea.entity.Product;
import com.portfolio.ikea.entity.ShippingMethod;
import com.portfolio.ikea.entity.User;
import com.portfolio.ikea.exception.AuthenticationRequiredException;
import com.portfolio.ikea.exception.CartEmptyException;
import com.portfolio.ikea.repository.CartItemRepository;
import com.portfolio.ikea.repository.OrderRepository;
import com.portfolio.ikea.repository.ProductRepository;
import com.portfolio.ikea.repository.UserRepository;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Transactional(readOnly = true)
    public List<OrderResponse> getOrders(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(AuthenticationRequiredException::new);

        return orderRepository.findByUserOrderByIdDesc(user)
                .stream()
                .map(OrderResponse::from)
                .toList();
    }

    @Transactional
    public OrderResponse createOrder(Long userId, CreateOrderRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(AuthenticationRequiredException::new);
        List<CartItem> cartItems = cartItemRepository.findByUserOrderByIdDesc(user);

        if (cartItems.isEmpty()) {
            throw new CartEmptyException();
        }

        List<Long> productIds = cartItems.stream()
                .map(item -> item.getProduct().getId())
                .distinct()
                .toList();
        Map<Long, Product> lockedProducts = productRepository.findAllByIdInWithLock(productIds)
                .stream()
                .collect(Collectors.toMap(Product::getId, Function.identity()));

        int productTotalPrice = cartItems.stream()
                .mapToInt(item -> {
                    Product product = lockedProducts.get(item.getProduct().getId());
                    return product.getPrice() * item.getQuantity();
                })
                .sum();
        // 주문 금액은 프론트가 보낸 값이 아니라 DB 상품 가격 기준으로 다시 계산함
        ShippingMethod shippingMethod = ShippingMethod.from(request.getShippingMethod());
        CustomerOrder order = new CustomerOrder(
                user,
                shippingMethod,
                productTotalPrice,
                request.getEmail(),
                request.getPhone(),
                request.getReceiverName(),
                request.getAddress(),
                request.getDetailAddress()
        );

        cartItems.forEach(item -> {
            Product product = lockedProducts.get(item.getProduct().getId());
            product.decreaseStock(item.getQuantity());
            order.addOrderItem(new OrderItem(product, item.getQuantity()));
        });

        CustomerOrder savedOrder = orderRepository.save(order);

        return OrderResponse.from(savedOrder);
    }
}
