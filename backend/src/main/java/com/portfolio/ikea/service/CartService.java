// 장바구니 비즈니스 로직 파일
package com.portfolio.ikea.service;

import com.portfolio.ikea.dto.AddCartItemRequest;
import com.portfolio.ikea.dto.CartItemResponse;
import com.portfolio.ikea.dto.UpdateCartItemRequest;
import com.portfolio.ikea.entity.CartItem;
import com.portfolio.ikea.entity.Product;
import com.portfolio.ikea.entity.User;
import com.portfolio.ikea.exception.ProductNotFoundException;
import com.portfolio.ikea.repository.CartItemRepository;
import com.portfolio.ikea.repository.ProductRepository;
import com.portfolio.ikea.repository.UserRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// 장바구니 비즈니스 로직
@Service
@RequiredArgsConstructor
public class CartService {

    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<CartItemResponse> getCartItems(Long userId) {
        User user = getUser(userId);

        return cartItemRepository.findByUserOrderByIdDesc(user)
                .stream()
                .map(CartItemResponse::from)
                .toList();
    }

    @Transactional
    public CartItemResponse addCartItem(Long userId, AddCartItemRequest request) {
        User user = getUser(userId);
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(ProductNotFoundException::new);

        CartItem cartItem = cartItemRepository.findByUserAndProduct(user, product)
                .map(existingItem -> {
                    existingItem.addQuantity(request.getQuantity());
                    return existingItem;
                })
                .orElseGet(() -> new CartItem(user, product, request.getQuantity()));

        return CartItemResponse.from(cartItemRepository.save(cartItem));
    }

    @Transactional
    public CartItemResponse updateCartItem(Long userId, Long productId, UpdateCartItemRequest request) {
        User user = getUser(userId);
        CartItem cartItem = cartItemRepository.findByUserAndProductId(user, productId)
                .orElseThrow(ProductNotFoundException::new);

        cartItem.updateQuantity(request.getQuantity());

        return CartItemResponse.from(cartItem);
    }

    @Transactional
    public void removeCartItem(Long userId, Long productId) {
        User user = getUser(userId);
        cartItemRepository.deleteByUserAndProductId(user, productId);
    }

    @Transactional
    public void clearCart(Long userId) {
        User user = getUser(userId);
        cartItemRepository.deleteByUser(user);
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(com.portfolio.ikea.exception.AuthenticationRequiredException::new);
    }
}
