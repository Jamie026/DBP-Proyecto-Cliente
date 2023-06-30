import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";

import { LoggedNav } from "../../components/navbar/loggedNav";
import { AssignCard } from "../../components/card/assignCard";

import { checkUser } from "../../scripts/user/scripts";
import { getAssigns } from "../../scripts/task/scripts";

export const Assigns = () => {
    const navigate = useNavigate();

    const { group_id } = useParams();

    const [user, setUser] = useState({});

    const [assigns, setAssigns] = useState([]);

    useEffect(() => {
        (async() =>{
            const userData = await checkUser();
            userData ? setUser(userData) : navigate("/");
            const assignsData = await getAssigns(group_id);
            assignsData.length === 0 ? NotificationManager.warning("No hay asignaciones en este grupo", "Alerta", 2000) : setAssigns(assignsData);
        })();
    }, []);

    return (
        <main>
            <LoggedNav />
            <div className="contenedor flex-row align-items-start justify-content-center">
                {assigns.map((item) => (
                    <AssignCard key={item.name} assign={item} />
                ))}                
            </div>
        </main>
    );
};
