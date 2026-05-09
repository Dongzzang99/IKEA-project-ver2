package com.portfolio.ikea.service;

import com.portfolio.ikea.dto.ProductResponse;
import com.portfolio.ikea.entity.Product;
import com.portfolio.ikea.exception.ProductNotFoundException;
import com.portfolio.ikea.repository.ProductRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// 상품 조회 비즈니스 로직
@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    @Transactional(readOnly = true)
    public List<ProductResponse> getProducts(String category) {
        List<Product> products = category == null || category.isBlank()
                ? productRepository.findAll()
                : productRepository.findByCategory(category);

        return products.stream()
                .map(ProductResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public ProductResponse getProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(ProductNotFoundException::new);

        return ProductResponse.from(product);
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> getSpecialPriceProducts() {
        return productRepository.findBySpecialPriceTrue()
                .stream()
                .map(ProductResponse::from)
                .toList();
    }
}
