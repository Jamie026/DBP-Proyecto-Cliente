import React, { useEffect, useState, useRef } from "react";
import moment from "moment";

export const Countdown = ({ timerA, timerB, counter }) => {
    const [currentTime, setCurrentTime] = useState(moment.duration(timerA));
    const [cycleCount, setCycleCount] = useState(1);
    const [title, setTitle] = useState("Conómetro");
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setCurrentTime((prevTime) => {
                    const newTime = moment.duration(prevTime.asMilliseconds() - 1000);
                    if (newTime.asMilliseconds() < 0) {
                        console.log("counter: ", counter);
                        console.log("cycle: ", cycleCount);
                        if (cycleCount / 2 === counter) {
                            clearInterval(intervalRef.current);
                            setTitle("Cronómetro finalizado");
                            setIsRunning(false);
                            return prevTime;
                        } 
                        else if (cycleCount % 2 !== 0) {
                            setCurrentTime(moment.duration(timerB));
                            setTitle("Descanso");
                        } 
                        else {
                            setCurrentTime(moment.duration(timerA));
                            setTitle("Trabajo");
                        }
                        setCycleCount((prevCount) => prevCount + 1);
                    }
                    return newTime;
                });
            }, 1000);
        } 
        else clearInterval(intervalRef.current);
        return () => clearInterval(intervalRef.current);
    }, [isRunning, cycleCount, counter, timerA, timerB]);

    const formattedTime = moment.utc(currentTime.asMilliseconds()).format("HH:mm:ss");

    const handleStart = () => {
        handleReset();
        setIsRunning(true);
    }

    const handlePauseResume = () => setIsRunning((prevIsRunning) => !prevIsRunning);

    const handleReset = () => {
        setIsRunning(false);
        setCurrentTime(moment.duration(timerA));
        setCycleCount(1);
        setTitle("Tiempo de trabajo");
    };

    const isButtonDisabled = !timerA || !timerB;

    return (
        <div className="contenedor bg-light rounded-3 justify-content-center align-items-center">
            <section className="col-10">
                <h2 className="subtitulo">{title}</h2>
            </section>
            <section className="col-10">
                <div className="fs-4 text-center">Tiempo actual: {formattedTime}</div>
            </section>
            <section className="col-10 contenedor flex-row">
                <button className="btn btn-outline-primary mx-2 my-4 flex-fill" onClick={handleStart} disabled={isButtonDisabled}>Iniciar</button>
                <button className="btn btn-outline-danger mx-2 my-4 flex-fill" onClick={handlePauseResume} disabled={isButtonDisabled}>{isRunning ? "Pausar" : "Reanudar"}</button>
                <button className="btn btn-outline-success mx-2 my-4 flex-fill" onClick={handleReset} disabled={isButtonDisabled}>Reiniciar</button>
            </section>
        </div>
    );
};