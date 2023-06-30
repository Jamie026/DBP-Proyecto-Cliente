import React from "react";
import { TextField } from "@mui/material";

export const Form = ({ fields, handleSubmit, handleInputChange, title }) => {
    return (
        <form className="formulario" onSubmit={handleSubmit}>
            <h3 className="subtitulo">{title}</h3>
            {fields.map((item) => (
                <TextField margin="normal" fullWidth onChange={handleInputChange} key={item.key} name={item.name} label={item.label} {...item.prop}/>
            ))}
            <button type="submit" className="btn btn-primary w-100 my-2">
                Aceptar
            </button>
        </form>
    );
};