import { Link } from "react-router-dom";
import style from './home.module.css';
import { useState, useEffect } from "react";
import Gif_loding from './Images/VAyR.gif';
import Dialog from './Dialog'; // Import the Dialog component

export const Admin = () => {
     const [res, setRes] = useState('');
       const [error, setError] = useState('');
       const [deleteCandidate, setDelete] = useState(false);
       const [isDialogOpen, setDialogOpen] = useState(false);
       const [actionType, setActionType] = useState('');
       const [candidateId, setCandidateId] = useState(null);
       const token = localStorage.getItem('token');

    const openDialog = (action, id) => {
        setActionType(action);  // Store action type (delete, vote, update)
        setCandidateId(id);     // Store candidate ID
        setDialogOpen(true);     // Open the dialog
    };

    const closeDialog = () => setDialogOpen(false);

    const handleConfirm = async () => {
        if (actionType === 'delete') {
            await handleDeletion(candidateId); // Perform delete
        } else if (actionType === 'vote') {
            console.log('Voting for candidate ID:', candidateId);
            // Add your voting logic here
        } else if (actionType === 'update') {
            console.log('Updating candidate ID:', candidateId);
            // Add your update logic here (you can navigate or update data)
        }
        setDialogOpen(false); // Close the dialog after confirmation
    };

    const handleDeletion = async (candidateId) => {
        try {
            const res = await fetch(`http://localhost:3000/candidate/${candidateId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                console.log('Candidate deleted successfully');
                setDelete(true);
                // Trigger a re-fetch after deletion to update the list
            } else {
                const result = await res.json();
                setError(result.error);
            }
        } catch (error) {
            console.log(error);
            setError('Error while deleting candidate');
        }
    };

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
    }, [deleteCandidate]); 

  return(
    <>
          {Array.isArray(res) && res.length > 0 ? (
                        res.map((data, index) => (
                           <div className={style.candidates_list_admin} key={index}>
                              <h3>{data.name}</h3>
                              <h3>{data.party}</h3>
                              <h3>{data.age}</h3>
                              <div className={style.variousOperation}>                           
                                    <button
                                       onClick={() => openDialog('delete', data._id)}
                                       className={style.operate_button}
                                    >
                                        <i class="fa-solid fa-trash"></i>
                                    </button>
                                    <Link to={"/" + data._id}>
                                        <button className={style.operate_button}><i class="fa-regular fa-pen-to-square"></i></button>
                                    </Link>
                               
                              </div>
                           </div>
                        ))
                     ) : (
                        <h1 className={style.data_not_present}>
                           <img src={Gif_loding} alt="" />
                        </h1>
                     )}
              <Link to='/addCandidate'>
              <div className={style.candidates_list_admin}>
                      <h2>Add Candidate Data</h2>
                  <span >
                      <i className="fa-solid fa-plus"></i>
                  </span>
                  </div>
              </Link>
            <Dialog
                isOpen={isDialogOpen}
                onClose={closeDialog}
                onConfirm={handleConfirm}
                message={`Are you sure you want to ${actionType} this candidate?`}
            />
    </>
  )
};
