// 상품 테이블과 매핑되는 엔티티 파일
package com.portfolio.ikea.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import com.portfolio.ikea.exception.OutOfStockException;
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

    @Column(nullable = false, columnDefinition = "int default 100")
    private int stock;

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
            double rating,
            int stock
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
        this.stock = stock;
    }

    public void updateAdminFields(int price, int sale, int stock) {
        // 관리자는 가격, 할인율, 재고처럼 운영에 필요한 값만 수정하게 제한함
        this.price = price;
        this.sale = sale;
        this.stock = stock;
    }

    public void decreaseStock(int quantity) {
        if (this.stock < quantity) {
            throw new OutOfStockException(this.title, this.stock, quantity);
        }

        this.stock -= quantity;
    }

    public void restoreStock(int quantity) {
        this.stock += quantity;
    }
}
