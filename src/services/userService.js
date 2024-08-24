import axios from "axios";

const baseUrl = 'https://security-backend.vercel.app/users';
const getToken = () => `bearer ${window.localStorage.getItem('token')}`;

const register = (userData) => {
    return axios.post(`${baseUrl}/register`, userData);

}
const login = (loginCredentials) => {
    return axios.post(`${baseUrl}/login`, loginCredentials)
};

const lockAccount = (email) => {
    return axios.post(`${baseUrl}/lockAccount`, email);
}

const passwordNeedChange = () => {
    return axios.get(`${baseUrl}/passwordNeedChange`, {
        headers: {Authorization: getToken()}
    });
}

const getUser = () => {
    return axios.get(`${baseUrl}`, {
        headers: {
            Authorization: getToken()
        }

    });
};

const deleteAccount = () => {
    return axios.delete(`${baseUrl}`, {
        headers: {
            Authorization: getToken()
        }
    });
};

const changeName = (newName) => {
    return axios.put(`${baseUrl}`, newName, {
        headers: {
            Authorization: getToken()
        }
    });

};

const changePassword = (newPassword) => {
    return axios.put(`${baseUrl}/changePassword`, newPassword, {
        headers: {
            Authorization: getToken()
        }
    });
};


// upload file or image for profile
const uploadProfileImage = (selectedImageFile) => {
    const formData = new FormData();
    formData.append('photo', selectedImageFile);

    const config = {
        headers: {
            Authorization: getToken(),
            'Content-Type': 'multipart/form-data'
        }
    };

    // return axios.post('https://security-backend.vercel.app/uploads', formData, config);
    return axios.post('https://security-backend.vercel.app/uploads', formData, config);

};
// upload file or image for profile
const uploadProductImage = (productId, selectedImageFile) => {
    const formData = new FormData();
    formData.append('photo', selectedImageFile);

    const config = {
        headers: {
            Authorization: getToken(),
            'Content-Type': 'multipart/form-data'
        }
    };

    // return axios.post(`https://localhost:3005/uploads/${productId}`, formData, config);
    return axios.post(`https://security-backend.vercel.app/uploads/${productId}`, formData, config);

};

const getAllPurchaseProducts = () => {
    // return axios.get('https://localhost:3005/purchase', {
        return axios.get('https://security-backend.vercel.app/purchase', {

        headers: {
            Authorization: getToken()
        }

    });
};

const unlockAccount = (userId) => {
    // return axios.post(`https://security-backend.vercel.app/admin/unlockAccount/${userId}`, {});
    return axios.post(`https://security-backend.vercel.app/admin/unlockAccount/${userId}`, {});
}

const getLogs = async () => {
    try {
        const response = await axios.get(`https://security-backend.vercel.app/admin/logs`, {
            headers: {
                Authorization:getToken(), // Assuming JWT for auth
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching logs:', error);
        throw error;
    }
};

const sendOtp = (email) => {
    console.log("this is user service and email is", email)
    return axios.post(`${baseUrl}/send_otp`, { email });
};

const userServices = {
    login,
    lockAccount,
    passwordNeedChange,
    getUser,
    register,
    deleteAccount,
    changeName,
    changePassword,
    uploadProductImage,
    uploadProfileImage,
    getAllPurchaseProducts,
    unlockAccount,getLogs,
sendOtp
}


export default userServices;
