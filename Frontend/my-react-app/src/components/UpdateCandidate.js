import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import  Style from './UpdateCandidate.module.css'

const ManageCandiate = ({ method }) => {
    const param = useParams();
    const candidateID = param.id;
   
    const [fetch_data, setFetch_data] = useState('');
    const [updateName, setName] = useState('');
    const [updateAge, setAge] = useState('');
    const [updateParty, setParty] = useState('');
    const [error, setError] = useState('');
    const [result, setResult] = useState('');
    const [error_put,setError_put] = useState('');
    const [mess,setMess] = useState('');

    useEffect  (() => {
        const handleOperation = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await fetch(`http://localhost:3000/candidate/${candidateID}`, {
                    method: 'get',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })

                const result = await res.json();
                console.log(result);
                if (!(res.error)) {
                    setError(res.error);
                }
                setFetch_data(result);
                setName(result.name);
                setAge(result.age);
                setParty(result.party);

            } catch (error) {
                console.log(error);
            }
           
        }
        handleOperation();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const put_req_res = await fetch(`http://localhost:3000/candidate/${candidateID}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'authorization': `bearer ${token}`
                },
                body: JSON.stringify({
                    name: updateName,
                    age: updateAge,
                    party: updateParty
                })
            })
            console.log(put_req_res);
            if(put_req_res.ok){
                setMess('Data updated successfully');
            }
            

            const result_request = await put_req_res.json();
            if(!(put_req_res.ok)){
                setError_put(result_request.message);
            }
            console.log(result_request);
            setResult(put_req_res);

        } catch (error) {
         console.log(error);
        }
       
    }
    // let response = handleOperation(method);
    // console.log(response);
    return (
         
        <div className={Style.form_container}>
            <h1 className={Style.heading_update_candidate}>Update Candidate</h1>
            <form onSubmit={handleSubmit} className={Style.form_sub_container}>
                <input type="text" className = {Style.form_input} onChange={(e) => { setName(e.target.value) }} value={updateName}/>
                <input type="number" className={Style.form_input} onChange={(e) => { setAge(e.target.value) }} value={updateAge} />
                <input type="text" className={Style.form_input} onChange={(e) => { setParty(e.target.value) }} value={updateParty} />
                {mess && <h4 className={Style.message_success}>{mess}</h4>}
                {error && <h4 className={Style.message_error}>{error_put}</h4>}
                <button type="submit" className={Style.update_btn}>Update</button>
            </form>
        </div>
       


    )
};

export default ManageCandiate;