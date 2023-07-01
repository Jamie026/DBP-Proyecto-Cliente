import * as React from "react";
import { createTheme, useMediaQuery, Slide, Dialog } from "@mui/material";

export const AlertCard = ({ handleClose, handleConfirm, text }) => {
    const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

    const theme = createTheme();

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <div>
            <Dialog fullScreen={fullScreen} keepMounted TransitionComponent={Transition} open={true} onClose={handleClose}>
                <div className="contenedor">
                    <section className="col-10">
                        <h3 className="subtitulo">
                            Confirmación usuario
                        </h3>
                    </section>
                    <section className="col-10 lh-lg">
                        <p className="text-center">{text}</p>
                    </section>
                    <section className="col-10 text-center contenedor flex-row">
                        <button className="btn btn-success my-4 mx-2 flex-fill" onClick={handleConfirm} autoFocus>
                            Aceptar
                        </button>
                        <button className="btn btn-danger my-4 mx-2 flex-fill" onClick={handleClose}>
                            Cancelar
                        </button>
                    </section>
                </div>
            </Dialog>
        </div>
    );
};