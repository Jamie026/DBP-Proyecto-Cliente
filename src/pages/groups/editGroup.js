import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Form } from "../../components/common/form";
import { AlertCard } from "../../components/common/alertCard";
import { LoggedNav } from "../../components/navbar/loggedNav";
import { MembersTable } from "../../components/table/membersTable";

import { checkUser } from "../../scripts/user/scripts";
import { loadMembers, checkAdmin } from "../../scripts/group/scripts";
import { reloadTable } from "../../scripts/common/scripts";

const fields = [
    { key: "name", name: "name", label: "Nombre", prop: { type: "text" } },
    { key: "password", name: "passsword", label: "Contraseña", prop: { type: "password" } }
];

export const EditGroup = () => {
    const navigate = useNavigate();

    const { group_id } = useParams();

    const [user, setUser] = useState({});

    const [rows, setRows] = useState([]);

    const [data, setData] = useState({});

    const [showAlert, setShowAlert] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
    };

    const openAlert = () => setShowAlert(true);

    const closeAlert = () => setShowAlert(false);

    const handleUpdate = async () => {};

    const handleDelete = async () => {};

    useEffect(() => {
        (async() =>{
            const userData = await checkUser();
            userData ? setUser(userData) : navigate("/");
            const userIsAdmin = await checkAdmin(userData.id, group_id);
            userIsAdmin ? reloadTable(loadMembers(group_id, userData.id), setRows) : navigate("/groups");
        })();
    }, []);

    return (
        <main>
            <LoggedNav />
            <div className="contenedor flex-row align-items-start justify-content-center">
                <section className="col-10 col-lg-4">
                    <div className="row">
                        <section className="col-lg-12">
                            <Form fields={fields} handleSubmit={handleUpdate} handleInputChange={handleInputChange} title={"Nuevos datos"} />
                        </section>
                        <section className="col-lg-12">
                            <button className="btn btn-outline-light w-100" onClick={openAlert}>
                                Eliminar grupo
                            </button>
                        </section>
                    </div>
                </section>
                <section className="col-10 col-lg-7">
                    <MembersTable user_id={user.id} group_id={group_id} rows={rows} setRows={setRows} />
                </section>
            </div>
            {showAlert && (<AlertCard handleClose={closeAlert} handleConfirm={handleDelete} text={<div>Seguro que desea eliminar el grupo?<br/>Se perderán todos los datos.</div>} />)}
        </main>
    );
};