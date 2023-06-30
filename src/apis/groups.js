import { https, handleResponse } from "../scripts/common/scripts";

export const groupsByUser = async (user_id) => {
    try {
        const response = await https.get("/groups/" + user_id);
        return handleResponse(response);
    } catch (error) {
        return false;
    }
};

export const createGroup = async (data) => {
    try {
        const response = await https.post("/createGroup", data);
        return handleResponse(response);
    } catch (error) {
        return { error: error.response.data.error };
    }
};

export const joinGroup = async (data) => {
    try {
        const response = await https.post("/joinGroup", data);
        return handleResponse(response);
    } catch (error) {
        return { error: error.response.data.error };
    }
};

export const membersByGroup = async (group_id) => {
    try {
        const response = await https.get("/members/" + group_id);
        return handleResponse(response);
    } catch (error) {
        return false;
    }
};

export const checkMemberAdmi = async (user_id, group_id) => {
    try {
        const response = await https.get("/checkMember/" + group_id + "/" + user_id);
        return handleResponse(response);
    } catch (error) {
        return { error: error.response.data.error };
    }
};

export const updateGroupData = async (data) => {
    try {
        const response = await https.put("/updateGroupData", data);
        return handleResponse(response);
    } catch (error) {
        return { error: error.response.data.error };
    }
};

export const updateMemberAdmin = async (data) => {
    try {
        const response = await https.put("/updateAdminMember", data);
        return handleResponse(response);
    } catch (error) {
        return { error: error.response.data.error };
    }
};

export const deleteMember = async (user_id, group_id) => {
    try {
        const response = await https.delete("/deleteMember/" + group_id + "/" + user_id);
        return handleResponse(response);
    } catch (error) {
        return { error: error.response.data.error };
    }
};