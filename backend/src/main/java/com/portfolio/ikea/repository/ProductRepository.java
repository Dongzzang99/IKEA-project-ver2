package com.portfolio.ikea.repository;

import com.portfolio.ikea.entity.Product;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

// 상품 데이터 접근 계층
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findBySpecialPriceTrue();

    List<Product> findByCategory(String category);
}
