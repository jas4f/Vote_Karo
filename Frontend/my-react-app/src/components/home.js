import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from './home.module.css';
import Dialog from './Dialog'; // Import the Dialog component
import Gif_loding from './Images/VAyR.gif';
const Home = () => {
   const openDialog = (action, id) => {
      setActionType(action);  // Store action type (delete, vote, update)
      setCandidateId(id);     // Store candidate ID
      setDialogOpen(true);     // Open the dialog
   };
   
   
   const closeDialog = () => setDialogOpen(false);
   const handleConfirm = async () => {
       if (actionType === 'vote') {
         console.log('Voting for candidate ID:', candidateId);
         // Add your voting logic here
      }  
      setDialogOpen(false); // Close the dialog after confirmation
   };
   const [res, setRes] = useState('');
    const [isDialogOpen, setDialogOpen] = useState(false);
   const [actionType, setActionType] = useState('');
   const [candidateId, setCandidateId] = useState(null);
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');

   // Re-fetch data after deletion
   useEffect(() => {
      async function fetchCandidates() {
         try {
            const res = await fetch('http://localhost:3000/candidate', {
               method: 'GET',
               headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
               }
            });
            const result = await res.json();
            setRes(result);
         } catch (error) {
            console.log(error);
         }
      }
      fetchCandidates();
   }, []); 
   
   return (
      <div>
         <div className={style.container}>
            {Array.isArray(res) && res.length > 0 ? (
               res.map((data, index) => (
                  <div className={style.candidates_list} key={index}>
                     <h3>{data.name}</h3>
                     <h3>{data.party}</h3>
                     <h3>{data.age}</h3>
                     <div className={style.variousOperation}>
                           <Link to={"/VoteSuccessfully/" + data._id}>
                              <button 
                              onClick={() => openDialog('Vote', data._id)}
                              className={style.vote_button}>Vote</button>
                           </Link>
                     </div>
                  </div>
               ))
            ) : (
               <h1 className={style.data_not_present}>
                  <img src={Gif_loding} alt="" />
               </h1>
            )}
         </div>

         {/* Dialog for confirmation */}
         <Dialog
            isOpen={isDialogOpen}
            onClose={closeDialog}
            onConfirm={handleConfirm}
            message={`Are you sure you want to ${actionType} this candidate?`}
         />
      </div>
   );
};

export default Home;
