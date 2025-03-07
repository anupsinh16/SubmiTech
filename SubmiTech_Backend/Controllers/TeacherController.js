const Teachers = require("../Models/TeacherModel");
const Students = require("../Models/StudentModel");

const FetchTeacherInfo = async(req, res) => {
    try{
        const {email} = req.query;

        const teacher = await Teachers.findOne({ email });
        res.status(200).json(teacher);
        // console.log(teacher);

    }
    catch(err){
        res.status(400).json({message : err.message});
    }
}

const UpdateStatus = async (req, res) => {
    try {
        const { rollno, labName } = req.body;

        const student = await Students.findOne({ rollno, "labSub.labName": labName });

        if (!student) {
            return res.status(404).json({ message: "Student not found or lab not assigned" });
        }

        // Find the lab inside labSub and toggle its checked value
        const updatedStudent = await Students.findOneAndUpdate(
            { rollno, "labSub.labName": labName },
            { $set: { "labSub.$.checked": !student.labSub.find(lab => lab.labName === labName).checked } },
            { new: true }
        );

        res.status(200).json({ message: "Status toggled successfully", student: updatedStudent });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const FetchStudentList = async(req,res) => {
    try{
        const{batch} = req.query;

        const studentList = await Students.find({"batch":batch});

        res.status(200).json(studentList);
    }
    catch(err){
        res.status(400).json({message : err.message});
    }
}

module.exports = { FetchTeacherInfo, UpdateStatus , FetchStudentList};


