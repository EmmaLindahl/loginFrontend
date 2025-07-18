import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"

const DeleteForm = () =>{

    const [deleteUser, setDeleteUser] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    const handleDelete = async (e) => {
        console.log(deleteUser, password)
        e.preventDefault();
        try{
            const res = await fetch('http://localhost:5000/delete', {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({username: deleteUser, password})
            })
            const data = await res.json();
            if(!res.ok){
                setMessage(data.message || "Login failed");
                return
            }
            localStorage.removeItem('token')
            setMessage(data.message);
            navigate('/delete')
        }catch{

        }
    }

    return<>
    <h1>Delete</h1>
    <div className="loginpage">
        <div className="formWrapper">
    <form type="submit" className="form" onSubmit={handleDelete}>
        <input
            className="forminput"
            type="text"
            placeholder="username"
            value={deleteUser}
            onChange={(e) => setDeleteUser(e.target.value)}
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
             <div>{message}</div>
            <button type="submit" className="button-87">Delete</button>
    </form>
    <p>Go back to <Link to='/' style={{color: '#760000', fontSize: '0.875rem'}}>Homepage</Link></p>
    </div>
    </div>
    </>
}

export default DeleteForm;