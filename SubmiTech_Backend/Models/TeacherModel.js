const mongoose = require("mongoose");

const TeacherModel = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        },

        email : {
            type : String,
            required :true
        },

        department : {
            type : String,
            required : true
        },

        password : {
            type : String,
            required : true
        },

        Batch : {
            type : [String],
            required : true
        },

        cc : {
            type : String,
            defauit : ""
        }

    },
    {timestamps : true}
);

const Teacher = mongoose.model("Teacher", TeacherModel);
module.exports = Teacher;