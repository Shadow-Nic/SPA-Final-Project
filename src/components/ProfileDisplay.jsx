import React, { useContext } from 'react';
import { BmiContext } from '../context/BmiContext';

function ProfileDisplay() {
    const { selectedProfile } = useContext(BmiContext);

    return (
        <div>
            {selectedProfile && (
                <div>
                    <h2>{selectedProfile.name}'s Profile</h2>
                    <p>Age: {selectedProfile.age}</p>
                    <p>Height: {selectedProfile.height}</p>
                    <p>
                        Weight: {selectedProfile.weightKg} kg / {selectedProfile.weightLbs} lbs
                    </p>
                    <p>BMI: {selectedProfile.bmi}</p>
                    <p>BMR: {selectedProfile.bmr}</p>
                    <p>Category: {selectedProfile.category}</p>
                </div>
            )}
        </div>
    );
}

export default ProfileDisplay;
