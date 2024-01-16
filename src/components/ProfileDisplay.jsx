import React, { useContext } from 'react';
import { BmiContext } from '../context/BmiContext';
import BmrChart from './chart';
import '../Style/Profile.css';

function ProfileDisplay() {
    const { selectedProfile } = useContext(BmiContext);

    return (
        <div>
            {selectedProfile && (
                <div className="Profile">
                    <h2>{selectedProfile.name}'s Profile</h2>
                    <img src="/src/assets/Default_Profile_Picture.svg.png" alt="Profile-pic" />
                    <div className="Stats">
                        <p>Age: {selectedProfile.age}</p>
                        <p>Height: {selectedProfile.height} cm</p>
                        <p>
                            Weight: {selectedProfile.weightKg} kg / {selectedProfile.weightLbs} lbs
                        </p>
                    </div>
                    <div className="Charts">
                        <BmrChart
                            title={'Total Calories'}
                            labels={['BMR', 'TODAY Calories']}
                            data={[selectedProfile.bmr, selectedProfile.todayCalories]}
                            backgroundColor={['green', 'blue']}
                            borderColor={['black', 'black']}
                        />
                        <BmrChart
                            title={'Nutrition'}
                            labels={['Fats', 'Protein', 'Carbs']}
                            data={[
                                selectedProfile.todayFats,
                                selectedProfile.todayProteins,
                                selectedProfile.todayCarbs,
                            ]}
                            backgroundColor={['red', 'blue', 'yellow']}
                            borderColor={['black', 'black']}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileDisplay;
