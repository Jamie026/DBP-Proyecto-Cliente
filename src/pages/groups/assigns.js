import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { checkUser } from "../../scripts/user/scripts";

export const Assigns = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({});

    useEffect(() => {
        (async() =>{
            const userData = await checkUser();
            userData ? setUser(userData) : navigate("/");
        })();
    }, []);

    return (
        <main>
            <LoggedNav />
            <div className="contenedor flex-row align-items-start justify-content-center">
                
            </div>
        </main>
    );
};
