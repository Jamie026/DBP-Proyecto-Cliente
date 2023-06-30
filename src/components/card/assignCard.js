import React from "react";

export const AssignCard = ({ assign }) => {
    return (
        <div className="col-10 col-md-5 card text-center mb-3">
            <div className="card-header">
                {assign.state}
            </div>
            <div className="card-body">
                <h5 className="subtitulo">
                    {assign.name}
                </h5>
                <p className="card-text">
                    {assign.description}
                </p>
                <a href="#" className="btn btn-outline-primary m-1">
                    Gestionar asignación
                </a>
                <a href="#" className="btn btn-outline-danger m-1">
                    Eliminar asignación
                </a>
            </div>
            <div className="card-footer text-muted">Fecha asignación: {assign.date}</div>
        </div>
    );
};
