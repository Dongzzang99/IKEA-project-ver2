// 상품 DB 접근 Repository 파일
package com.portfolio.ikea.repository;

import com.portfolio.ikea.entity.Product;
import java.util.List;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import jakarta.persistence.LockModeType;

// 상품 데이터 접근 계층
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findBySpecialPriceTrue();

    List<Product> findByCategory(String category);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select p from Product p where p.id in :ids")
    List<Product> findAllByIdInWithLock(@Param("ids") List<Long> ids);
}
