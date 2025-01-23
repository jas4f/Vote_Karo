import { useEffect, useState } from "react";
import style from './AddCandidate.module.css';
import { Style } from "@material-ui/icons";
 const AddCandidate = () => {

    const[show_result,setResult] = useState();
    const [mess,setMess] = useState();
    const [err,setError] = useState();
    const [name,setName] = useState();
    const [age,setAge] = useState();
    const [party,setParty] = useState();

        
        const handleSubmit = async (event)=>{
            event.preventDefault();
             try {
                 const Token = localStorage.getItem('token');
                 const response = await fetch("http://localhost:3000/candidate", {
                     method: 'post',
                     headers: {
                         'Content-type': 'application/json',
                         'authorization': `Bearer ${Token}`
                     },
                     body:JSON.stringify({
                        name: name,
                        age: age,
                        party: party
                     })
                 })
                  
                 if(response.ok){
                    setMess('Data added successfully');
                 }
                 else{
                    setError('add candidate failed');
                 }
             } catch (error) {
                console.log(error);
             }
        }
     
    return(
        <>
          <div>
            <h1 className={style.heading_add_candidate}>Add Candidate</h1>
                <form className={style.form_sub_container} onSubmit={handleSubmit}>
                    <input type="text" placeholder="Candidate Name" className={style.input_form} onChange={(e)=>{setName(e.target.value)}} />
                    <input type="number" placeholder="Candidate age" className={style.input_form} onChange={(e) => { setAge(e.target.value) }} />
                    <input type="text" placeholder="Candidate party" className={style.input_form} onChange={(e) => { setParty(e.target.value) }} />
                    {mess && <h4 className={Style.message}>{mess}</h4>}{err && <h4 className={Style.error}>{err}</h4>}
                    <button className={style.add_button}>Add Candidate</button>
                </form>
          </div>
        </>
    )
};

export default AddCandidate;