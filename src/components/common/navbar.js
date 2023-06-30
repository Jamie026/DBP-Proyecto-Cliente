import React from "react";

export const Navbar = ({ navItems, brand }) => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary mb-4">
            <div className="container-fluid">
                <a className="navbar-brand" href={brand}>
                    <img src="/img/favicon.ico" alt="Logo" width="30" height="24" className="d-inline-block align-text-top rounded rounded-4"/>
                    NullPointer
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end align-items-center" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        {navItems.map((item) => (
                            <li key={item.name} className="nav-item">
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