const mongoose = require("mongoose");

const subObj ={
    labName : String,
    checked : Boolean
}

const StudentModel = new mongoose.Schema(
    {
        rollno: {
            type: Number,
            required: true,
            unique: true
        },

        name: {
            type: String,
            required: true,
        },
        passwords : {
            type : String,
            required : true
        },

        department: {
            type: String,
            required: true
        },

        academicYear: {
            type: String
        },

        sem: {
            type: Number,
            required: true,
        },
        
        division: {
            type: Number,
            required: true,
        },

        batch: {
            type: String,
            required: true,
        },

        labSub: {
            type: [subObj],
            required: true
        }
    },
    { timestamps: true }
);

const Students = mongoose.model("Students", StudentModel);
module.exports = Students;
