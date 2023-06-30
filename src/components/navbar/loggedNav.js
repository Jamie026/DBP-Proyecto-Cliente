import { Navbar } from "../common/navbar";

export const LoggedNav = () => {
    const navItems = [
        { name: "Inicio", route: "/dashboard" },
        { name: "Tareas", route: "/tasks" },
        { name: "Grupos", route: "/groups" },
        { name: "Usuario", route: "/support" },
        { name: "Cerrar Sesión", route: "/logout" }
    ];

    return <Navbar navItems={navItems} brand={"/dashboard"} />;
};