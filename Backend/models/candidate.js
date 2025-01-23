const mongoose = require('mongoose');
 
const candidateScheme = new mongoose.Schema({
    imageUrl:{
        type: String
    },
    name : {
        type: String , 
        required: true
    },
    party : {
        type:String,
        required: true
    },
    age:{
        type: String,
        required: true
    },
    votes:[
     {
        user : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        votedAt : {
            type: Date,
            default: Date.now()
        }
     }

    ],
    voteCount : {
        type: Number,
        default : 0
    }
     
});

const Candidate = mongoose.model('Candidate', candidateScheme);
module.exports = Candidate;