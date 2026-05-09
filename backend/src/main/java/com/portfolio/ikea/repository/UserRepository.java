package com.portfolio.ikea.repository;

import com.portfolio.ikea.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

// 회원 데이터 접근 계층
public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email);

    // 로그인 구현 시 이메일 기준 회원 조회에 사용
    Optional<User> findByEmail(String email);
}
