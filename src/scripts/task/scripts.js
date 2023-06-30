import { validateFields } from "../common/scripts";
import { createTask, tasksByUser, createAssign, deleteTask } from "../../apis/tasks";

export const addTask = async (fields, data, setRows) => {
    let errors = validateFields(fields, data);
    if (errors.length > 0) return errors;
    let response = await createTask(data);
    if (response.error) return [response.error];
    else {
        setRows((prevRows) => [
            ...prevRows,
            {
                id: response.data.id,
                name: data.name,
                description: data.description,
                assigns: 0
            },
        ]);
        return [];
    }
};

export const removeTask = async (task_id) => {
    const response = await deleteTask(task_id);
    if (response.error) return [response.error];
    else return [];
};

export const loadTasks = async (user_id) => {
    const newRows = [];
    const response = await tasksByUser(user_id);
    if (response) {
        const { tasks, assigns } = response.data;
        tasks.map((task, index) =>
            newRows.push({
                id: task.id,
                name: task.name,
                description: task.description,
                assigns: assigns[index]
            })
        );
    }
    return newRows;
};

export const addAssign = async (fields, data) => {
    let errors = validateFields(fields, data);
    if (errors.length > 0) return errors;
    let response = await createAssign(data);
    if (response.error) return [response.error];
    else return [];
};