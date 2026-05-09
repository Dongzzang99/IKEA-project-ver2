//이케아 동부산점 안내 페이지
import { useEffect, useRef } from "react";

export default function BusanApi() {
  const mapRef = useRef(null);
  const initedRef = useRef(false); // StrictMode에서 지도가 두 번 생성되는 걸 막음

  useEffect(() => {
    if (initedRef.current) return;
    initedRef.current = true;

    if (!window.naver || !window.naver.maps) {
      console.error("네이버 지도 SDK가 아직 로드되지 않았습니다.");
      return;
    }

    const center = new window.naver.maps.LatLng(35.191384, 129.210452);

    const map = new window.naver.maps.Map(mapRef.current, {
      center,
      zoom: 16,
      zoomControl: true,
    });

    new window.naver.maps.Marker({
      position: center,
      map,
    });
  }, []);

  return (
    <div className="bg-white px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-[1120px]">
        <section className="border-b border-gray-200 pb-8">
          <p className="text-sm font-bold text-blue-700">IKEA Store</p>
          <div className="mt-3 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-bold md:text-4xl">
                IKEA 동부산점
              </h1>
              <p className="mt-3 max-w-[560px] text-sm leading-6 text-gray-600">
                아직 방문 전인가요? 매장 위치와 기본 정보를 미리 확인해보세요.
              </p>
            </div>

            <a
              href="https://www.ikea.com/kr/ko/stores/dongbusan/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full bg-blue-600 px-6 text-sm font-bold text-white hover:bg-blue-700"
            >
              쇼핑 가이드 보기
            </a>
          </div>
        </section>

        <section className="grid gap-6 py-8 lg:grid-cols-[360px_1fr]">
          <div className="grid gap-4">
            <InfoBox title="주소">
              <p>IKEA 동부산점</p>
              <p>기장읍 동부산관광3로 17</p>
              <p>부산광역시 기장군</p>
              <p>46084</p>
            </InfoBox>

            <InfoBox title="방문 안내">
              <p>매장 방문 전 위치를 확인하고 이동하면 더 편하게 방문할 수 있습니다.</p>
            </InfoBox>

            <InfoBox title="매장 서비스">
              <div className="grid gap-2 text-sm">
                <ServiceRow icon="fas fa-map-marker-alt" text="매장 위치 안내" />
                <ServiceRow icon="fas fa-truck" text="배송 서비스 확인" />
                <ServiceRow icon="fas fa-store" text="매장 쇼핑 정보" />
              </div>
            </InfoBox>
          </div>

          <div className="overflow-hidden rounded-[4px] border border-gray-200">
            <div
              ref={mapRef}
              className="h-[360px] w-full md:h-[460px]"
              aria-label="IKEA 동부산점 지도"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function InfoBox({ title, children }) {
  return (
    <div className="rounded-[4px] border border-gray-200 px-5 py-5">
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="mt-3 text-sm leading-6 text-gray-600">{children}</div>
    </div>
  );
}

function ServiceRow({ icon, text }) {
  return (
    <div className="flex items-center gap-3">
      <i className={`${icon} w-5 text-blue-700`}></i>
      <span>{text}</span>
    </div>
  );
}
