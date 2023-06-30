import React from "react";
import { NotificationManager } from "react-notifications";

import { Delete } from '@mui/icons-material';

import { DataTable } from "../common/table";

import { loadTasks, removeTask } from "../../scripts/task/scripts";
import { checkErrors, reloadTable } from "../../scripts/common/scripts";

export const TaskTable = ({ user_id, rows, setRows }) => {
    const handleDelete = async (task_id) => {
        const errors = await removeTask(task_id);
        if (!checkErrors(errors)){
            NotificationManager.warning("Tarea finalizada", "Exito", 2000);
            reloadTable(loadTasks(user_id), setRows)
        }
    };

    const columns = [
        { field: "id", headerName: "ID", align: "center", headerAlign: "center", width: 100 },
        { field: "name", headerName: "Nombre", align: "center", headerAlign: "center", width: 220 },
        { field: "description", headerName: "Descripción", align: "center", headerAlign: "center", width: 255 },
        { field: "assigns", headerName: "N° Asignaciones", align: "center", headerAlign: "center", width: 210 },
        { field: "actions", headerName: "", sortable: false, align: "center", headerAlign: "center", width: 80, disableColumnMenu: true, renderCell: (params) => (
            <button className="btn btn-outline-danger" title="Eliminar tarea" onClick={() => handleDelete(params.row.id)}>
                <Delete />
            </button>
        )}
    ];

    return <DataTable rows={rows} columns={columns} title={"Tareas disponibles"} />
};