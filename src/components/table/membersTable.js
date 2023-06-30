import React from "react";
import { NotificationManager } from "react-notifications";

import { ExitToApp, Check, Clear, Close } from "@mui/icons-material";

import { DataTable } from "../common/table";

import { reloadTable, checkErrors } from "../../scripts/common/scripts";
import { loadMembers, changeAdmin, outGroup, checkAdmin } from "../../scripts/group/scripts";

export const MembersTable = ({ user_id, group_id, rows, setRows }) => {
    const handleRequest = async (member_id, group_id, admin) => {
        const isAdmin = await checkAdmin(user_id, group_id);
        if (isAdmin){
            const errors = await changeAdmin(member_id, group_id, admin);
            if (!checkErrors(errors)) {
                NotificationManager.warning("Privilegios del usuario modificados", "Exito", 2000);
                reloadTable(loadMembers(group_id), setRows);
            }
        }
    };

    const handleGive = (member_id) => handleRequest(member_id, group_id, true);

    const handleRemove = (member_id) => handleRequest(member_id, group_id, false);

    const handleOut = async (member_id) => {
        const isAdmin = await checkAdmin(user_id, group_id);
        if (isAdmin){
            const errors = await outGroup(member_id, group_id);
            if (!checkErrors(errors)) {
                NotificationManager.warning("Miembro expulsado", "Exito", 2000);
                reloadTable(loadMembers(group_id), setRows);
            }
        }
    };

    const columns = [
        { field: "id", headerName: "ID", align: "center", headerAlign: "center", width: 100 },
        { field: "name", headerName: "Nombre", align: "center", headerAlign: "center", width: 210 },
        { field: "email", headerName: "Correo", align: "center", headerAlign: "center", width: 240 },
        { field: "admin", headerName: "Permisos", align: "center", headerAlign: "center", width: 160, renderCell: (params) => (params.value === "Admin" ? <Check /> : <Close />) },
        { field: "actions", headerName: "", sortable: false, align: "center", headerAlign: "center", width: 155, disableColumnMenu: true, renderCell: (params) => (
            <div>
                <button title={params.value === "Admin" ? "Quitar privilegios" : "Otorgar privilegios"} onClick={() => params.value === "Admin" ? handleRemove(params.row.id) : handleGive(params.row.id)} className={params.value === "Admin" ? "btn btn-outline-warning mx-1" : "btn btn-outline-primary mx-1"}>
                    {params.value === "Admin" ? <Clear /> : <Check />}
                </button>
                <button className="btn btn-outline-danger mx-1" title="Expulsar miembro" onClick={() => handleOut(params.row.id)}>
                    <ExitToApp />
                </button>
            </div>
        )}
    ];   

    return <DataTable rows={rows} columns={columns} title={"Miembros"} />;
};