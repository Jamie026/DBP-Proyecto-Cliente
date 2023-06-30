import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { checkUser } from "../scripts/user/scripts";

import { LoggedNav } from "../components/navbar/loggedNav";

export const LoggedPage = () => {
    const [user, setUser] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        (async() =>{
            const userData = await checkUser();
            userData ? setUser(userData) : navigate("/");
        })();
    }, []);

    return (
        <main>
            <LoggedNav />
            <div className="contenedor container-center">
                <h1 className="text-light titulo animate__animated animate__fadeIn animate__slow">
                    Bienvenido {user.username}
                </h1>
                <h3 className="text-light subtitulo animate__animated animate__fadeIn animate__delay-2s">
                    No pierdas tiempo y empeza a optimar tu tiempo de trabajo
                </h3>
                <a className="btn btn-outline-light" href="/tasks">
                    Gestionar mis tareas
                </a>
            </div>
        </main>
    );
};