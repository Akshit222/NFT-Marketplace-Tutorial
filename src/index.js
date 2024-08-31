import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Sell from './components/Sell';
import Marketplace from './components/Marketplace';
import Profile from './components/Profile';
import Page from './components/page';
import Login from './components/Login';
import Footer from "./components/Footer";
import SignUp from './components/SignUp';
import Navbar from './components/Navbar';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Marketplace />} />
                    <Route path="/page/:tokenId" element={<Page />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/sell" element={<Sell />} />
                </Routes>
                <Footer />
            </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
