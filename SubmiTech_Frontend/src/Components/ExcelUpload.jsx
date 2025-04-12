/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

const ExcelUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    // Handle file selection
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    // Handle the upload and parse of the Excel file
    const handleUpload = async () => {
        if (!file) {
            setMessage("Please select a file.");
            return;
        }

        const reader = new FileReader();
        reader.onload = async (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "binary" });

            // Assume the data is in the first sheet
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            try {
                // Send the parsed data to the backend API to insert it into MongoDB
                const response = await axios.post(
                    "https://your-backend-api-url/students/upload",  // Replace with your backend URL
                    jsonData
                );
                setMessage("File uploaded successfully!");
            } catch (error) {
                setMessage("Error uploading file. Please try again.");
                console.error(error);
            }
        };

        reader.readAsBinaryString(file);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 p-6">
            <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-xl w-full border border-gray-300">
                <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-4">Upload Excel File</h1>
                <div className="mb-4">
                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={handleFileChange}
                        className="px-4 py-2 border rounded-lg"
                    />
                </div>
                <button
                    onClick={handleUpload}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                >
                    Upload File
                </button>
                <div className="mt-4 text-center text-lg text-gray-700">
                    {message && <p>{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default ExcelUpload;
