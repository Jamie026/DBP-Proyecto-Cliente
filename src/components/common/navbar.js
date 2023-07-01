import React from "react";

export const Navbar = ({ navItems, brand }) => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary mb-4">
            <div className="container-fluid">
                <a className="navbar-brand d-flex align-items-center" href={brand}>
                    <img src="/img/favicon.ico" alt="Logo" width="30" height="24" className="d-inline-block align-text-top rounded rounded-2 mx-2"/>
                    NullPointer
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-lg-0 align-items-center">
                        {navItems.map((item) => (
                            <li key={item.name} className="nav-item mx-2 my-1">
                                <a className="nav-link" href={item.route}>
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};