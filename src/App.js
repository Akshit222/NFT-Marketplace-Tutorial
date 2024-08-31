import './App.css';
import Navbar from './components/Navbar';
import Marketplace from './components/Marketplace';
import Profile from './components/Profile';
import Sell from './components/Sell';
import Page from './components/page';
import Login from './components/Login';
import Footer from "./components/Footer";
import SignUp from './components/SignUp';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
      <div className="App">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Marketplace />} />
                    <Route path="/page/:tokenId" element={<Page />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/sell" element={<Sell />} />

                </Routes>
                <Footer />
            </BrowserRouter>
      </div>
  );
}

      export default App;
