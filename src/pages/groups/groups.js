import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";

import { InputAdornment } from "@mui/material";

import { Form } from "../../components/common/form";
import { LoggedNav } from "../../components/navbar/loggedNav";
import { GroupTable } from "../../components/table/groupsTable";

import { checkUser } from "../../scripts/user/scripts";
import { addGroup, loadGroups } from "../../scripts/group/scripts";
import { checkErrors, reloadTable } from "../../scripts/common/scripts";

const fieldsAdd = [
    { key: "name", name: "name", label: "Nombre", prop: { type: "text" } },
    { key: "password", name: "password", label: "Contraseña", prop: { type: "password" } }
];

const fieldsJoin = [
    { key: "group", name: "group", label: "ID Grupo", prop: { type: "number", InputProps: { startAdornment: (<InputAdornment position="start">#</InputAdornment>) } } },
    { key: "code", name: "code", label: "Contraseña", prop: { type: "password" } }
];

export const GroupData = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({});

    const [rows, setRows] = useState([]);

    const [data, setData] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleRequest = async (e, newGroup, fields) => {
        e.preventDefault();
        data.user = user.id;
        const errors = await addGroup(newGroup, fields, data, setRows);
        if (!checkErrors(errors)) NotificationManager.success("Grupo agregado", "Exito", 2000);
    };

    const handleCreate = (e) => handleRequest(e, true, fieldsAdd);

    const handleJoin = (e) => handleRequest(e, false, fieldsJoin);

    useEffect(() => {
        (async() =>{
            const userData = await checkUser();
            userData ? setUser(userData) : navigate("/");
            reloadTable(loadGroups(userData.id), setRows)
        })();
    }, []);

    return (
        <main>
            <LoggedNav />
            <div className="contenedor flex-row align-items-start justify-content-center">
                <section className="col-10 col-lg-4">
                    <div className="row">
                        <section className="col-lg-12">
                            <Form fields={fieldsAdd} handleSubmit={handleCreate} handleInputChange={handleInputChange} title={"Crear grupo"} />
                        </section>
                        <section className="col-lg-12">
                            <Form fields={fieldsJoin} handleSubmit={handleJoin} handleInputChange={handleInputChange} title={"Unirse a grupo"} />
                        </section>
                    </div>
                </section>
                <section className="col-10 col-lg-7">
                    <GroupTable user_id={user.id} rows={rows} setRows={setRows} />
                </section>
            </div>
        </main>
    );
};