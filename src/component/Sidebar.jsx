import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = ({isOpen, setIsOpen, barClicked}) => {

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`} onMouseEnter={() => (barClicked ? (null):setIsOpen(true))} onMouseLeave={() => (barClicked ? (null):setIsOpen(false))}>
            <div className="sidebar-item">
                <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
                <span>Profile</span>
            </div>
            <div className="sidebar-item">
                <FontAwesomeIcon icon={faSignOutAlt} className="sidebar-icon" />
                <span>Logout</span>
            </div>
        </div>
    );
};

export default Sidebar;
