function ContainerHeader() {
  return (
    <div className="bg-black h-12 w-full text-white px-3 sm:px-4 md:px-8 lg:px-12 flex items-center justify-between">
      {/* Left */}
      <div className="text-xs sm:text-sm flex items-center">
        <span>KR</span>
        <span className="border-l border-white pl-2 ml-2">한국어</span>
      </div>

      {/* Right */}
      <div className="text-xs sm:text-sm flex items-center">
        <span className="pl-6">우편 번호 입력</span>
        <span className="pl-6">매장선택</span>
      </div>
    </div>
  );
}

export default ContainerHeader;
