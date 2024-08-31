import logo from '../logo_3.png';
import fullLogo from '../full_logo.png';
import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';


function Navbar() {
  const location = useLocation();
  const [connected, toggleConnect] = useState(false);
  const [currency, setCurrency] = useState("USD"); // Example of a simple currency variable

  useEffect(() => {
    // You can set default or fetch currency settings here
    setCurrency("USD"); // Example default currency
  }, []);

  return (
    <div className='Navbar'>
      <nav className="w-screen">
        <ul className='flex items-end justify-between py-3 bg-transparent text-white pr-5'>
          <li className='flex items-end ml-5 pb-2'>
            <Link to="/">
              <img src={fullLogo} alt="" width={120} height={120} className="inline-block -mt-2" />
              <div className='inline-block font-bold text-xl ml-2'>
                Credit Marketplace
              </div>
            </Link>
          </li>
          <li className='w-2/6'>
            <ul className='lg:flex justify-between font-bold mr-10 text-lg'>
              <li className={`hover:border-b-2 hover:pb-0 p-2 ${location.pathname === "/" ? 'border-b-2' : ''}`}>
                <Link to="/">Marketplace</Link>
              </li>
              <li className={`hover:border-b-2 hover:pb-0 p-2 ${location.pathname === "/sell" ? 'border-b-2' : ''}`}>
                <Link to="/sell">List My Carbon Credits</Link>
              </li>
              <li className={`hover:border-b-2 hover:pb-0 p-2 ${location.pathname === "/profile" ? 'border-b-2' : ''}`}>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
                  onClick={() => toggleConnect(!connected)}
                >
                  {connected ? "Connected" : "Connect"}
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div className='text-white text-bold text-right mr-10 text-sm'>
        {connected ? `Connected with ${currency}` : "Not Connected"}
      </div>
    </div>
  );
}

export default Navbar;
