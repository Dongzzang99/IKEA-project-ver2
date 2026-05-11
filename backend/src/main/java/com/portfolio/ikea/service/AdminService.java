// 관리자 기능 비즈니스 로직 파일
package com.portfolio.ikea.service;

import com.portfolio.ikea.dto.AdminProductResponse;
import com.portfolio.ikea.dto.AdminProductUpdateRequest;
import com.portfolio.ikea.dto.AdminUserResponse;
import com.portfolio.ikea.dto.OrderResponse;
import com.portfolio.ikea.entity.Product;
import com.portfolio.ikea.entity.User;
import com.portfolio.ikea.entity.UserRole;
import com.portfolio.ikea.exception.AdminPermissionException;
import com.portfolio.ikea.exception.AuthenticationRequiredException;
import com.portfolio.ikea.exception.ProductNotFoundException;
import com.portfolio.ikea.repository.OrderRepository;
import com.portfolio.ikea.repository.ProductRepository;
import com.portfolio.ikea.repository.UserRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    @Transactional(readOnly = true)
    public List<OrderResponse> getAllOrders(Long adminUserId) {
        checkAdmin(adminUserId);

        return orderRepository.findAllByOrderByIdDesc()
                .stream()
                .map(OrderResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<AdminUserResponse> getUsers(Long adminUserId) {
        checkAdmin(adminUserId);

        return userRepository.findAllByOrderByIdDesc()
                .stream()
                .map(AdminUserResponse::from)
                .toList();
    }

    @Transactional
    public AdminProductResponse updateProduct(Long adminUserId, Long productId, AdminProductUpdateRequest request) {
        checkAdmin(adminUserId);

        Product product = productRepository.findById(productId)
                .orElseThrow(ProductNotFoundException::new);
        product.updateAdminFields(request.getPrice(), request.getSale(), request.getStock());

        return AdminProductResponse.from(product);
    }

    private void checkAdmin(Long userId) {
        // 관리자 API는 요청할 때마다 DB의 role을 확인해서 일반 유저 접근을 막음
        User user = userRepository.findById(userId)
                .orElseThrow(AuthenticationRequiredException::new);

        if (user.getRole() != UserRole.ADMIN) {
            throw new AdminPermissionException();
        }
    }
}
