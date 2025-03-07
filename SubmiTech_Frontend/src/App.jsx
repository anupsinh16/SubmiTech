import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import StudentPortal from './Components/StudentPortal';
import TeacherPortal from './Components/TeacherPortal';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<h1 className="text-center text-2xl font-bold p-6">Welcome to SubmiTech</h1>} />
                <Route path="/student" element={<StudentPortal />} />
                <Route path="/teacher" element={<TeacherPortal />} />
                <Route path="*" element={<h1 className="text-center text-red-500 font-bold text-3xl mt-10">404 - Page Not Found</h1>} />
            </Routes> 
        </BrowserRouter>
    );
}

export default App;
