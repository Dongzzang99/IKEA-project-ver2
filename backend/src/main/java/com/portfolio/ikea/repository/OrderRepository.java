// 주문 DB 접근 Repository 파일
package com.portfolio.ikea.repository;

import com.portfolio.ikea.entity.CustomerOrder;
import com.portfolio.ikea.entity.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<CustomerOrder, Long> {

    List<CustomerOrder> findByUserOrderByIdDesc(User user);

    List<CustomerOrder> findAllByOrderByIdDesc();
}
