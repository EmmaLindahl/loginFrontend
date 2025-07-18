import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {
    const navigate = useNavigate()

    const handleLogout = (e) => {
        e.preventDefault();
      localStorage.removeItem('token')
      navigate('/login')
    }

    return <>
    <button type="button" className="button-87" onClick={handleLogout}>Log Out</button>
       
    </>
}

export default LogoutBtn