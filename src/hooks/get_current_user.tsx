import axiosInstance from "../apis/axios_init";

const fetchUserInfo = async () => {
    try {
        const response = await axiosInstance.get('users/me');
        return response.data
    } catch (error) {
        return error;
    }
};
export default fetchUserInfo;
