import Navbar from "./Navbar";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from "react";
import Tile from "./Tile"; // Assuming NFTTile is a component to display items

export default function Profile() {
  const [data, updateData] = useState([]);
  const [dataFetched, updateFetched] = useState(false);
  const [address, updateAddress] = useState("Not Connected");
  const [totalPrice, updateTotalPrice] = useState("0");
  const [currency, setCurrency] = useState("USD"); // Example currency

  // Dummy function to simulate fetching data
  async function getNFTData(tokenId) {
    let sumPrice = 0;

    // Simulate fetching data (replace with your own API or logic)
    const items = await axios.get(`/api/getData/${tokenId}`).then(response => {
      return response.data.map(item => {
        sumPrice += item.price;
        return item;
      });
    });

    updateData(items);
    updateFetched(true);
    updateAddress("User Address"); // Simulate user address
    updateTotalPrice(sumPrice.toFixed(2));
  }

  const params = useParams();
  const tokenId = params.tokenId;

  useEffect(() => {
    if (!dataFetched) {
      getNFTData(tokenId);
    }
  }, [dataFetched, tokenId]);

  return (
    <div className="profileClass" style={{ "min-height": "100vh" }}>
      <Navbar></Navbar>
      <div className="profileClass">
        <div className="flex text-center flex-col mt-11 md:text-2xl text-white">
          <div className="mb-5">
            <h2 className="font-bold">User Address</h2>
            {address}
          </div>
        </div>
        <div className="flex flex-row text-center justify-center mt-10 md:text-2xl text-white">
          <div>
            <h2 className="font-bold">No. of Carbon Credits</h2>
            {data.length}
          </div>
          <div className="ml-20">
            <h2 className="font-bold">Total Value</h2>
            {totalPrice} {currency}
          </div>
        </div>
        <div className="flex flex-col text-center items-center mt-11 text-white">
          <h2 className="font-bold">Your Carbon Credits</h2>
          <div className="flex justify-center flex-wrap max-w-screen-xl">
            {data.map((value, index) => {
              return <Tile data={value} key={index}></Tile>;
            })}
          </div>
          <div className="mt-10 text-xl">
            {data.length === 0 ? "Oops, No Credits data to display (Are you logged in?)" : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
