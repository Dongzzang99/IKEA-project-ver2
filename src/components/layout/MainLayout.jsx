// 최상단 header를 제외한 나머지 레이아웃 padding 값 컴포넌트
function MainLayout({ children }) {
  return (
    <div className="mx-auto max-w-[1800px] px-[12px] py-[12px] md:px-[48px] md:py-[20px]">
      {children}
    </div>
  );
}

export default MainLayout;
