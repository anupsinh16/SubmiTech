const Students = require("../Models/StudentModel");

const FetchStudentStatus = async (req,res) => {
    try{
        const {rollno} = req.body;

        const student = await Students.findOne({ rollno: rollno });
        //console.log(student);
        res.status(200).json({message : "successfully fetched student"});
        
    }
    catch(err){
        res.status(404).json({message : err.message});
    }
}

module.exports = { FetchStudentStatus };