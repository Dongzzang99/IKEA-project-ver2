// React 앱을 브라우저에 연결하는 시작 파일
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; //./ 부터 시작하는건 사용자가 생성
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom"; //없는건 다운받은 라이브러리
import { Provider } from "react-redux";
import Cart_Redux from "./data/Cart_Redux.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={Cart_Redux}>
      {/* basename={import.meta.env.BASE_URL}  -->  Vite 전용 변수 모든 라우터 기능을 사용할때 vite 설정 변수 붙음*/}
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
