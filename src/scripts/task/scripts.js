import moment from "moment";
import { validateFields } from "../common/scripts";
import { createTask, tasksByUser, createAssign, deleteTask, assignsByGroup } from "../../apis/tasks";

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


export const getAssigns = async (group_id) => {
    const data = [];
    const response = await assignsByGroup(group_id);
    if (response){
        const { assigns, tasks } = response.data;
        assigns.map((assign, index) =>
            data.push({
                id: assign.id,
                name: tasks[index].name,
                state: assign.state === 0 ? "No iniciada" : assign.state === 1 ? "En progreso" : "Finalizada",
                description: tasks[index].description === "" ? "Sin descripción" : tasks[index].description,
                date: moment.utc(assign.date).format("DD-MM-YYYY")
            })
        );
    }
    return data;
};