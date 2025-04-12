const mongoose = require("mongoose");

const subObj = {
    labName: String,
    checked: Boolean
};

const labAttendanceObj = {
    labName: String,
    attendance: {
        type: Number,
        default: 0
    }
};

const extraAssignmentObj = {
    labName: {
        type: String,
        required: true
    },
    reason: String,
    description: String,
    dateAssigned: {
        type: Date,
        default: Date.now
    }
};

const StudentModel = new mongoose.Schema(
    {
        rollno: {
            type: Number,
            required: true,
            unique: true
        },

        name: {
            type: String,
            required: true
        },

        passwords: {
            type: String,
            required: true
        },

        department: {
            type: String,
            required: true
        },

        academicYear: {
            type: String
        },

        sem: {
            type: Number,
            required: true
        },

        division: {
            type: Number,
            required: true
        },

        batch: {
            type: String,
            required: true
        },

        labSub: {
            type: [subObj],
            required: true
        },

        attendance: {
            type: Number,
            default: 0
        },

        overallAttendance: {
            type: Number,
            default: 0
        },

        labWiseAttendance: {
            type: [labAttendanceObj],
            default: []
        },

        extraAssignments: {
            type: [extraAssignmentObj],
            default: []
        }
    },
    { timestamps: true }
);

const Students = mongoose.model("Students", StudentModel);
module.exports = Students;
