import React, { useState, useContext } from 'react';
import { BmiContext } from '../context/BmiContext';

function ProfileSwitcher() {
    const { state } = useContext(BmiContext);
    const [selectedProfile, setSelectedProfile] = useState(null);

    const handleProfileSelect = (profile) => {
        setSelectedProfile(profile);
    };

    return (
        <div>
            <h2>Profiles</h2>
            <ul>
                {state.map((profile, index) => (
                    <li key={index} onClick={() => handleProfileSelect(profile)}>
                        {profile.name}
                    </li>
                ))}
            </ul>
            {selectedProfile && (
                <div>
                    <h2>{selectedProfile.name}'s Profile</h2>
                    <p>Height: {selectedProfile.height}</p>
                    <p>
                        Weight: {selectedProfile.weightKg} kg / {selectedProfile.weightLbs} lbs
                    </p>
                    <p>BMI: {selectedProfile.bmi}</p>
                    <p>Category: {selectedProfile.category}</p>
                </div>
            )}
        </div>
    );
}

export default ProfileSwitcher;
