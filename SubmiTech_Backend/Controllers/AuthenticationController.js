const Students = require("../Models/StudentModel");
const Teacher = require("../Models/TeacherModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../Models/AdminModel");


const authenticateStudent = async (req, res) => {
    try {
        const { rollno, password } = req.query;

        //const actualPassword = await Students.findOne({ rollno }, { passwords: 1, _id: 0 });
        const stud = await Students.findOne({rollno});

        if(!stud){
            return res.json({
                success : false,
                message : "Student not found, Enter valid credentials",
            });
        }

        let ismatch = false;
        if(password === stud.passwords){
            ismatch = true;
        }

                //Use following line after hashing passwords in db
        // const ismatch = await bcrypt.compare(password,stud.passwords);  

        if(ismatch){
            const token = jwt.sign(
                {rollno : stud.rollno, id : stud._id},"RandomSecretKey"
            );

            res.status(200).json({
                success : true,
                user : {
                    rollno : stud.rollno,
                    name : stud.name,
                },
                token,
            });
        }
        else{
            res.json({
                success : false,
                message : "Incorrect Credentials",
            });
        }
        

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

const authenticateTeacher = async (req, res) => {
    try {
        const { email, password } = req.query;

        //const actualPassword = await Students.findOne({ rollno }, { passwords: 1, _id: 0 });
        const teacher = await Teacher.findOne({email});

        if(!Teacher){
            return res.json({
                success : false,
                message : "Teacher not found, Enter valid credentials",
            });
        }

        let ismatch = false;
        if(password === teacher.password){
            ismatch = true;
        }

                //Use following line after hashing passwords in db
        // const ismatch = await bcrypt.compare(password,stud.passwords);  

        if(ismatch){
            const token = jwt.sign(
                {email : teacher.email, id : teacher._id},"RandomSecretKey"
            );

            res.status(200).json({
                success : true,
                user : {
                    email : teacher.email,
                    name : teacher.name,
                },
                token,
            });
        }
        else{
            res.json({
                success : false,
                message : "Incorrect Credentials",
            });
        }
       

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

const authenticateAdmin= async (req, res) => {
    try {
        const { email, password } = req.query;

        //const actualPassword = await Students.findOne({ rollno }, { passwords: 1, _id: 0 });
        const admin = await Admin.findOne({email});

        if(!admin){
            return res.json({
                success : false,
                message : "Admin not found, Enter valid credentials",
            });
        }

        let ismatch = false;
        if(password === admin.password){
            ismatch = true;
        }

                //Use following line after hashing passwords in db
        // const ismatch = await bcrypt.compare(password,stud.passwords);  

        if(ismatch){
            const token = jwt.sign(
                {email : admin.email, id : admin._id},"RandomSecretKey"
            );

            res.status(200).json({
                success : true,
                user : {
                    email : admin.email,
                    name : admin.name,
                },
                token,
            });
        }
        else{
            res.json({
                success : false,
                message : "Incorrect Credentials",
            });
        }
       

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};


module.exports = { authenticateStudent,authenticateTeacher ,authenticateAdmin};
