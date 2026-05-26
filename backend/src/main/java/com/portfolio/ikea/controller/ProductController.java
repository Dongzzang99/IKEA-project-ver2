// 상품 조회 API 컨트롤러 파일
package com.portfolio.ikea.controller;

import com.portfolio.ikea.dto.ProductResponse;
import com.portfolio.ikea.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
// 상품 목록, 상품 상세, 특가 상품 조회 요청 처리
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    // 전체 상품 목록 조회, category 값이 있으면 카테고리별 상품 조회
    @Operation(summary = "상품 목록 조회", description = "전체 상품을 가져오거나 카테고리를 선택했을 때 해당 상품만 가져오는 API")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "상품 목록 조회 성공")
    })
    @GetMapping
    public List<ProductResponse> getProducts(@RequestParam(required = false) String category) {
        return productService.getProducts(category);
    }

    // 사용자가 선택한 상품의 상세 정보 조회
    @Operation(summary = "상품 상세 조회", description = "사용자가 선택한 상품 하나의 상세 정보를 가져오는 API")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "상품 상세 조회 성공"),
            @ApiResponse(responseCode = "404", description = "상품을 찾을 수 없음")
    })
    @GetMapping("/{id}")
    public ProductResponse getProduct(@PathVariable Long id) {
        return productService.getProduct(id);
    }

    // 특가 상품 목록 조회
    @Operation(summary = "특가 상품 조회", description = "메인 화면이나 상품 영역에서 보여줄 특가 상품 목록을 가져오는 API")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "특가 상품 목록 조회 성공")
    })
    @GetMapping("/special-price")
    public List<ProductResponse> getSpecialPriceProducts() {
        return productService.getSpecialPriceProducts();
    }
}
