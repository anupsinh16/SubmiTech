const Dstudents = [
    {
        rollno: 101,
        name: "John Doe",
        passwords: "john123",
        department: "Computer Science",
        academicYear: "2024-2025",
        sem: 6,
        division: 1,
        batch: "B1",
        labSub: [
            { labName: "DBMS", checked: true },
            { labName: "OS", checked: false },
            { labName: "CN", checked: true }
        ]
    },
    {
        rollno: 102,
        name: "Alice Smith",
        passwords: "alicePass",
        department: "Computer Science",
        academicYear: "2024-2025",
        sem: 6,
        division: 1,
        batch: "B2",
        labSub: [
            { labName: "AI", checked: true },
            { labName: "ML", checked: true },
            { labName: "CN", checked: false }
        ]
    },
    {
        rollno: 103,
        name: "Bob Johnson",
        passwords: "bobSecure",
        department: "Information Technology",
        academicYear: "2024-2025",
        sem: 5,
        division: 2,
        batch: "B1",
        labSub: [
            { labName: "DBMS", checked: false },
            { labName: "OS", checked: true },
            { labName: "SE", checked: true }
        ]
    },
    {
        rollno: 104,
        name: "Emma Brown",
        passwords: "emma789",
        department: "Electronics",
        academicYear: "2024-2025",
        sem: 4,
        division: 2,
        batch: "B2",
        labSub: [
            { labName: "VLSI", checked: true },
            { labName: "Embedded", checked: false },
            { labName: "DSP", checked: false }
        ]
    },
    {
        rollno: 105,
        name: "Michael Lee",
        passwords: "mikePass",
        department: "Mechanical",
        academicYear: "2024-2025",
        sem: 3,
        division: 1,
        batch: "B3",
        labSub: [
            { labName: "Thermodynamics", checked: true },
            { labName: "Fluid Mechanics", checked: true },
            { labName: "CAD", checked: true }
        ]
    },
    {
        rollno: 106,
        name: "Sophia Wilson",
        passwords: "sophiaSafe",
        department: "Civil",
        academicYear: "2024-2025",
        sem: 5,
        division: 2,
        batch: "B1",
        labSub: [
            { labName: "Structural Analysis", checked: false },
            { labName: "Surveying", checked: true },
            { labName: "Concrete Tech", checked: false }
        ]
    },
    {
        rollno: 107,
        name: "Daniel Garcia",
        passwords: "danSecure",
        department: "Electrical",
        academicYear: "2024-2025",
        sem: 6,
        division: 1,
        batch: "B2",
        labSub: [
            { labName: "Power Systems", checked: true },
            { labName: "Control Systems", checked: false },
            { labName: "Machines", checked: true }
        ]
    },
    {
        rollno: 108,
        name: "Olivia Martinez",
        passwords: "oliviaPass",
        department: "Computer Science",
        academicYear: "2024-2025",
        sem: 4,
        division: 3,
        batch: "B3",
        labSub: [
            { labName: "AI", checked: false },
            { labName: "ML", checked: true },
            { labName: "DBMS", checked: true }
        ]
    },
    {
        rollno: 109,
        name: "Liam Robinson",
        passwords: "liamStrong",
        department: "Information Technology",
        academicYear: "2024-2025",
        sem: 5,
        division: 1,
        batch: "B2",
        labSub: [
            { labName: "CN", checked: true },
            { labName: "OS", checked: true },
            { labName: "DBMS", checked: false }
        ]
    },
    {
        rollno: 110,
        name: "Mia Thompson",
        passwords: "mia123",
        department: "Mechanical",
        academicYear: "2024-2025",
        sem: 6,
        division: 2,
        batch: "B3",
        labSub: [
            { labName: "Automobile", checked: false },
            { labName: "Robotics", checked: false },
            { labName: "Mechatronics", checked: true }
        ]
    }
];

const Dteachers = [
    {
        name: "Dr. Richard Green",
        email: "richard.green@example.com",
        department: "Computer Science",
        password: "teacher123",
        batchesAlloted: [
            { labName: "DBMS", batch: ["B1", "B2"] },
            { labName: "OS", batch: ["B1", "B2"] },
            { labName: "CN", batch: ["B1", "B2"] }
        ],
        cc: "Senior Professor"
    },
    {
        name: "Prof. Laura Johnson",
        email: "laura.johnson@example.com",
        department: "Mechanical",
        password: "mechProf456",
        batchesAlloted: [
            { labName: "Thermodynamics", batch: ["B3"] },
            { labName: "Fluid Mechanics", batch: ["B3"] },
            { labName: "CAD", batch: ["B3"] }
        ],
        cc: "Head of Department"
    }
];

module.exports = { Dstudents, Dteachers };
