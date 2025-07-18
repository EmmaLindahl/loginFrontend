import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const RegisterForm = () =>{
    const navigate = useNavigate()
    const [newUser, setNewUser] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [registerMessage, setRegisterMessage] = useState("")

    const handelRegister = async (e) => {
        e.preventDefault();

        try{
            console.log(newUser, newPassword)
            const res = await fetch('http://localhost:5000/register', {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({username:newUser, password:newPassword})
            });
            const data = await res.json()
            
            if (!res.ok) {
                setRegisterMessage(data.message || "Login failed");
                return;
            }

            setRegisterMessage(data.message)
            

        }catch(err){
            setRegisterMessage("Registration failed: " + err.message)
        }
    }

    return <>
        <h1>Register</h1>
        <div className="loginpage">
            <div className="formWrapper">
            <form className="form" onSubmit={handelRegister}>
                <input
                    className="forminput"
                    type="text"
                    placeholder="new username"
                    value={newUser}
                    onChange={(e) => setNewUser(e.target.value)}
                    required
                />
                <input
                    className="forminput"
                    type="text"
                    placeholder="new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <div style={{color: '#760000', fontSize: '0.875rem'}}>{registerMessage}</div>
                <button type="submit" className="button-87">Create</button>
            </form>
            <p>Already have an account? <Link to='/login' style={{color: '#007bff'}}>Log in</Link></p>
            </div>
        </div>
    </>
};

export default RegisterForm;