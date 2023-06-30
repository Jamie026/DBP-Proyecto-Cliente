import { Navbar } from "../common/navbar";

const navItems = [
    { name: "Inicio", route: "/" },
    { name: "Registro", route: "/register" },
    { name: "Soporte", route: "/support" }
];

export const HomeNav = () => {
    return <Navbar navItems={navItems} brand={"/"} />;
};