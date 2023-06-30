import React from "react";
import { NotificationManager } from "react-notifications";

import { ExitToApp, Close, Check, AddModerator, RemoveModerator } from "@mui/icons-material";

import { DataTable } from "../common/table";

import { reloadTable, checkErrors } from "../../scripts/common/scripts";
import { loadMembers, changeAdmin, outGroup } from "../../scripts/group/scripts";

export const MembersTable = ({ user_id, group_id, rows, setRows }) => {
    const handleRequest = async (member_id, group_id, admin) => {
        const errors = await changeAdmin(member_id, group_id, admin);
        if (!checkErrors(errors)) {
            NotificationManager.warning("Privilegios del usuario modificados", "Aviso", 2000);
            reloadTable(loadMembers(group_id, user_id), setRows);
        }
    };

    const handleGive = (member_id) => handleRequest(member_id, group_id, true);

    const handleRemove = (member_id) => handleRequest(member_id, group_id, false);

    const handleOut = async (member_id) => {
        const errors = await outGroup(member_id, group_id);
        if (!checkErrors(errors)) {
            NotificationManager.warning("Miembro expulsado", "Aviso", 2000);
            reloadTable(loadMembers(group_id, user_id), setRows);
        }
    };

    const columns = [
        { field: "id", headerName: "ID", align: "center", headerAlign: "center", width: 100 },
        { field: "name", headerName: "Nombre", align: "center", headerAlign: "center", width: 210 },
        { field: "email", headerName: "Correo", align: "center", headerAlign: "center", width: 240 },
        { field: "admin", headerName: "Permisos", align: "center", headerAlign: "center", width: 160, renderCell: (params) => (params.value === "Admin" ? <Check /> : <Close />) },
        { field: "actions", headerName: "", sortable: false, align: "center", headerAlign: "center", width: 155, disableColumnMenu: true, renderCell: (params) => (
            <div>
                { params.value === "Admin" ? 
                    (<button title="Quitar privilegios" onClick={() => handleRemove(params.row.id)} className="btn btn-outline-warning mx-1"><RemoveModerator /> </button>) : 
                    (<button title="Otorgar privilegios" onClick={() => handleGive(params.row.id)} className="btn btn-outline-primary mx-1"><AddModerator /></button>)
                }  
                <button className="btn btn-outline-danger m-1" title="Expulsar miembro" onClick={() => handleOut(params.row.id)}>
                    <ExitToApp />
                </button>
            </div>
        )}
    ];   

    return <DataTable rows={rows} columns={columns} title={"Miembros"} />;
};