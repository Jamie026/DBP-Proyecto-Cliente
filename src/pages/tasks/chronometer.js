import React, { useEffect, useState, useRef } from "react";

import moment from "moment";

export const Countdown = ({ timerA, timerB, counter }) => {
    const [remainingTime, setRemainingTime] = useState(timerA);
    
    const [cycleCount, setCycleCount] = useState(1);
    
    const [isRunning, setIsRunning] = useState(false);
    
    const intervalRef = useRef(null);
    
    const [title, setTitle] = useState("Conómetro");

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setRemainingTime(prevTime => {
                    if (prevTime === 0) {
                        if (cycleCount === counter) {
                            clearInterval(intervalRef.current);
                            setIsRunning(false);
                            return 0;
                        } 
                        else {
                            setCycleCount(prevCount => prevCount + 1);
                            return cycleCount % 2 === 0 ? timerA : timerB;
                        }
                    } 
                    else return prevTime - 1000;
                });
            }, 1000);
        }
        return () => clearInterval(intervalRef.current);
    }, [isRunning, cycleCount, counter, timerA, timerB]);

    const formattedTime = moment.utc(remainingTime).format("HH:mm:ss");

    const handleStart = () => setIsRunning(true);

    const handlePauseResume = () => setIsRunning(prevIsRunning => !prevIsRunning);

    const handleRestart = () => {
        setRemainingTime(timerA);
        setCycleCount(1);
        setIsRunning(false);
    };

  return (
        <div className="contenedor bg-light rounded-3 justify-content-center align-items-center">
            <section className="col-10">
                <h2 className="subtitulo">{title}</h2>
            </section>
            <section className="col-10">
                <div className="fs-2 text-center">{formattedTime}</div>
            </section>
            <section className="col-10 contenedor flex-row">
                <button className="btn btn-primary mx-2 my-4 flex-fill" onClick={handleStart}>Iniciar</button>
                <button className="btn btn-warning mx-2 my-4 flex-fill" onClick={handlePauseResume}>{isRunning ? "Pausar" : "Reanudar"}</button>
                <button className="btn btn-success mx-2 my-4 flex-fill" onClick={handleRestart}>Reiniciar</button>
            </section>
        </div>
    );
};