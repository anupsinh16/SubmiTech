/* eslint-disable no-unused-vars */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import NewNavbar from './Components/NewNavbar';
import StudentPortal from './Components/StudentPortal';
import TeacherPortal from './Components/TeacherPortal';
import TeacherPortal2 from './Components/TeacherPortal2';
import HomePage from './Components/Home';
import StudentLogin from './Components/StudentLogin';
import TeacherLogin from './Components/TeacherLogin';
import AdminPortal from './Components/AdminPortal';
import AdminLogin from './Components/AdminLogin';
import ExcelUpload from './Components/ExcelUpload';

function App() {
    return (
        <BrowserRouter>
            {/* <Navbar /> */}
            <NewNavbar/>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/student-portal" element={<StudentPortal />} />
                <Route path='/student' element={<StudentLogin/>}/>
                <Route path='/teacher' element={<TeacherLogin/>}/>
                <Route path="/teacher-portal" element={<TeacherPortal />} />
                <Route path="/teacher-portal2" element={<TeacherPortal2 />} />
                <Route path="/admin" element={<AdminLogin/>} />
                <Route path="/admin-portal" element={<AdminPortal/>} />
                {/* <Route path="/add-excel" element={<ExcelUpload/>} /> */}
                {/* <Route path="/admin" element={<ExcelUpload/>} /> */}
                
                <Route path="*" element={<h1 className="text-center text-red-500 font-bold text-3xl mt-10">404 - Page Not Found</h1>} />
            </Routes> 
        </BrowserRouter>
    );
}

export default App;
