// 상품 상세 페이지 파일
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addCartItem, hasAccessToken } from "../api/cart";
import { getProduct } from "../api/products";
import { addRecentViewedProduct } from "../api/recentViewed";
import { getImagePath } from "../utils/imagePath";

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [product, setProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getProduct(id)
      .then((data) => {
        setQuantity(1);
        setIsButtonActive(false);
        setProduct(data);
        addRecentViewedProduct(data);
      })
      .catch(() => {
        setErrorMessage("상품을 찾을 수 없습니다.");
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    if (!hasAccessToken()) {
      alert("로그인 후 이용해 주세요!");
      return;
    }

    addCartItem({ productId: product.id, quantity })
      .then(() => {
        setIsButtonActive(true);
        setTimeout(() => {
          setIsButtonActive(false);
        }, 1500);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleMoveToCart = () => {
    if (!hasAccessToken()) {
      alert("로그인 후 이용해 주세요!");
      return;
    }

    navigate("/cart");
  };

  if (errorMessage) {
    return <div className="p-4">{errorMessage}</div>;
  }

  if (!product) {
    return <div className="p-4">상품 정보를 불러오는 중입니다.</div>;
  }

  const discountPrice = Math.floor(product.price * (1 - product.sale / 100));
  const stock = product.stock ?? 0;

  return (
    <div className="relative p-4">
      <div className="flex flex-col justify-center gap-6 md:flex-row md:gap-32">
        <img
          src={getImagePath(product.image)}
          alt={product.title}
          className="h-auto w-[40rem] rounded-lg object-contain"
        />

        <div className="flex flex-col justify-start gap-2">
          <div>
            <p className="text-lg font-bold">{product.title}</p>
            <p className="text-sm text-gray-600">{product.note}</p>
          </div>

          <p className="text-2xl font-bold">
            <span className="relative top-[-0.3em] text-base">원</span>
            {discountPrice.toLocaleString()}
          </p>

          <p className="mb-4 text-sm text-gray-500">
            기존가: <span>{product.price.toLocaleString()}원</span>
          </p>
          <p className="mb-12 text-sm font-bold text-gray-700">
            남은 재고 {stock}개
          </p>

          <p className="font-bold">어떻게 구매하시겠어요?</p>
          <div className="mb-4 flex h-[150px] w-full flex-col justify-center rounded-xl border border-gray-300 p-3 md:w-[500px]">
            <div className="border-b border-gray-300 p-3">
              <div className="flex gap-2">
                <div>
                  <i className="fas fa-truck"></i>
                </div>
                <div>
                  <p className="font-bold">배송</p>
                  <p className="text-gray-500">재고 확인</p>
                </div>
              </div>
            </div>
            <div className="p-3">
              <div className="flex gap-2">
                <div>
                  <i className="fas fa-store-alt"></i>
                </div>
                <div>
                  <p className="font-bold">매장 구매</p>
                  <p className="text-gray-500">매장 재고 및 입고 날짜 확인</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <div className="flex h-[40px] w-full items-center justify-between rounded-full border border-gray-300 px-4 sm:w-[120px]">
              <button
                className="cursor-pointer text-xl font-bold"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>
              <span className="text-lg font-medium">{quantity}</span>
              <button
                className="cursor-pointer text-xl font-bold disabled:cursor-not-allowed disabled:text-gray-300"
                disabled={quantity >= stock}
                onClick={() =>
                  setQuantity((prev) => Math.min(stock, prev + 1))
                }
              >
                +
              </button>
            </div>

            <button
              className="flex h-[40px] w-full cursor-pointer items-center justify-center rounded-full bg-blue-600 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 sm:flex-1"
              disabled={stock <= 0}
              onClick={handleAddToCart}
            >
              {isButtonActive ? "장바구니에 담겼습니다" : "장바구니에 담기"}
            </button>

            <button
              type="button"
              className="flex h-[40px] w-full cursor-pointer items-center justify-center rounded-full bg-blue-600 font-bold text-white transition hover:bg-blue-700 sm:flex-1"
              onClick={handleMoveToCart}
            >
              장바구니로 이동하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
