import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const RegisterForm = () =>{
    const navigate = useNavigate()
    const [newUser, setNewUser] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [registerMessage, setRegisterMessage] = useState("")
    const [passwordStrenghMessage, setpasswordStrenghMessage] = useState({ line1: null, line2: null });

    function checkCharacter(pass){
        if (!pass) {
        setpasswordStrenghMessage({ line1: null, line2: null });
        return;
    }
        const testObject = {}

        for(let i=0; i<pass.length; i++){
        if(/[a-z]/.test(pass[i])){
            testObject.checkLowercase = true
        }else if(/[A-Z]/.test(pass[i])){
            testObject.checkUppercase = true
        }else if(/\d/.test(pass[i])){
            testObject.checkNumber = true
        }else{testObject.checkSpecialCharacter = true}

        if (
                testObject.checkLowercase &&
                testObject.checkUppercase &&
                testObject.checkNumber &&
                testObject.checkSpecialCharacter
            ) break;
        }
        setpasswordStrenghMessage(evaluateStrength(newPassword.length,Object.keys(testObject).length))
    }

    function evaluateStrength (length, types){
        const messages = {
            weak: "⚠️ Easy to Guess",
            medium: "🔒 Decent",
            strong: "✅ Strong"
        };
         const messages2 = {
            weak: "Add more length or character types",
            medium: "Add more length or character types",
            strong: "Good mix of length and characters"
        };

        if (types === 1) {
        if (length <= 9) return { line1: messages.weak, line2: messages2.weak };
        return { line1: messages.medium, line2: messages2.medium };
    } else if (types === 2) {
        if (length <= 8) return { line1: messages.weak, line2: messages2.weak };
        return { line1: messages.medium, line2: messages2.medium };
    } else if (types === 3) {
        if (length <= 7) return { line1: messages.weak, line2: messages2.weak };
        if (length <= 10) return { line1: messages.medium, line2: messages2.medium };
        return { line1: messages.strong, line2: messages2.strong };
    } else if (types === 4) {
        if (length <= 7) return { line1: messages.weak, line2: messages2.weak };
        if (length <= 9) return { line1: messages.medium, line2: messages2.medium };
        return { line1: messages.strong, line2: messages2.strong };
    }
}


    const handelRegister = async (e) => {
        e.preventDefault();

        try{
            console.log(newUser, newPassword)
            const res = await fetch('https://loginbackend-b3pq.onrender.com/register', {
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
                    onChange={(e) => {setNewPassword(e.target.value); checkCharacter(e.target.value)}}
                    required
                />
                {passwordStrenghMessage.line1 && (
                    <p style={{ fontSize: '0.875rem', margin: '.5px' }}>
                        {passwordStrenghMessage.line1}<br />
                        {passwordStrenghMessage.line2}
                    </p>
                )}
                <div style={{color: '#760000', fontSize: '0.875rem'}}>{registerMessage}</div>
                <button type="submit" className="button-87">Create</button>
            </form>
            <p>Already have an account? <Link to='/login' style={{color: '#007bff'}}>Log in</Link></p>
            </div>
        </div>
    </>
};

export default RegisterForm;