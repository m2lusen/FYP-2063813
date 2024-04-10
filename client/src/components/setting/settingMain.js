import React, { useState, useEffect } from 'react';
import './settings.css'; // Import CSS file for settings styling

/**
 * Component for settings menu.
 * @component
 */
const Settings = () => {
    // State to track current mode (light or dark), default to 'light'
    const [mode, setMode] = useState(localStorage.getItem('mode') || 'light');
    // State to track font size, default to 16px
    const [fontSize, setFontSize] = useState(parseInt(localStorage.getItem('fontSize')) || 16);

    /**
     * Function to toggle between light and dark modes.
     */
    const toggleMode = () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        localStorage.setItem('mode', newMode); // Save mode to local storage
    };

    /**
     * Function to handle font size change.
     * @param {Object} e - Event object.
     */
    const handleFontSizeChange = (e) => {
        setFontSize(parseInt(e.target.value));
        localStorage.setItem('fontSize', e.target.value); // Save font size to local storage
    };

    useEffect(() => {
        // Update body class based on mode
        document.body.classList.remove('light-mode', 'dark-mode');
        document.body.classList.add(`${mode}-mode`);
    }, [mode]);

    useEffect(() => {
        // Set font size to root element
        document.documentElement.style.fontSize = `${fontSize}px`;
    }, [fontSize]);

    return (
        <div className="settings-container">
            <h1>Settings</h1>
            <div className="mode-toggle" onClick={toggleMode}>
                <span className={`mode light-mode ${mode === 'light' ? 'active' : ''}`}>Light</span>
                <span className={`mode dark-mode ${mode === 'dark' ? 'active' : ''}`}>Dark</span>
            </div>
            <div className="font-size-slider">
                <label htmlFor="font-size">Font Size:</label>
                <input
                    type="range"
                    id="font-size"
                    min="14"
                    max="22"
                    value={fontSize}
                    onChange={handleFontSizeChange}
                />
                <span>{fontSize}px</span>
            </div>
        </div>
    );
};

export default Settings;
