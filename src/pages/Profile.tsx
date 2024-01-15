import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import axiosInstance from '../apis/axios_init';

const Profile: React.FC = () => {
    const [userInfo, setUserInfo] = useState<any>({});
    const [error, setError] = useState<number>();

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

        fetchUserInfo();
    }, []);

    return (
        <div>
            {error === 403 ? (
                <div>403 Forbidden </div>
            ) : (
                <div>
                    <h1>User Information</h1>
                    <div>
                        <p>Name: {userInfo.first_name} {userInfo.last_name}</p>
                        <p>Email: {userInfo.email}</p>
                        {/* Display other information as needed */}
                    </div>
                </div>
            )}
        </div>
    );
            };

export default Profile;
