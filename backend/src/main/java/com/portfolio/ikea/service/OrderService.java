package com.portfolio.ikea.service;

import com.portfolio.ikea.dto.CreateOrderRequest;
import com.portfolio.ikea.dto.OrderResponse;
import com.portfolio.ikea.entity.CartItem;
import com.portfolio.ikea.entity.CustomerOrder;
import com.portfolio.ikea.entity.OrderItem;
import com.portfolio.ikea.entity.ShippingMethod;
import com.portfolio.ikea.entity.User;
import com.portfolio.ikea.exception.AuthenticationRequiredException;
import com.portfolio.ikea.exception.CartEmptyException;
import com.portfolio.ikea.repository.CartItemRepository;
import com.portfolio.ikea.repository.OrderRepository;
import com.portfolio.ikea.repository.UserRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;

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

        int productTotalPrice = cartItems.stream()
                .mapToInt(item -> item.getProduct().getPrice() * item.getQuantity())
                .sum();
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

        cartItems.forEach(item -> order.addOrderItem(new OrderItem(item.getProduct(), item.getQuantity())));

        CustomerOrder savedOrder = orderRepository.save(order);
        cartItemRepository.deleteByUser(user);

        return OrderResponse.from(savedOrder);
    }
}
