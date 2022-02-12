import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import App from './pages/app/App';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import reportWebVitals from './reportWebVitals';
import Yeet from './yeet/Yeet';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Yeet />
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
