const Students = require("../Models/StudentModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
        // if (!actualPassword) {
        //     return res.json({ success: false, message: "Student not found, Enter a valid Enrollement Number" });
        // }
        // console.log(actualPassword, " ", password);
        // if (password === actualPassword.passwords) {
        //     // dummy token for now (replace with JWT if using auth)
        //     //const token = "fake-token-123"; 
            
        //     const token = jwt.sign({})
        //     return res.json({
        //       success: true,
        //       user: { rollno }, // return user data
        //       token,
        //     });
        //   }
        // else {
        //     return res.json({ success: false, message: "Incorrect Roll No or Password" });
        // }
        //res.json({ success: password === actualPassword.passwords });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { authenticateStudent };
