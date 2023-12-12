import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; //App.js를 의미
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RecoilRoot } from 'recoil';
const root = ReactDOM.createRoot(document.getElementById('root'));
// index.html에 있는 id가 root인 애를 갖고온거임
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
// 이 root를 createRoot로 만들고 그 안에 App을 render하겠다

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))ㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴ
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
