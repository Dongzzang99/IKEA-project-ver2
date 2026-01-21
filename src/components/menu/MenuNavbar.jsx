//가구 종류 카드 나열 리스트
const item_list = [
  { id: 1, title: "신상품과 컬렉션", image: "img/menu_card/card1.jpg" },
  { id: 2, title: "수납 가구", image: "img/menu_card/card2.jpg" },
  { id: 3, title: "수납용품", image: "img/menu_card/card3.jpg" },
  { id: 4, title: "침대/매트릭스", image: "img/menu_card/card4.jpg" },
  { id: 5, title: "쇼파/암체어", image: "img/menu_card/card5.jpg" },
  { id: 6, title: "식탁/테이블/의자", image: "img/menu_card/card6.jpg" },
  { id: 7, title: "책상", image: "img/menu_card/card7.jpg" },
  { id: 8, title: "주방가구", image: "img/menu_card/card8.jpg" },
  { id: 9, title: "주방용품", image: "img/menu_card/card9.jpg" },
  { id: 10, title: "조명", image: "img/menu_card/card10.jpg" },
  { id: 11, title: "텍스타일/러그", image: "img/menu_card/card11.jpg" },
  { id: 12, title: "커튼/블라인드", image: "img/menu_card/card12.jpg" },
  { id: 13, title: "화분/식물", image: "img/menu_card/card13.jpg" },
  { id: 14, title: "아웃도어/야외용품", image: "img/menu_card/card14.jpg" },
  { id: 15, title: "세탁 청소", image: "img/menu_card/card15.jpg" },
  { id: 16, title: "홈스마트", image: "img/menu_card/card16.jpg" },
  { id: 17, title: "가전제품", image: "img/menu_card/card17.jpg" },
  { id: 18, title: "셀프 인테리어", image: "img/menu_card/card18.jpg" },
  { id: 19, title: "스웨디시 푸드 마켓", image: "img/menu_card/card19.jpg" },
  { id: 20, title: "홈데코/장식품", image: "img/menu_card/card20.jpg" },
  { id: 21, title: "어린이 IKEA", image: "img/menu_card/card21.jpg" },
  { id: 22, title: "욕실", image: "img/menu_card/card22.jpg" },
];

function MenuNavbar({ onSelectCategory }) {
  return (
    <div>
      {/* 상단 메뉴 탭 */}
      <div className="navbar menu_Navbar text-gray-600 text-[0.75rem] font-bold cursor-pointer">
        <div>모든 제품</div>
        <div>공간별 쇼핑하기</div>
        <div>특별한 가격</div>
        <div>새로운 소식</div>
        <div>아이디어</div>
      </div>

      {/* 카드 리스트 */}
      <div className="card_wrapper">
        {item_list.map((item) => (
          <div
            className="card_item"
            key={item.id}
            onClick={() => {
              //카드클릭시 props로 HomePage_Main 컴포넌트에 값이동
              onSelectCategory(item.title);
            }}
          >
            <img
              src={`${import.meta.env.BASE_URL}${item.image}`}
              alt={item.title}
            />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuNavbar;
