import { Link, useNavigate } from 'react-router-dom';
import style from './signup.module.css';
import { useState } from 'react';
const Signup = ()=>{

  const[role,setRole] = useState('voter');
  const[name,setName] = useState();
  const[age,setAge] = useState();
  const[mobile,setMobile] = useState();
  const[password,setPassword] = useState();
  const[email,setEmail] = useState();
  const [address, setAddress] = useState();
  const [aadhar_id, setAadhar_id] = useState();
  const [error1,setError] = useState();
  const navigate = useNavigate();
  const handleSubmit = async(event)=>{
    event.preventDefault();
    setError('');
    try {
      const signup_response = await fetch('http://localhost:3000/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
          name: name,
          age: age,
          mobile: mobile,
          email: email,
          address : address,
          aadharCardNumber: aadhar_id,
          password: password,
          role : role
        })
      });
      if (!signup_response.ok) {
        console.error(`HTTP Error: ${signup_response.status}`);
        const result = await signup_response.json();
        if (result.error){
          setError(result.error);
        }
        else if (result.message){
          setError(result.message);
        }   
        
        throw new Error('Failed to sign up');
      }
      

      const result = await signup_response.json();
      console.log(result.error);
      localStorage.setItem("token", signup_response.token);
      navigate('/');

    } catch (error) {
      console.log(error);

    }

  }
  return(
  <div className={style.container_loginSignup}>
    <div className={style.loginSignup_component}>
        <h2 className={style.logo}><span>Welcome to</span> <br /><span>Vote Karo</span> </h2>
      <div className={style.loginSignup_sub_component}>
        <h1 className={style.heading}>Create an Account</h1>
      <div className={style.choose_role}>
         <div className={style.role}>
          <button className={`${style.btn}  ${role === "admin" ? style.active : ""}`} type="button" onClick={() => setRole('admin')}>Admin</button>
          <button className={`${style.btn}  ${role === "voter" ? style.active : ""}`} type="button" onClick={() => setRole('voter')}>Voter</button>
        </div>
      </div>


      <div className={style.form_list}>
        <form className={style.form_inputs} onSubmit={handleSubmit}>
          <input type="text" onChange={(e)=>{setName(e.target.value)}} className={style.input} placeholder='Enter the Name' />
          <input type="text" onChange={(e) =>{ setMobile(e.target.value) }} className={style.input} placeholder='Enter the Mobile' />
          <input type="text" onChange={(e) => { setPassword(e.target.value) }} className={style.input} placeholder='Enter the Password' />
          <input type="text" onChange={(e) => { setAge(e.target.value) }} className={style.input} placeholder='Enter the age' />
          <input type="text" onChange={(e) => { setAddress(e.target.value) }} className={style.input} placeholder='Enter the address' />
          <input type="text" onChange={(e) => { setEmail(e.target.value) }} className={style.input} placeholder='Enter the Email' />
          <input type="text" onChange={(e) => { setAadhar_id(e.target.value) }} className={style.input} placeholder='Enter the aadhar Card Number' />
          {(error1) ? <h4 className={style.warning}>{error1}</h4>:''}
          <button className={style.btn} type='submit'>Sign Up</button>
          <Link className={style.Link_for_routing} to="./Login.js">Already have account ?</Link>   
        </form>
      </div>
    </div>
    </div>
    </div>

  )
}

export default Signup;