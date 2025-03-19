const mongoose = require("mongoose");

const AdminModel = new mongoose.Schema(
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

        password : {
            type : String,
            required : true
        },

    },
    {timestamps : true}
);

const Admin = mongoose.model("Admin", AdminModel);
module.exports = Admin;