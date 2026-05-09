package com.portfolio.ikea.config;

import com.portfolio.ikea.entity.Product;
import com.portfolio.ikea.repository.ProductRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

// 개발용 초기 상품 데이터 적재
@Component
@RequiredArgsConstructor
public class ProductDataSeeder implements CommandLineRunner {

    private final ProductRepository productRepository;

    @Override
    public void run(String... args) {
        if (productRepository.count() > 0) {
            return;
        }

        productRepository.saveAll(List.of(
                product(1L, true, 129000, 20, "KALLAX 칼릭스", "img/product_img/storage_furniture1/product1.jpg", "정사각형 오픈형 수납장", "수납 가구", 4.7),
                product(2L, false, 89000, 0, "BILLY 빌리", "img/product_img/storage_furniture1/product2.jpg", "이케아 베스트셀러 책장", "수납 가구", 4.6),
                product(3L, true, 159000, 15, "EKET 에케트", "img/product_img/storage_furniture1/product3.jpg", "모듈형 벽걸이 수납장", "수납 가구", 4.5),
                product(4L, false, 99000, 0, "IVAR 이바르", "img/product_img/storage_furniture1/product4.jpg", "원목 수납 선반 시스템", "수납 가구", 4.8),
                product(5L, true, 69000, 10, "BRIMNES 브림네스", "img/product_img/storage_furniture1/product5.jpg", "수납형 협탁", "수납 가구", 4.4),
                product(6L, false, 119000, 0, "BESTÅ 베스토", "img/product_img/storage_furniture1/product6.jpg", "TV장 겸용 수납장", "수납 가구", 4.6),
                product(7L, true, 15900, 25, "SKÅDIS 스코디스", "img/product_img/storage_supplies2/product7.jpg", "벽걸이형 수납 보드", "수납용품", 4.8),
                product(8L, false, 9900, 0, "VARIERA 바리에라", "img/product_img/storage_supplies2/product8.jpg", "서랍 정리 트레이", "수납용품", 4.7),
                product(9L, true, 12900, 15, "NOJIG 노이그", "img/product_img/storage_supplies2/product9.jpg", "주방 수납 바구니", "수납용품", 4.5),
                product(10L, false, 7900, 0, "DRAGAN 드라간", "img/product_img/storage_supplies2/product10.jpg", "대나무 수납 박스", "수납용품", 4.6),
                product(11L, true, 18900, 20, "RÅSHULT 로슐트", "img/product_img/storage_supplies2/product11.jpg", "이동식 트롤리 카트", "수납용품", 4.9),
                product(12L, false, 5900, 0, "SUNNERSTA 순네르스타", "img/product_img/storage_supplies2/product12.jpg", "주방 레일 수납고리", "수납용품", 4.4),
                product(13L, true, 199000, 20, "MALM 말름 침대", "img/product_img/bed3/product13.jpg", "수납형 침대 프레임", "침대/매트릭스", 4.7),
                product(14L, false, 149000, 0, "SLATTUM 슬라툼", "img/product_img/bed3/product14.jpg", "패브릭 침대 프레임", "침대/매트릭스", 4.5),
                product(15L, true, 259000, 15, "HÖVÅG 호바그", "img/product_img/bed3/product15.jpg", "스프링 매트리스", "침대/매트릭스", 4.8),
                product(16L, false, 99000, 0, "MINNESUND 민네순드", "img/product_img/bed3/product16.jpg", "폼 매트리스", "침대/매트릭스", 4.4),
                product(17L, true, 179000, 10, "BRIMNES 브림네스 침대", "img/product_img/bed3/product17.jpg", "수납 서랍 포함 침대", "침대/매트릭스", 4.6),
                product(18L, false, 79000, 0, "TARVA 타르바", "img/product_img/bed3/product18.jpg", "원목 침대 프레임", "침대/매트릭스", 4.3),
                product(19L, true, 299000, 20, "POÄNG 포엥", "img/product_img/sofa4/product19.jpg", "원목 프레임 암체어", "쇼파/암체어", 4.9),
                product(20L, false, 499000, 0, "KLIPPAN 클리판", "img/product_img/sofa4/product20.jpg", "2인용 패브릭 소파", "쇼파/암체어", 4.6),
                product(21L, true, 699000, 15, "VIMLE 빔레", "img/product_img/sofa4/product21.jpg", "모듈형 패브릭 소파", "쇼파/암체어", 4.8),
                product(22L, false, 189000, 0, "STRANDMON 스트란드몬", "img/product_img/sofa4/product22.jpg", "하이백 암체어", "쇼파/암체어", 4.7),
                product(23L, true, 399000, 10, "SÖDERHAMN 쇠데르함", "img/product_img/sofa4/product23.jpg", "코너형 소파", "쇼파/암체어", 4.6),
                product(24L, false, 99000, 0, "EKERÖ 에케뢰", "img/product_img/sofa4/product24.jpg", "인조가죽 암체어", "쇼파/암체어", 4.5),
                product(25L, true, 189000, 15, "DOCKSTA 독스타", "img/product_img/table_chair5/product25.jpg", "원형 식탁 테이블", "식탁/테이블/의자", 4.8),
                product(26L, false, 149000, 0, "LERHAMN 레르함", "img/product_img/table_chair5/product26.jpg", "2인용 원목 식탁", "식탁/테이블/의자", 4.4),
                product(27L, true, 59000, 20, "INGOLF 잉골프", "img/product_img/table_chair5/product27.jpg", "원목 의자", "식탁/테이블/의자", 4.6),
                product(28L, false, 79000, 0, "JANINGE 야닝에", "img/product_img/table_chair5/product28.jpg", "플라스틱 의자", "식탁/테이블/의자", 4.5),
                product(29L, true, 229000, 10, "NORDEN 노르덴", "img/product_img/table_chair5/product29.jpg", "확장형 식탁", "식탁/테이블/의자", 4.7),
                product(30L, false, 99000, 0, "LISABO 리사보", "img/product_img/table_chair5/product30.jpg", "라운드형 테이블", "식탁/테이블/의자", 4.6),
                product(31L, true, 99000, 20, "MICKE 미케", "img/product_img/table6/product31.jpg", "서랍 포함 컴퓨터 책상", "책상", 4.7),
                product(32L, false, 79000, 0, "LAGKAPTEN 라그캅텐", "img/product_img/table6/product32.jpg", "테이블 상판", "책상", 4.5),
                product(33L, true, 129000, 10, "ALEX 알렉스", "img/product_img/table6/product33.jpg", "서랍형 책상", "책상", 4.8),
                product(34L, false, 59000, 0, "SVENBERTIL 스벤베르틸", "img/product_img/table6/product34.jpg", "미니 테이블", "책상", 4.4),
                product(35L, true, 149000, 15, "BEKANT 베칸트", "img/product_img/table6/product35.jpg", "전동 높이조절 책상", "책상", 4.9),
                product(36L, true, 229000, 20, "METOD 메토드", "img/product_img/kitchen_furniture7/product36.jpg", "조립형 주방 수납장", "주방가구", 4.8),
                product(37L, false, 179000, 0, "ENHET 엔헤트", "img/product_img/kitchen_furniture7/product37.jpg", "오픈형 주방 선반", "주방가구", 4.6),
                product(38L, true, 99000, 15, "VADHOLMA 바드홀마", "img/product_img/kitchen_furniture7/product38.jpg", "아일랜드 식탁", "주방가구", 4.7),
                product(39L, false, 159000, 0, "KNOXHULT 크녹스훌트", "img/product_img/kitchen_furniture7/product39.jpg", "조립형 주방 하부장", "주방가구", 4.5),
                product(40L, true, 299000, 10, "SEKTION 섹션", "img/product_img/kitchen_furniture7/product40.jpg", "모듈형 주방 캐비닛", "주방가구", 4.8)
        ));
    }

    private Product product(
            Long id,
            boolean specialPrice,
            int price,
            int sale,
            String title,
            String image,
            String note,
            String category,
            double rating
    ) {
        return Product.builder()
                .id(id)
                .specialPrice(specialPrice)
                .price(price)
                .sale(sale)
                .title(title)
                .image(image)
                .note(note)
                .category(category)
                .rating(rating)
                .build();
    }
}
