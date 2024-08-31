import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    }, [navigate]); // Add `navigate` to dependency array

    const collectdata = async () => {
        console.warn(name, email, password);
        
        try {
            let result = await fetch('http://localhost:5000/register', { // Updated URL to port 5000
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            result = await result.json();
            console.warn(result);

            if (result) {
                localStorage.setItem("user", JSON.stringify(result));
                navigate('/');
            } else {
                console.error("Failed to register");
            }
        } catch (error) {
            console.error("Error during registration:", error);
        }
    }

    return (
        <div className="register">
            <h1>Register</h1>
            <input 
                className="inputBox" 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Enter Name" 
            />
            <input 
                className="inputBox" 
                type="email"  // Change type to "email" for better validation
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter Email" 
            />
            <input 
                className="inputBox" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter Password" 
            />
            <button onClick={collectdata} className="appbutton" type="button">
                Sign Up
            </button>
        </div>
    );
}

export default SignUp;
