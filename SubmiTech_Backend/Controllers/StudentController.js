const Students = require("../Models/StudentModel");

const FetchStudentStatus = async (req, res) => {
    try {
        const { rollno } = req.query;
        if (!rollno) return res.status(400).json({ message: "Roll number missing" });

        const student = await Students.findOne({ rollno });
        if (!student) return res.status(404).json({ message: "Student not found" });

        res.json(student);
    } catch (err) {
        console.error("Error in FetchStudentStatus:", err);
        res.status(500).json({ message: "Server error" });
    }
};


module.exports = { FetchStudentStatus };