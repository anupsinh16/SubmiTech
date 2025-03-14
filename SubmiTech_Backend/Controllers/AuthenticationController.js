const Students = require("../Models/StudentModel");

const authenticateStudent = async (req, res) => {
    try {
        const { rollno, password } = req.query;

        const actualPassword = await Students.findOne({ rollno }, { passwords: 1, _id: 0 });

        if (!actualPassword) {
            return res.json({ success: false, message: "Student not found, Enter a valid Enrollement Number" });
        }
        console.log(actualPassword, " ", password);

        res.json({ success: password === actualPassword.passwords });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { authenticateStudent };
