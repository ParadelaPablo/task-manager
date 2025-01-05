import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});


axiosInstance.interceptors.request.use((request) => {
    console.log("Starting Request", request);
    return request;
});

axiosInstance.interceptors.response.use(
    (response) => {
        console.log("Response:", response);
        return response;
    },
    (error) => {
        console.error("Error Response:", error.response);
        return Promise.reject(error);
    }
);

export default axiosInstance;
