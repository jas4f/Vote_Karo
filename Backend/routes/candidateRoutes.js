const Candidate = require('../models/candidate');
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { jwtAuthMiddleware, generateToken } = require('../jwt');


const checkAdminRole = async(userID)=>{
    try {
        const user = await User.findById(userID);
        if(user.role === 'admin'){
            return true;
        }
    } catch (error) {
        return false;
    }
}

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));  // Timestamp to prevent file name conflicts
//     }
// });

// const upload = multer({ storage: storage });
// app.use('/uploads', express.static('uploads'));

// app.post('/upload/:candidateId', upload.single('profileImage'), async (req, res) => {
//     const { candidateId } = req.params;

//     if (!req.file) {
//         return res.status(400).send('No file uploaded');
//     }

//     try {
//         // Find candidate by ID and update with the image URL
//         const updatedCandidate = await Candidate.findByIdAndUpdate(
//             candidateId,
//             { imageUrl: `/uploads/${req.file.filename}` }, // Store the image path
//             { new: true }
//         );

//         if (!updatedCandidate) {
//             return res.status(404).send('Candidate not found');
//         }

//         // Send the updated candidate info with image URL
//         res.json(updatedCandidate);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error saving image URL');
//     }
// });


router.post('/',jwtAuthMiddleware, async (req,res)=>{
    try {
        if(!(await checkAdminRole(req.user.id)))
          return res.status(403).json({message : 'user does not have admin role.'});

        const data = req.body;

        const newCandidate = new Candidate(data);

        const response = newCandidate.save();
        console.log('data saved');
        res.status(200).json({response:response});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'innernal server error'});
    }
})
router.put('/:candidateID',jwtAuthMiddleware,async (req,res)=>{
  try {
      if (!(await checkAdminRole(req.user.id)))
          return res.status(403).json({ message: 'user does not have admin role.', token: req.user.id });
     const candidateID = req.params.candidateID;
     const updatedCardidateData  = req.body;

      const response = await Candidate.findByIdAndUpdate(candidateID, updatedCardidateData,{
        new: true,
        runValidators: true
      })

      if(!response){
        return res.status(404).json({error : 'candidate not found'})
      }

      console.log('candidate data updated');
      res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({error:'internal error occured'});
  }
})
router.delete('/:candidateID', jwtAuthMiddleware, async (req, res) => {
    try {
        if (!checkAdminRole(req.user.id))
            return res.status(403).json({ message: 'user does not have admin role' });

        const candidateID = req.params.candidateID; // Extract the id from the URL parameter

        const response = await Candidate.findByIdAndDelete(candidateID);

        if (!response) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        console.log('candidate deleted');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
router.get('/:candidateID', jwtAuthMiddleware, async (req, res) => {
    try {
        if (!checkAdminRole(req.user.id))
            return res.status(403).json({ message: 'user does not have admin role' });

        const candidateID = req.params.candidateID; 

        const response = await Candidate.findById(candidateID);

        if (!response) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/vote/count', async (req, res) => {
    try {
        const candidate = await Candidate.find().sort({ voteCount: 'desc' });

        // const voteRecord = candidate.map((data) => {
        //     return {
        //         party: data.party,
        //         count: data.voteCount
        //     }
        // })

        return res.status(200).json({ candidate })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'innernal Server error' });
    }

})
router.get('/vote/:candidateID',jwtAuthMiddleware,async(req,res)=>{
    const candidateId = req.params.candidateID;
    const userId = req.user.id;
    console.log(userId);
  try {
      const candidate = await Candidate.findById(candidateId);
    if(!candidate){
        res.status(404).json({message:'candidate not found'});
    }
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'user not found' });
      }
      if (user.role == 'admin') {
          return res.status(403).json({ message: 'admin is not allowed' });
      }
      if (user.isVoted) {
          return res.status(400).json({ message: 'You have already voted' });
      }
   
    candidate.votes.push({user:userId});
    candidate.voteCount++;
    await candidate.save();
    
    user.isVoted = true;
    await user.save();

    res.status(200).json({message : 'Vote recodered successfully'});
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: 'internal Server error'});
  }
})

router.get('/',async (req,res)=>{
    try {
        const candidates = await Candidate.find({},'name party age votes _id');
        res.status(200).json(candidates);
    } catch (error) {
        console.log(error);
        res.status(500).json({error : 'Internal Server error'});
    }
});


module.exports = router;
