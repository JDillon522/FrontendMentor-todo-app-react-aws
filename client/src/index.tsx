import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import App from './pages/app/App';
import Auth from './pages/auth/Auth';
import Home from './pages/home/Home';
import Login from './pages/auth/login/Login';
import reportWebVitals from './reportWebVitals';
import Yeet from './yeet/Yeet';
import Register from './pages/auth/register/Register';
import Confirm from './pages/auth/confirm/Confirm';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <Yeet />

        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<Home />} />

            <Route path="auth" element={<Auth />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="confirm" element={<Confirm />} />
            </Route>

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
