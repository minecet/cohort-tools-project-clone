const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const studentsSchema = new Schema ({
    firstName: {
        required: true,
        type: String
    },
    lastName: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    phone: {
        required: true,
        type: String
    },
    linkedinUrl:{
        type: String, //This needs to be a url, do we need to match?
        default: ""
    },
    languages: {
        type: [String],
        enum: ["English", "Spanish", "French", "German", "Portuguese", "Dutch", "Other"]
    },
    program:{
        type: String,
        enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"]
    },
    background: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: "https://i.imgur.com/r8bo8u7.png"
    },
    cohort: {
        type: Schema.Types.ObjectId, //need to do the popoulat() later on
        ref: 'Cohort',
    },
    projects: {
        type: [String]
    } 
})



// CREATE MODEL, it changes to plural alone 
const Student = mongoose.model('Student', studentsSchema)

// EXPORT THE MODEL
module.exports = Student