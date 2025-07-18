import {useEffect, useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import LogoutBtn from './LogoutBtn';


const Homepage = () => {
    const navigate = useNavigate()
    const [loggedinUser, setLoggedinUser] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token){
            navigate('/login');
            return;
        }
        const base64Payload = token.split('.')[1];
        setLoggedinUser(JSON.parse(atob(base64Payload)));
    }, [])


    return <>
        <h1> HomePage </h1>
        <div className="loginpage">
        <div className="formWrapper">
        {loggedinUser && (
  <div className='notform'>
    <p>You're logged in as: {loggedinUser.username}</p>
    <LogoutBtn />
  </div>
)}
       <p>Want to <Link to='/delete' style={{color: '#760000', fontSize: '0.875rem'}} >Delete user?</Link></p>
        </div>
        </div>
    </>
};

export default Homepage;
