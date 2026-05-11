// 장바구니 DB 접근 Repository 파일
package com.portfolio.ikea.repository;

import com.portfolio.ikea.entity.CartItem;
import com.portfolio.ikea.entity.Product;
import com.portfolio.ikea.entity.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

// 장바구니 데이터 접근 계층
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    List<CartItem> findByUserOrderByIdDesc(User user);

    Optional<CartItem> findByUserAndProduct(User user, Product product);

    Optional<CartItem> findByUserAndProductId(User user, Long productId);

    void deleteByUserAndProductId(User user, Long productId);

    void deleteByUser(User user);
}
