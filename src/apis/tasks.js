import { https, handleResponse } from "../scripts/common/scripts";

export const tasksByUser = async (user_id) => {
    try {
        const response = await https.get("/tasks/" + user_id);
        return handleResponse(response);
    } catch (error) {
        return false;
    }
};

export const createTask = async (data) => {
    try {
        const response = await https.post("/createTask", data);
        return handleResponse(response);
    } catch (error) {
        return { error: error.response.data.error };
    }
};

export const deleteTask = async (task_id) => {
    try {
        const response = await https.delete("/deleteTask/" + task_id);
        return handleResponse(response);
    } catch (error) {
        return { error: error.response.data.error };
    }
};

export const createAssign = async (data) => {
    try {
        const response = await https.post("/assignTask", data);
        return handleResponse(response);
    } catch (error) {
        return { error: error.response.data.error };
    }
};