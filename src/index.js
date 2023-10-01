import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import { createGlobalStyle } from "styled-components";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&display=swap');
*{margin:0;
padding:0;
box-sizing:border-box ;}
html,body{
  font-family: 'Oswald', sans-serif;
  font-size: 62.5%;
  @media (max-width: 768px) {
    font-size:50%;
  }
  @media (max-width: 450px) {
    font-size:50%;
  }
}
body{
  font-size: 1.6rem;
}
`;
const persistor=persistStore(store)
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <GlobalStyle />
      <App />
    </PersistGate>
  </Provider>
);

reportWebVitals();
