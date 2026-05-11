// 주문 당시 상품 정보를 저장하는 주문상품 엔티티 파일
package com.portfolio.ikea.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

// 주문 당시의 상품명, 가격, 수량을 따로 저장
@Getter
@Entity
@Table(name = "order_items")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private CustomerOrder order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false, length = 100)
    private String productTitle;

    @Column(nullable = false)
    private int productPrice;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private int lineTotalPrice;

    public OrderItem(Product product, int quantity) {
        this.product = product;
        this.productTitle = product.getTitle();
        this.productPrice = product.getPrice();
        this.quantity = quantity;
        this.lineTotalPrice = product.getPrice() * quantity;
    }

    void setOrder(CustomerOrder order) {
        this.order = order;
    }
}
