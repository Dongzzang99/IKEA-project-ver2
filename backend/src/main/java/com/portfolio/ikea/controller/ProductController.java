// 상품 조회 API 컨트롤러 파일
package com.portfolio.ikea.controller;

import com.portfolio.ikea.dto.ProductResponse;
import com.portfolio.ikea.service.ProductService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

// 상품 조회 API 진입점
@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public List<ProductResponse> getProducts(@RequestParam(required = false) String category) {
        return productService.getProducts(category);
    }

    @GetMapping("/{id}")
    public ProductResponse getProduct(@PathVariable Long id) {
        return productService.getProduct(id);
    }

    @GetMapping("/special-price")
    public List<ProductResponse> getSpecialPriceProducts() {
        return productService.getSpecialPriceProducts();
    }
}
