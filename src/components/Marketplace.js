import Navbar from "./Navbar";
import { useState, useEffect } from "react";

export default function Marketplace() {
    const sampleData = [
        {
            "name": "Reliance Telecomm",
            "description": "Reliance is offering surplus carbon credits.",
            "cost": "1 Million $",
            "currentlyAvailable": "True",
            "address": "Mumbai, India",
        },
        {
            "name": "Adani Farma",
            "description": "Adani Farma is offering surplus carbon credits.",
            "cost": "2 Million $",
            "currentlyAvailable": "True",
            "address": "Ahmedabad, India",
        },
        {
            "name": "Mama Earth",
            "description": "Mama Earth is offering surplus carbon credits.",
            "cost": "1.5 Million $",
            "currentlyAvailable": "True",
            "address": "Delhi, India",
        },
        {
            "name": "Tata Steel",
            "description": "Tata Steel is offering surplus carbon credits.",
            "cost": "2.5 Million $",
            "currentlyAvailable": "True",
            "address": "Jamshedpur, India",
        },
        {
            "name": "Infosys",
            "description": "Infosys is offering surplus carbon credits.",
            "cost": "1.8 Million $",
            "currentlyAvailable": "True",
            "address": "Bangalore, India",
        },
        {
            "name": "Wipro",
            "description": "Wipro is offering surplus carbon credits.",
            "cost": "1.2 Million $",
            "currentlyAvailable": "True",
            "address": "Bangalore, India",
        },
        {
            "name": "Mahindra & Mahindra",
            "description": "Mahindra & Mahindra is offering surplus carbon credits.",
            "cost": "3 Million $",
            "currentlyAvailable": "True",
            "address": "Mumbai, India",
        },
        {
            "name": "Hindustan Unilever",
            "description": "Hindustan Unilever is offering surplus carbon credits.",
            "cost": "1.7 Million $",
            "currentlyAvailable": "True",
            "address": "Mumbai, India",
        },
        {
            "name": "ONGC",
            "description": "ONGC is offering surplus carbon credits.",
            "cost": "2 Million $",
            "currentlyAvailable": "True",
            "address": "Dehradun, India",
        },
    ];

    const [data, updateData] = useState(sampleData);

    return (
        <div>
            <Navbar></Navbar>
            <div className="flex flex-col place-items-center mt-20">
                <div className="md:text-xl font-bold text-white">
                     Carbon Credits List
                </div>
                <div className="flex mt-5 justify-between flex-wrap max-w-screen-xl text-center">
                    {data.map((value, index) => {
                        return (
                            <div key={index} className="border p-4 m-2 w-60 text-white bg-gray-800">
                                <h2 className="text-lg font-bold">{value.name}</h2>
                                <p>{value.description}</p>
                                <p>Cost: {value.cost}</p>
                                <p>Available: {value.currentlyAvailable}</p>
                                <p>Location: {value.address}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
