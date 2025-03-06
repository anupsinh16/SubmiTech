import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentPortal = () => {
    const [StudData, setStudData] = useState(null);

    useEffect(() => {
        const FetchStudData = async () => {
            try {
                const response =await axios.get("http://localhost:1817/stud/student", {
                    params: { rollno : 105 },
                })
                
                console.log(response.data);  // Check API response
                setStudData(response.data);  // Update state
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
        FetchStudData();
    }, []);

    return (
        <>
            {StudData ?  <pre>
                <h1>{`Welcome ${StudData.name}`}</h1>{JSON.stringify(StudData, null, 2)}
            </pre> : <p>Loading...</p>}
            


        </>
    );
};

export default StudentPortal;
