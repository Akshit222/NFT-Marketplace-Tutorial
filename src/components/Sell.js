import Navbar from "./Navbar";
import { useState } from "react";
import { uploadJSONToIPFS } from "../pinata"; // Removed uploadFileToIPFS import
import Marketplace from '../Marketplace.json';
import { useLocation } from "react-router";
import { ethers } from "ethers";

export default function Sell() {
    const [formParams, updateFormParams] = useState({ name: '', description: '', price: '' });
    const [message, updateMessage] = useState('');
    const location = useLocation();

    const handleButtonState = (isDisabled) => {
        const listButton = document.getElementById("list-button");
        if (listButton) {
            listButton.disabled = isDisabled;
            listButton.style.backgroundColor = isDisabled ? "grey" : "#A500FF";
            listButton.style.opacity = isDisabled ? 0.3 : 1;
        }
    };

    const uploadMetadataToIPFS = async () => {
        const { name, description, price } = formParams;

        // Validate form inputs
        if (!name || !description || !price) {
            updateMessage("Please fill all fields.");
            return null;
        }

        const nftJSON = {
            name,
            description,
            price, // Price in USD
        };

        try {
            // Upload the metadata JSON to IPFS
            const response = await uploadJSONToIPFS(nftJSON);
            if (response.success) {
                console.log("Uploaded JSON to Pinata: ", response.pinataURL);
                return response.pinataURL;
            } else {
                throw new Error("Metadata upload failed.");
            }
        } catch (error) {
            updateMessage("Failed to upload metadata. Please try again.");
            console.error("Error uploading JSON metadata:", error);
            return null;
        }
    };

    const listNFT = async (e) => {
        e.preventDefault();

        const metadataURL = await uploadMetadataToIPFS();
        if (!metadataURL) return;

        try {
            // Connect to Ethereum provider
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(Marketplace.address, Marketplace.abi, signer);

            // Convert price from USD to ETH
            // Note: You'll need to implement a conversion mechanism, e.g., fetching the current ETH/USD rate
            const ethPrice = await getETHPriceInUSD(); // Implement this function
            const priceInETH = ethers.utils.parseUnits((formParams.price / ethPrice).toFixed(18), 'ether');

            const listingPrice = (await contract.getListPrice()).toString();

            handleButtonState(true);
            updateMessage("Listing NFT... Please wait.");

            // Create the NFT on the blockchain
            const transaction = await contract.createToken(metadataURL, priceInETH, { value: listingPrice });
            await transaction.wait();

            updateMessage("Successfully listed your NFT!");
            updateFormParams({ name: '', description: '', price: '' });
            window.location.replace("/");
        } catch (error) {
            updateMessage("Failed to list NFT. Please try again.");
            console.error("Error listing NFT:", error);
        } finally {
            handleButtonState(false);
        }
    };

    // Placeholder for ETH/USD conversion
    const getETHPriceInUSD = async () => {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
            const data = await response.json();
            return data.ethereum.usd;
        } catch (error) {
            console.error("Failed to fetch ETH price:", error);
            updateMessage("Failed to fetch ETH price. Please try again.");
            throw error;
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center mt-10" id="nftForm">
                <form className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4" onSubmit={listNFT}>
                    <h3 className="text-center font-bold text-purple-500 mb-8">
                        Upload your Carbon Credits to the Marketplace
                    </h3>
                    
                    <div className="mb-4">
                        <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="name">
                            Number of Carbon Credits
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="No of Carbon Credits"
                            value={formParams.name}
                            onChange={(e) => updateFormParams({ ...formParams, name: e.target.value })}
                        />
                    </div>
                    
                    <div className="mb-6">
                        <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="description">
                            Carbon Credit Description
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="description"
                            placeholder="Describe the Carbon Credit"
                            value={formParams.description}
                            onChange={(e) => updateFormParams({ ...formParams, description: e.target.value })}
                        />
                    </div>
                    
                    <div className="mb-6">
                        <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="price">
                            Price (in USD)
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="price"
                            type="number"
                            placeholder="Min $0.01"
                            step="0.01"
                            value={formParams.price}
                            onChange={(e) => updateFormParams({ ...formParams, price: e.target.value })}
                        />
                    </div>
                    
                    <div className="text-red-500 text-center">{message}</div>
                    
                    <button
                        type="submit"
                        className="font-bold mt-10 w-full bg-purple-500 text-white rounded p-2 shadow-lg"
                        id="list-button"
                    >
                        List Credits
                    </button>
                </form>
            </div>
        </div>
    );
}
