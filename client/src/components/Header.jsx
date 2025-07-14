/* Book icon (logo), font drop down selector, light/dark mode toggle and icon*/
import logo from '../assets/images/logo.svg';
import React, { useState, useContext } from 'react';
import downIcon from '../assets/images/icon-arrow-down.svg';
import { ThemeContext } from './ThemeContext';
import './Header.css';
import '../typography.css'; // Import typography styles
import Toggle from './Toggle';
import FontDropdown from './FontDropdown'; // Import the FontDropdown component


const Header = () => {
    const { theme, toggleTheme, font, changeFont } = useContext(ThemeContext);

    //Event handler for selecting a font
    const handleChangeFont = (e) => {
        changeFont(e.target.value);
    };

    //Module 12 activity 26 for example of how to do theme toggling 

    return (
        //Need to add CSS styling so the header parts are aligned properly
        <header className={`header-container ${theme}`}>
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <div className="header-controls">
                <FontDropdown font={font} onChange={handleChangeFont} />
                <div className="divider" />

                <Toggle />
            </div>
        </header>
    )
}

export default Header;