import React  from "react";
import { useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";

import { Edit, ExitToApp, Check, Assignment, Close } from "@mui/icons-material";

import { DataTable } from "../common/table";

import { checkErrors, reloadTable } from "../../scripts/common/scripts";
import { loadGroups, outGroup, checkAdmin} from "../../scripts/group/scripts";


export const GroupTable = ({ user_id, rows, setRows }) => {
    const navigate = useNavigate();

    const handleEdit = async (group_id) => {
        const userIsAdmin = await checkAdmin(user_id, group_id);
        userIsAdmin ? navigate("/group/" + group_id) : NotificationManager.warning("No tienes permisos para editar", "Error", 2000);
    };

    const handleDelete = async (group_id) => {
        const errors = await outGroup(user_id, group_id);
        if (!checkErrors(errors)) {
            NotificationManager.warning("Se ha salido del grupo", "Exito", 2000);
            reloadTable(loadGroups(user_id), setRows);
        }
    };

    const handleOpen = (group_id) => navigate("/assign/" + group_id);

    const columns = [
        { field: "id", headerName: "ID", align: "center", headerAlign: "center", width: 100 },
        { field: "name", headerName: "Nombre", align: "center", headerAlign: "center", width: 220 },
        { field: "members", headerName: "Miembros", align: "center", headerAlign: "center", width: 160 },
        { field: "admin", headerName: "Permisos", align: "center", headerAlign: "center", width: 160, renderCell: (params) => (params.value === "Admin" ? <Check /> : <Close />) },
        { field: "actions", headerName: "", sortable: false, align: "center", headerAlign: "center", width: 220, disableColumnMenu: true, renderCell: (params) => (
            <div>
                <button className="btn btn-outline-primary mx-1" title="Ver asignaciones" onClick={() => handleOpen(params.row.id)}>
                    <Assignment />
                </button>
                <button className="btn btn-outline-warning mx-1" title="Editar grupo" onClick={() => handleEdit(params.row.id)}>
                    <Edit />
                </button>
                <button className="btn btn-outline-danger mx-1" title="Salir del grupo" onClick={() => handleDelete(params.row.id)}>
                    <ExitToApp />
                </button>
            </div>
        )}
    ]; 

    return <DataTable rows={rows} columns={columns} title={"Grupos disponibles"} />
};