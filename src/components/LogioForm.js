import { useState } from "react";
import '../App.css'
import {useNavigate, Link} from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) =>{
        e.preventDefault();

        try{
            console.log(username, password)
            const res = await fetch('https://loginbackend-b3pq.onrender.com/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username, password})
            });
            const data = await res.json();

            if (!res.ok) {
                setMessage(data.message || "Login failed");
                return;
            }

            localStorage.setItem('token', data.token);
            setMessage(data.message);
            navigate('/')

        } catch (err){
            setMessage("Login failed: " + err.message)
            console.log(err)
        }
    };
    // This css sucks
    return <>
        <h1>Login</h1> 
    <div className="loginpage">
    <div className="formWrapper">
    
        <form className="form" onSubmit={handleLogin}>
        <input
            className="forminput"
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
        />
        <input 
            className="forminput"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        <div style={{color: '#760000', fontSize: '0.875rem'}}>{message}</div>
        <button type="submit" className="button-87 ">Log In</button>
        </form>
        <p>Don't have an account? <Link to='/register' style={{color: '#007bff'}}>Sign up</Link></p>
    </div>
    </div>
        
       
    </>
};

export default LoginForm;
