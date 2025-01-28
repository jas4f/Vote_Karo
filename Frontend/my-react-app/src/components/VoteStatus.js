import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import style from './VoteStatus.module.css'
 
 const VoteSuccessfully = () => {

    const [result,setResult] = useState();
    const [message,setMess] = useState();
     let param_data = useParams();
useEffect(()=>{
    
    const fetchApi = async ()=>{
        try {
            console.log(param_data.id);
            const candidateID = param_data.id;
            const token = localStorage.getItem("token");
            console.log(token);
            const Response = await fetch(`http://localhost:3000/candidate/vote/${candidateID}`, {
                method: 'get',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            
            const res = await Response.json();
            if (Response.ok) {
                setResult(res.message)
            }
            else{
                const mess = res.message;
                setMess(mess);
            }
           
            console.log(res); 


        } catch (error) {
            console.log(error);
        }
       
    }
     fetchApi();
},[param_data.id]);

  return(
    <>  
    <div className={style.container_result}>
              <div className={style.result}>
                <h4 className={style.mess}>{message}</h4>
                  {/* <h2>thanks for Voting 😊</h2>
                  <h3>Happy voting ❤️</h3> */}
                  {result && (
                      <div className={style.result}>
                          <h4 className={style.mess}>{result}</h4>
                          <h4 className={style.mess}>Happy Voting ❤️</h4>
                  </div>
                )}
              </div>
    </div> 

      
    </>
  )
};

export default  VoteSuccessfully;