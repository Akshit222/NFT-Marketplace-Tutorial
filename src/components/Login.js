// Login.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogin = async () => {
        setLoading(true); // Start loading
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();
            setLoading(false); // Stop loading

            if (response.ok && result.name) {
                localStorage.setItem('user', JSON.stringify(result));
                navigate('/');
            } else {
                alert("Incorrect email or password. Please try again.");
            }
        } catch (error) {
            setLoading(false); // Stop loading on error
            alert("An error occurred during login. Please try again later.");
            console.error("Login error:", error);
        }
    };

    return (
        <div className='login'>
            <h1>Login</h1>
            <input 
                type="text" 
                className='inputBox' 
                placeholder='Enter Email' 
                onChange={(e) => setEmail(e.target.value)} 
                value={email} 
            />
            <input 
                type="password" 
                className='inputBox' 
                placeholder='Enter Password' 
                onChange={(e) => setPassword(e.target.value)} 
                value={password} 
            />
            <button 
                onClick={handleLogin} 
                className="appbutton" 
                type="button"
                disabled={loading} // Disable button while loading
            >
                {loading ? "Logging in..." : "Login"}
            </button>
        </div>
    );
}

export default Login;