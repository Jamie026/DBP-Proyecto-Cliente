import { validateFields } from "../common/scripts";
import { loginUser, registerUser, authenticateUser, logoutUser, getUserByID } from "../../apis/users";

export const initUser = async (fields, data, registered) => {
    let errors = validateFields(fields, data);
    if (errors.length > 0) return errors;
    let response = registered ? await loginUser(data) : await registerUser(data);
    if (response.error) return [response.error];
    else return [];
};

export const checkUser = async () => {
    const response = await authenticateUser();
    if (!response.error) return response.data;
    else return null;
};

export const endSession = async () => {
    const response = await logoutUser();
    if (response.error) return [response.error];
    else return [];
};

export const userData = async (user_id) => {
    const response = await getUserByID(user_id);
    if (response.error) return [response.error];
    else return response.data;
};