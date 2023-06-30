import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";

import { initUser } from "../../scripts/user/scripts";
import { checkErrors } from "../../scripts/common/scripts";

import { Form } from "../../components/common/form.js";
import { HomeNav } from "../../components/navbar/homeNav.js";

const fields = [
    { key: "name", name: "name", label: "Nombre", prop: { type: "text" } },
    { key: "username", name: "username", label: "Usuario", prop: { type: "text" } },
    { key: "password", name: "password", label: "Contraseña", prop: { type: "password" } },
    { key: "email", name: "email", label: "Email", prop: { type: "email" } },
    { key: "birthDate", name: "birthDate", prop: { type: "date" } }
];

export const Register = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleUser = async (e) => {
        e.preventDefault();
        const errors = await initUser(fields, data, false);
        if (!checkErrors(errors)){
            NotificationManager.success("Redirigiendo...", "Registro exitoso", 2000);
            setTimeout(() => navigate("/dashboard"), 2000);
        }
    };

    return (
        <main>
            <HomeNav />
            <div className="contenedor">
                <section className="col-10 col-lg-4">
                    <Form fields={fields} handleSubmit={handleUser} handleInputChange={handleInputChange} title={"Nuevo usuario"} />
                </section>
            </div>
        </main>
    );
};