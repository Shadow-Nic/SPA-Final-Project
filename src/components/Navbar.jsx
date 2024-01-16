// Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BmiContext } from '../context//BmiContext';

function Navbar() {
    const { state, selectedProfile, setSelectedProfile } = useContext(BmiContext);

    const handleProfileSelect = (event) => {
        setSelectedProfile(JSON.parse(event.target.value));
    };

    return (
        <nav>
            <Link to="/">Stats</Link>

            <select value={JSON.stringify(selectedProfile)} onChange={handleProfileSelect}>
                <option value="">Select Profile</option>
                {state.map((profile, index) => (
                    <option key={index} value={JSON.stringify(profile)}>
                        {profile.name}
                    </option>
                ))}
            </select>

            <Link to="/calculator">Add new</Link>
        </nav>
    );
}

export default Navbar;
