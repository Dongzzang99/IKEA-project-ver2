import { useEffect, useRef } from "react";

export default function BusanApi() {
  const mapRef = useRef(null);
  const initedRef = useRef(false); // StrictMode로 useEffect 2번 실행 방지

  useEffect(() => {
    if (initedRef.current) return;
    initedRef.current = true;

    // 1) SDK 로드 확인
    if (!window.naver || !window.naver.maps) {
      console.error("네이버 지도 SDK가 아직 로드되지 않았습니다.");
      return;
    }

    // 2) 지도 생성 (부산 시청 근처 좌표 예시)
    const center = new window.naver.maps.LatLng(35.191384,129.210452);

    const map = new window.naver.maps.Map(mapRef.current, {
      center,
      zoom: 16,
      zoomControl: true,
    });

    // 3) 마커(선택)
    new window.naver.maps.Marker({
      position: center,
      map,
    });
  }, []);

  return (
    <div>
        <div>유튜브 들어갈 자리</div>
        <div className=" border-gray-300 border-b-1">
            IKEA 동부산점 아직 방문 전인가요? 미리 방문해 보세요!
        <div className="border-1 w-[300px] sm:flex-1 h-[40px] rounded-full hover:bg-blue-700 cursor-pointer font-bold flex items-center justify-center transition">
            IKEA 동부산점 쇼핑 가이드 보러가기
        </div>
        </div> 
    <div className="w-full">
      <div className="flex flex-col lg:flex-row lg:items-start gap-4">
        {/* 왼쪽 텍스트 */}
        <div className="w-full lg:flex-[1]">
          <p className="text-xl font-bold">스토어 안내</p>
          <div className="text-sm text-gray-600 mt-2">
            <div className="text-lg font-bold">주소</div>
            <p>IKEA 동부산점</p>
            <p>기장읍 동부산관광3로 17</p>
            <p>부산광역시 기장군</p>
            <p>46084</p>
          </div>
        </div>
  

        <div className="w-full   lg:flex-[2]">
        <div
    ref={mapRef}
    className="w-full h-[300px] rounded-lg overflow-hidden"
  />
        </div> 
      </div>
    </div>
   </div>
  );
}