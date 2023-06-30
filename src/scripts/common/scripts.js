import { useEffect } from "react";
import { checkUser } from "../user/scripts";
import { NotificationManager } from "react-notifications";
import axios from "axios";

export const https = axios.create({
    baseURL: "http://127.0.0.1:5000",
    withCredentials: true,
});

export const reloadTable = async (action, setRows) =>{
    const response = await action;
    if (response) setRows(response);
}

export const useGetUserData = (navigate, setUser) => {
    useEffect(() => {
        const fetchData = async () => {
            const response = await checkUser();
            if (response) setUser(response);
            else navigate("/");
        };
        fetchData();
    }, [navigate, setUser]);
};

export const validateFields = (fields, data) => {
    const errors = [];
    fields.forEach((field) => {
        const { name, label } = field;
        const value = data[name] || "";
        if (!value.trim()) errors.push("El campo " + label.toLowerCase() + " es obligatorio");
    });
    return errors;
};

export const handleResponse = (response) => {
    if (response.status === 200) return { data: response.data, error: null };
    else throw new Error("Error: " + response.status);
};

export const checkErrors = (errors) => {
    if (errors.length > 0) {
        errors.map((error) => NotificationManager.error(error, "Error", 3000));
        return true;
    } else return false;
};