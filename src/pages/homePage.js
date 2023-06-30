import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";

import { Form } from "../components/common/form.js";
import { HomeNav } from "../components/navbar/homeNav.js";

import { initUser } from "../scripts/user/scripts";
import { checkErrors } from "../scripts/common/scripts";

const fields = [
    {key: "username",name: "username",label: "Usuario",prop: { type: "text" } },
    {key: "password",name: "password",label: "Contraseña",prop: { type: "password" } }
];

export const HomePage = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleUser = async (e) => {
        e.preventDefault();
        const errors = await initUser(fields, data, true);
        if (!checkErrors(errors)){
            NotificationManager.success("Redirigiendo...", "Logeo exitoso", 2000);
            setTimeout(() => navigate("/dashboard"), 2000);
        }
    };

    return (
        <main>
            <HomeNav />
            <div className="contenedor container-center flex-row justify-content-around">
                <section className="col-10 col-lg-5">
                    <h1 className="text-light titulo animate__animated animate__fadeIn animate__slow">
                        Te damos la bienvenida
                    </h1>
                    <h3 className="text-light subtitulo animate__animated animate__fadeIn animate__delay-2s">
                        ¿Eres nuevo?
                    </h3>
                    <a className="btn btn-outline-light w-100" href="/register">
                        Registrate
                    </a>
                </section>
                <section className="col-10 col-lg-5">
                    <Form fields={fields} handleSubmit={handleUser} handleInputChange={handleInputChange} title={"Iniciar de Sesión"} />
                </section>
            </div>
        </main>
    );
};