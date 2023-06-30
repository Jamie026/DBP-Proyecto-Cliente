import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";

import { AssignTask } from "./assignTask";
import { Form } from "../../components/common/form";
import { LoggedNav } from "../../components/navbar/loggedNav";
import { TaskTable } from "../../components/table/tasksTable";

import { checkUser } from "../../scripts/user/scripts";
import { addTask, loadTasks } from "../../scripts/task/scripts";
import { checkErrors, reloadTable } from "../../scripts/common/scripts";

const fields = [
    { key: "name", name: "name", label: "Nombre", prop: { type: "text" } },
    { key: "description", name: "description", label: "Descripción", prop: { type: "text", multiline: true, rows: 4 } }
];

export const TaskData = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({});

    const [user, setUser] = useState({});

    const [rows, setRows] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const openForm = () => setShowForm(true);

    const closeForm = () => setShowForm(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleTask = async (e) => {
        e.preventDefault();
        data.user = user.id;
        const errors = await addTask(fields, data, setRows);
        if (!checkErrors(errors)) NotificationManager.success("Tarea creada", "Exito", 2000);
    };

    useEffect(() => {
        (async() =>{
            const userData = await checkUser();
            userData ? setUser(userData) : navigate("/");
            reloadTable(loadTasks(userData.id), setRows);
        })();
    }, []);

    return (
        <main>
            <LoggedNav />
            <div className="contenedor flex-row align-items-start justify-content-center">
                <section className="col-10 col-lg-4">
                    <div className="row">
                        <section className="col-lg-12">
                            <Form fields={fields} handleSubmit={handleTask} handleInputChange={handleInputChange} title={"Crear Tarea"} />
                        </section>
                        <section className="col-lg-12">
                            <button className="btn btn-outline-light w-100" onClick={openForm}>
                                Asignar tarea a grupo
                            </button>
                        </section>
                    </div>
                </section>
                <section className="col-10 col-lg-7">
                    <TaskTable user_id={user.id} rows={rows} setRows={setRows} />
                </section>
            </div>
            {showForm && (<AssignTask handleClose={closeForm} user_id={user.id} setRows={setRows} />)}
        </main>
    );
}