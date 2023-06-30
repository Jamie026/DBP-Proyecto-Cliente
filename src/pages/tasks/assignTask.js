import React, { useState } from "react";
import { NotificationManager } from "react-notifications";

import { Close } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";

import { Form } from "../../components/common/form.js";

import { checkErrors } from "../../scripts/common/scripts.js";
import { addAssign, loadTasks } from "../../scripts/task/scripts.js";

const fields = [
    { key: "group", name: "group", label: "ID Grupo", prop: { type: "number", InputProps: { startAdornment: (<InputAdornment position="start">#</InputAdornment>) } } },
    { key: "task", name: "task", label: "ID Tarea", prop: { type: "number", InputProps: { startAdornment: (<InputAdornment position="start">#</InputAdornment>) } } }
];

export const AssignTask = ({ handleClose, user_id, setRows }) => {
    const [data, setData] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleTask = async (e) => {
        e.preventDefault();
        data.user = user_id;
        const errors = await addAssign(fields, data);
        if (!checkErrors(errors)) {
            NotificationManager.success("Tarea asignada", "Exito", 2000);
            const response = await loadTasks(user_id);
            if (response) setRows(response);
        }
    };

    return (
        <div className="form-overlay">
            <section className="col-10 col-lg-4">
                <button className="btn btn-light float-end" title="Cerrar" onClick={handleClose}>
                    <Close />
                </button>
            </section>
            <section className="col-10 col-lg-4">
                <Form fields={fields} handleSubmit={handleTask} handleInputChange={handleInputChange} title={"Asignación tarea"} />
            </section>
        </div>
    );
};