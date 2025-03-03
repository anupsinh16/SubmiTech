const mongoose = require("mongoose");

const labObj = {
    labName:String,
    batch:[String]
}

const TeacherModel = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        },

        email : {
            type : String,
            required :true,
            unique : true
        },

        department : {
            type : String,
            required : true
        },

        password : {
            type : String,
            required : true
        },

        batchesAlloted : {
            type : [labObj],
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