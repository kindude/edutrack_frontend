import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you have Axios installed for making requests
import axiosInstance from '../apis/axios_init';
import { useNavigate } from 'react-router-dom';

interface ModuleAddRequest {
    title: string;
    hours_taught: number;
    alias: string;
}

interface AddOrEditModuleProps {
    isEdit: boolean;
    moduleId?: string; // Assuming moduleId is used for editing
}

const AddOrEditModule: React.FC<AddOrEditModuleProps> = ({ isEdit, moduleId }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<ModuleAddRequest>({
        title: '',
        hours_taught: 0,
        alias: '',
    });

    const inputClass = 'appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        try {
            if (isEdit && moduleId) {
                // Make a PUT request to update the module
                const response = await axiosInstance.put(`/api/v1/modules/${moduleId}`, formData);
                console.log('Module updated:', response.data);
            } else {
                // Make a POST request to add a new module
                const response = await axiosInstance.post('/modules/add', formData);
                navigate('/admin/modules');

            }
            // Handle success or any other actions
        } catch (error) {
            console.error('Error:', error);
            // Handle error state or any other actions
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className={inputClass}
                    />
                </label>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Hours Taught:
                    <input
                        type="number"
                        name="hours_taught"
                        value={formData.hours_taught}
                        onChange={handleInputChange}
                        className={inputClass}
                    />
                </label>
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Alias:
                    <input
                        type="text"
                        name="alias"
                        value={formData.alias}
                        onChange={handleInputChange}
                        className={inputClass}
                    />
                </label>
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                {isEdit ? 'Update Module' : 'Add Module'}
            </button>
        </form>
    );
};

export default AddOrEditModule;
