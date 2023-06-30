import { https, handleResponse } from "../scripts/common/scripts";

export const getUserByID = async (user_id) => {
    try {
        const response = await https.get("/users/" + user_id);
        return handleResponse(response);
    } catch (error) {
        return { error: error.response.data.result.error };
    }
};

export const authenticateUser = async () => {
    try {
        const response = await https.get("/@me");
        return handleResponse(response);
    } catch (error) {
        return { error: error.response.data.result.error };
    }
};

export const registerUser = async (data) => {
    try {
        const response = await https.post("/signup", data);
        return handleResponse(response);
    } catch (error) {
        return { error: error.response.data.result.error };
    }
};

export const loginUser = async (data) => {
    try {
        const response = await https.post("/login", data);
        return handleResponse(response);
    } catch (error) {
        console.log(error);
        return { error: error.response.data.result.error };
    }
};

export const logoutUser = async () => {
    try {
        const response = await https.get("/logout");
        return handleResponse(response);
    } catch (error) {
        return { error: error.response.data.result.error };
    }
};