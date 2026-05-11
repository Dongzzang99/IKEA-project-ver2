// 카테고리 선택 시 상품 리스트를 보여주는 파일
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../../api/products";
import { getImagePath } from "../../utils/imagePath";

function CategoryProductList({ category, isOpen }) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (category === "none") {
      return;
    }

    getProducts(category)
      .then((data) => {
        setFilteredProducts(data);
        setErrorMessage("");
      })
      .catch(() => {
        setFilteredProducts([]);
        setErrorMessage("상품을 불러오지 못했습니다.");
      });
  }, [category]);

  return (
    //슬라이드 애니메이션 div
    //isopen ture - 열림
    //isopen false - 닫침
    <div
      className={`
      overflow-hidden transition-all duration-300 ease-out
      ${
        isOpen
          ? "max-h-[500px] opacity-100 translate-y-0"
          : "max-h-0 opacity-0 -translate-y-2"
      }
    `}
    >
      <div className="overflow-x-auto">
        <div className="flex gap-3 w-max pb-4">
          {errorMessage && (
            <p className="text-sm font-bold text-gray-600">{errorMessage}</p>
          )}

          {/* filteredProducts item - 10개 까지 화면 출력 */}
          {filteredProducts.slice(0, 10).map((item) => {
            const discountPrice = Math.floor(
              item.price * (1 - item.sale / 100)
            );

            return (
              <Link
                to={`/products/${item.id}`}
                key={item.id}
                className="w-[180px] flex-shrink-0 cursor-pointer"
              >
                <img
                  src={getImagePath(item.image)}
                  alt={item.title}
                  className="pb-4 w-full h-[180px] object-cover"
                  loading="lazy"
                />

                {/* 특가 상품 표시 간격은 벌린채로, sale값이 0 보다 크면 표시, 0이면 text-transparent(텍스트 투명)*/}
                <p
                  className={`pb-2 text-xs ${
                    item.sale > 0
                      ? "text-red-500 font-bold"
                      : "text-transparent"
                  }`}
                >
                  더 낮은 새로운 가격
                </p>

                <p className="font-bold text-sm">{item.title}</p>
                <p className="pb-2 text-[0.75rem] text-gray-600">{item.note}</p>
                <p className="font-bold text-[1.25rem] pb-1">
                  <span className="relative top-[-0.5em] text-[0.6em]">￦</span>
                  {discountPrice.toLocaleString()}
                </p>
                <p className="text-[0.75rem] text-gray-500">
                  기존가: ￦{item.price.toLocaleString()}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CategoryProductList;
