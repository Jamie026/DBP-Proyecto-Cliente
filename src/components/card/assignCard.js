import React from "react";

export const AssignCard = ({ assign }) => {
    return (
        <section className="col-10 col-md-5 card text-center mb-3">
            <div className="card-header">
                {assign.state}
            </div>
            <div className="card-body">
                <h5 className="subtitulo">
                    {assign.name}
                </h5>
                <p className="card-text my-4">
                    {assign.description}
                </p>
                <a href={"/timer/" + assign.id} className="btn btn-outline-primary mx-2">
                    Gestionar asignación
                </a>
                <a href="#" className="btn btn-outline-danger mx-2">
                    Eliminar asignación
                </a>
            </div>
            <div className="card-footer text-muted">Fecha asignación: {assign.date}</div>
        </section>
    );
};
