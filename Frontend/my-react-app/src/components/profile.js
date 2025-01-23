import { useEffect, useState } from "react";
import style from './profile.module.css';

const Votecenter = () => {
   const[res,setRes] = useState('');
    useEffect(()=>{
         async function handleApi() {
            try {
               const token = localStorage.getItem("token");
               const res = await fetch('http://localhost:3000/user/profile', {
                  method: 'get',
                  headers: {
                     'Content-Type': 'application/json',
                     'Authorization': `Bearer ${token}`
                  }
               })
               const result = await res.json();
               setRes(result);
               // setRole(res.role);
               console.log(result);
            } catch (error) {
               console.log(error);
            }
         }
         handleApi();      
        },[])

  return(
    <div className={style.container}>
      <div className={style.sub_container}>
           {res && <div className={style.profile_items}>
              <h1 className={style.item}>Name : <input type="text" className={style.input_profile_form} value={res.name} disabled /></h1>
              <h1 className={style.item}>Age : <input type="text" className={style.input_profile_form} value={res.age} disabled /></h1>
              <h1 className={style.item}>Mobile : <input type="text" className={style.input_profile_form} value={res.mobile} disabled /></h1>
              <h1 className={style.item}>Email address : <input type="text" className={style.input_profile_form} value={res.email} disabled /></h1>
              <h1 className={style.item}>Address : <input type="text" className={style.input_profile_form} value={res.address} disabled /></h1>
           </div>}
      </div>
        <div className={style.sub_container}>
           <img src='../image1.jpg' alt="no pic" />
      </div>
      
        
    </div>
  )
};

export default Votecenter;