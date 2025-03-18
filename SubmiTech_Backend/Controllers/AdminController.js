const Students = require("../Models/StudentModel");
const Teachers = require("../Models/TeacherModel");

const FetchAllStudents = async(req,res) =>{
    try{
        const students = await Students.find();
        return res.json(students);
    }
    catch(err){
        res.json({message:err.message})
    }
}
const FetchAllTeachers = async(req,res) =>{
    try{
        const teachers = await Teachers.find();
        return res.json(teachers);
    }
    catch(err){
        res.json({message:err.message})
    }
}
const AddNewStudent = async(req,res) =>{
    
}
const AddNewTeacher = async(req,res) =>{

}

module.exports = {FetchAllStudents,FetchAllTeachers,AddNewStudent,AddNewTeacher};