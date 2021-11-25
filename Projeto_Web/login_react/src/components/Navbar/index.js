import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../Context/AuthContext';

export const Navbar = () => {

    const [image] = useState(localStorage.getItem('image'));
    const [name] = useState(localStorage.getItem('name'));

    const { handleLogout } = useContext(Context);

    const dropdownUserNavbar = async () => {
        document.getElementById("dropNavbarUser").classList.toggle("dropdown-menu-action");
    }

    const barsSidebar = async () => {
        document.getElementById("barsSidebar").classList.toggle("sidebar-active");
    }

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="bars" onClick={() => barsSidebar()}>
                    <i className="fas fa-bars"></i>
                </div>
                <img src="/logo.png" alt="clinica" className="logo" />
            </div>
            <div className="navbar-content">

                
            </div>
        </nav>
    )
}