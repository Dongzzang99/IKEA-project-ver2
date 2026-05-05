package com.portfolio.ikea.repository;

import com.portfolio.ikea.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

// 회원 테이블을 조회하거나 저장할 때 쓰는 곳
public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);
}
