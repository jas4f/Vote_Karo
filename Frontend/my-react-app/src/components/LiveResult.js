import { useState,useEffect } from "react";

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
            {response && <div>
                {response.candidate.map((data) => {
                    return (
                        <div key={data._id}>
                            <h2>{data.party}</h2>
                            <h2>{data.voteCount}</h2>
                        </div>
                    );
                })}
            </div>}
            {err && <h2>{err}</h2>}
            
        </>
    )
 
};

export default Result;