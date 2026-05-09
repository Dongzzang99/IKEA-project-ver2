package com.portfolio.ikea.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

// 상품 테이블 매핑 엔티티
@Getter
@Entity
@Table(name = "products")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Product {

    @Id
    private Long id;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(nullable = false)
    private int price;

    @Column(nullable = false)
    private int sale;

    @Column(nullable = false)
    private boolean specialPrice;

    @Column(nullable = false, length = 255)
    private String image;

    @Column(nullable = false, length = 255)
    private String note;

    @Column(nullable = false, length = 50)
    private String category;

    @Column(nullable = false)
    private double rating;

    @Builder
    public Product(
            Long id,
            String title,
            int price,
            int sale,
            boolean specialPrice,
            String image,
            String note,
            String category,
            double rating
    ) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.sale = sale;
        this.specialPrice = specialPrice;
        this.image = image;
        this.note = note;
        this.category = category;
        this.rating = rating;
    }
}
