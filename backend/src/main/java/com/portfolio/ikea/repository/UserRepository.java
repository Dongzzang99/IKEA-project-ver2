// 회원 DB 접근 Repository 파일
package com.portfolio.ikea.repository;

import com.portfolio.ikea.entity.User;
import com.portfolio.ikea.entity.UserRole;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

// 회원 데이터 접근 계층
public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);

    List<User> findAllByOrderByIdDesc();

    @Transactional
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("update User u set u.role = :role where u.email = :email and u.role <> :role")
    int updateRoleByEmail(@Param("email") String email, @Param("role") UserRole role);

    @Transactional
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("update User u set u.role = :role where u.email <> :email and u.role <> :role")
    int updateRoleByEmailNot(@Param("email") String email, @Param("role") UserRole role);
}
