import { Link, useNavigate } from 'react-router-dom';
import style from './signup.module.css';
import { useEffect, useState } from 'react';
import Image_logo from './Images/National-Emblem.jpg'
const Login = ({setRole}) => {

    const [password, setPassword] = useState('');
    const [aadhar_id, setAadhar_id] = useState('');
    const [message,setMessage] = useState('');
    const [token, setToken] = useState(null);

    const navigate = useNavigate();

    // const [navigation,setNavigation] = useState();
    const handleSubmit = async(event) => {
        event.preventDefault();
        setMessage('');
        try {
            setToken('');
            // setNavigation(true);
            const signup_response = await fetch('http://localhost:3000/user/login', {
                method: 'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    password: password,
                    aadharCardNumber: aadhar_id
                })
            });

            const cleanedToken = await signup_response.json();
            if (cleanedToken.role){
                localStorage.setItem('role',cleanedToken.role);
            }

            if(cleanedToken.message){
                const mess =  cleanedToken.message;
                console.log('this is mess:', mess);
                setMessage(mess);
            }
            console.log('this is response : ', cleanedToken);
            console.log(cleanedToken.token);
            if (cleanedToken.token){
            localStorage.setItem("token", cleanedToken.token);
            setToken(cleanedToken.token);
            }
            
            
        } catch (error) {
            console.log(error);

        }

    }
    
    useEffect(() => {
        if (token) {
            navigate('/');
            console.log('called',token);
        }
    }, [token, navigate]);

    return (

    <div className={style.container_loginSignup}>
    
    
     <div className={style.loginSignup_component}>
                <h2 className={style.logo}><span>Welcome to </span><span>Vote Karo</span><span><i class="fa-solid fa-check-to-slot"></i></span></h2>
        <div className={style.loginSignup_sub_component}>
            <h1 className={style.heading}>Log In </h1>
            <div className={style.form_list}>
                <form onSubmit={handleSubmit} className={style.form_inputs}>
                    <input type="text" onChange={(e) => { setPassword(e.target.value) }} className={style.input} placeholder='Enter the Password' />
                    <input type="text" onChange={(e) => { setAadhar_id(e.target.value) }} className={style.input} placeholder='Enter the aadhar Card Number' />
                    <h4 className={style.warning_mess}>{message}</h4>
                    <button className={style.btn} type='submit'>Log In</button>
                    <Link className={style.Link_for_routing}  to="/signup">Create an Account ?</Link>
                </form>
            </div>
        </div>
     </div>
    </div>
    )
}

export default Login;