import { useState,useEffect } from "react";
import style from './LiveResult.module.css'
 const Result = () => {

    const [response,setRes] = useState();
    const [err,setErr] = useState();

     useEffect(()=>{
          async function handleApi() {
        
             try {
                const token = localStorage.getItem("token");
                const res = await fetch('http://localhost:3000/candidate/vote/count', {
                   method: 'GET',
                   headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                   }
                })
                console.log(res);
                const result = await res.json();
                console.log(result);
                if(res.ok){
                    setRes(result);
                    console.log(result);
                }
                else{
                    setErr(result.message);
                }

                console.log(response);
              
             } catch (error) {
                console.log(error);
             }
          }
          handleApi();      
         }, [])
    
    return(
        <>
        <div className={style.container_result}>
            {response && <div>
                <div className={style.candidate_votes}>
                   <h1>Candidate Name</h1>
                   <h1>No. of Votes</h1>
                </div>
                {response.candidate.map((data) => {
                    return (
                        <div className={style.candidate_votes} key={data._id}>
                            <h2>{data.party}</h2>
                            <h2>{data.voteCount}</h2>
                        </div>
                    );
                })}
            </div>}
            {err && <h2>{err}</h2>}
        </div>
        </>
    )
 
};

export default Result;