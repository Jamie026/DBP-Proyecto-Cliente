import React, { useState } from "react";
import { NotificationManager } from "react-notifications";

import moment from "moment";

import { LoggedNav } from "../../components/navbar/loggedNav";
import { Form } from "../../components/common/form";
import { Countdown } from "./chronometer";

const fields = [
    { key: "work", name: "work", label: "Tiempo trabajo", prop: { type: "time", InputLabelProps: { shrink: true } } },
    { key: "rest", name: "task", label: "Tiempo descanso", prop: { type: "time", InputLabelProps: { shrink: true } } },
    { key: "count", name: "rest", label: "Número repeticiones", prop: { type: "number" } }
];

export const AssignTimer = () => {
    const [data, setData] = useState({});
    const [timerA, setTimerA] = useState(0);
    const [timerB, setTimerB] = useState(0);
    const [counter, setCounter] = useState(0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleTimer = (e) => {
        e.preventDefault();
        NotificationManager.warning("Inicializando cronómetro...", "Alerta", 2000);
        const timerAMilliseconds = moment.duration(data.work, "HH:mm").asMilliseconds();
        const timerBMilliseconds = moment.duration(data.rest, "HH:mm").asMilliseconds();
        setTimerA(timerAMilliseconds);
        setTimerB(timerBMilliseconds);
        setCounter(Number(data.count) || 0);
        NotificationManager.success("Cronómetro inicializado", "Exito", 2000);
    };

    return (
        <main>
            <LoggedNav />
            <div className="contenedor flex-row align-items-center justify-content-center">
                <section className="col-10 col-md-5">
                    <Form fields={fields} handleSubmit={handleTimer} handleInputChange={handleInputChange} title={"Iniciar cronómetro"} />
                </section>
                <section className="col-10 col-md-5">
                    <Countdown timerA={timerA} timerB={timerB} counter={counter} />
                </section>
            </div>
        </main>
  );
};
