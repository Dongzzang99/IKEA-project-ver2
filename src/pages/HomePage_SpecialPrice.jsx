import productList from "../data/productList";
import { Link } from "react-router-dom";

function HomePage_SpecialPrice() {
  return (
    <div>
      <p className="py-8 font-bold text-[1.5rem]">놓치면 아쉬운 특가</p>
      <div className="w-fit border-2 rounded-[30px] px-2 py-2.5 font-bold text-[0.75rem] hover:bg-gray-200 mb-4">
        더 낮은 새로운 가격
      </div>
      {/*  특가 상품 영역*/}
      <div className="overflow-x-auto">
        <div className="flex gap-6 w-max pb-4">
          {productList
            .filter((item) => item.specialPrice) // specialPrice == true 인것들만
            .slice(0, 10) //10개 반복
            .map((item) => {
              const discountPrice = Math.floor(
                item.price * (1 - item.sale / 100)
              );

              return (
                <Link
                  to={`/products/${item.id}`}
                  key={item.id}
                  className="w-[180px] flex-shrink-0 block"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}${item.image.replace(
                      /^\//,
                      ""
                    )}`}
                    className="pb-4 w-full h-[180px] object-cover"
                  />

                  <p className="text-red-500 font-bold pb-2 text-sm">
                    더 낮은 새로운 가격
                  </p>

                  <div>
                    <p className="font-bold text-sm">{item.title}</p>
                    <p className="pb-2 text-[0.75rem] text-gray-600">
                      {item.note}
                    </p>
                  </div>

                  <p className="font-bold text-[1.25rem] pb-1">
                    <span className="relative top-[-0.5em] text-[0.6em]">
                      ￦
                    </span>
                    {discountPrice.toLocaleString()}
                  </p>

                  <p className="text-[0.75rem] text-gray-500">
                    기존가: <span>￦{item.price.toLocaleString()}</span>
                  </p>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default HomePage_SpecialPrice;
