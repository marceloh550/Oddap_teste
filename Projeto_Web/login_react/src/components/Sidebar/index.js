import React, { useContext } from 'react';
import { Context } from '../../Context/AuthContext';

import { Link } from 'react-router-dom';

export const Sidebar = (props) => {

    const { handleLogout } = useContext(Context);

    return (
        <div id="barsSidebar" className="sidebar">



            <Link to="/list-site-msg-contact" className={props.active === "site-msg-contact" ? "sidebar-nav active" : "sidebar-nav"}><i className="icon fas fa-users"></i><span>Mensagens</span></Link>

            <Link to="#" onClick={handleLogout} className="sidebar-nav"><i className="icon fas fa-sign-out-alt"></i><span>Sair</span></Link>
        </div>
    )
}