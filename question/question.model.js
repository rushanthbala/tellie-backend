const mongoose = require('mongoose')

const Schema = mongoose.Schema

const gradeSchema = new Schema({
    question : {
        type: String,
        required: true
    },
    answer :[ {
        type: String,
        required: true
    }],
    correct_answer : {
        type: String,
        required: true
    },
    gradeID: {
        type: Schema.Types.ObjectId,
        ref: 'grade',
        required: true
    },
    subjectID: {
        type: Schema.Types.ObjectId,
        ref: 'subject',
        required: true
    },
    unitID: {
        type: Schema.Types.ObjectId,
        ref: 'unit',
        required: true
    }
    
},  {timestamps:true})


module.exports = mongoose.model('defaultQuestions', gradeSchema)