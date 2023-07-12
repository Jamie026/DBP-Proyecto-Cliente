import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./components/app/App";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createHashRouter([{ path: "/*", element: <App /> } ]);

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);