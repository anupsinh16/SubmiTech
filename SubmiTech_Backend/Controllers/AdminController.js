const Students = require("../Models/StudentModel");
const Teachers = require("../Models/TeacherModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    try{
        const {rollno,name,password,department,academicYear,sem,div,batch,labsub} = req.body;
        
        const studExists = await Students.findOne({rollno : rollno});

        if(!studExists){
            const hashedpassword = await bcrypt.hash(password,10);

            const newstud = new Students({
                rollno : rollno,
                name : name,
                passwords : hashedpassword,
                department : department,
                academicYear : academicYear,
                sem : sem,
                division : div,
                batch : batch,
                labSub : labsub,
            });
            

            const savedStud = await newstud.save();

            const token = jwt.sign({studId : newstud._id},"randomsecret");

            return res.status(200).json({
                token : token,
                Student : savedStud,
            });


        }
        else{
            res.status(400).json("Student already exists.");
        }
    }
    catch(err){
        res.status(400).json({message:err.message});
    }


}
const AddNewTeacher = async(req,res) =>{

    try{
        const {name,email,department,password,batchesAlloted,cc} = req.body;
        
        const teacherexists = await Teachers.findOne({email : email});

        if(!teacherexists){
            const hashedpassword = await bcrypt.hash(password,10);

            const newteacher = new Teachers({
                name : name,
                email : email,
                passwords : hashedpassword,
                department : department,
                password : password,
                batchesAlloted : batchesAlloted,
                cc : cc
            });
            

            const savedTeacher = await newteacher.save();

            const token = jwt.sign({teacherid : newteacher._id},"randomsecret");

            return res.status(200).json({
                token : token,
                Teacher : savedTeacher,
            });


        }
        else{
            res.status(400).json("Teacher already exists.");
        }
    }
    catch(err){
        res.status(400).json({message:err.message});
    }

}

module.exports = {FetchAllStudents,FetchAllTeachers,AddNewStudent,AddNewTeacher};