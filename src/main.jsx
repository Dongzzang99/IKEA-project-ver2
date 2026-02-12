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
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
  