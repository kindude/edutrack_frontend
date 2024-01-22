import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import axiosInstance from '../apis/axios_init';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-star-with-type'


const Profile: React.FC = () => {
    const [userInfo, setUserInfo] = useState<any>({});
    const [error, setError] = useState<number>();
    let [average, setAverage] = useState<number>();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axiosInstance.get('users/me');
                setUserInfo(response.data);
            } catch (error) {

                const axiosError = error as AxiosError;
                console.log(axiosError.response?.status);
                if (axiosError.response?.status == 403) {
                    setError(axiosError.response?.status);
                }
            }
        };

        const fetchAverageInfo = async () => {
            try {
                let id = localStorage.getItem('id');
                if (id && typeof id === 'string') {
                    id = id.replace(/"/g, '');
                    const response = await axiosInstance.get(`/statistics/average/${id}`);
                    setAverage(response.data);
                    ratingToBase(response.data);
                }
            } catch (error) {
                const axiosError = error as AxiosError;
                console.log(axiosError.response?.status);
                if (axiosError.response?.status === 403) {
                    setError(axiosError.response?.status);
                }
            }
        };

        const ratingToBase = (average: number | undefined) => {
            if (average !== undefined) {
                const newRating = (average * 5) / 100;
                setAverage(newRating);
            }
        };

        const fetchData = async () => {
            await fetchUserInfo();
            await fetchAverageInfo();
        };

        fetchData();
    }, []);




    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete your profile?');
        console.log(confirmDelete);
        if (confirmDelete) {
            try {
                const response = await axiosInstance.delete(`/users/${userInfo.id}`);
                localStorage.clear();
                document.cookie = 'refresh_token' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                console.log('Profile deleted successfully');
                window.location.reload();
            } catch (error) {
                console.error('Error deleting profile', error);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            {error === 403 ? (
                <div className="text-white font-bold p-4 rounded-md border border-red-600 bg-red-500">
                    403 Forbidden
                </div>
            ) : (
                <div className="bg-white shadow-xl p-8 rounded-lg w-96">
                    <div className="flex items-center justify-center mb-8">
                        <img
                            src="https://via.placeholder.com/200"
                            alt="Profile"
                            className="w-32 h-32 rounded-full"
                        />
                    </div>
                    <h1 className="text-4xl font-bold mb-4">
                        {userInfo.first_name} {userInfo.last_name}
                    </h1>
                    <p className="text-gray-600 mb-2">{userInfo.email}</p>
                    <p className="text-gray-600 mb-4">{userInfo.phone_number}</p>
                    <p className="text-gray-600 mb-4">{userInfo.address}</p>

                    <div className="mb-4">
                        <p className="text-gray-600 mb-2">Rating:</p>

                        <div className="flex items-center">
                            <ReactStars
                                value={average}
                                isEdit={false}
                                activeColors={["red", "orange", "#FFCE00", "#9177FF", "#8568FC"]}
                            />
                            <p className="ml-2 mt-3 text-xl font-semibold text-indigo-600">{average}</p>
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <Link
                            to={`/profile/update/${userInfo.id}`}
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all duration-300 no-underline"
                        >
                            Update Profile
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-all duration-300"
                        >
                            Delete Profile
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;