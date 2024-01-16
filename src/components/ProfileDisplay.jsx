import React, { useContext } from 'react';
import { BmiContext } from '../context/BmiContext';
import BmrChart from './chart';

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
                    {/* <p>Today`s Burned Calories</p>                           Tägliche Kalorien abnahme (muss noch implentiert werden)         */}
                    <p>Category: {selectedProfile.category}</p>

                    <div>
                        <p>Today's calories: {selectedProfile.todayCalories}</p>
                        <p>Today's fats: {selectedProfile.todayFats}</p>
                        <p>Today's proteins: {selectedProfile.todayProteins}</p>
                        <p>Today's carbs: {selectedProfile.todayCarbs}</p>
                    </div>
                    <BmrChart
                        labels={['BMR', 'TODAY Calories']}
                        data={[selectedProfile.bmr, selectedProfile.todayCalories]}
                        backgroundColor={['green', 'blue']}
                        borderColor={['black', 'black']}
                    />
                    <BmrChart
                        labels={['Today Fats', 'Today Protein', 'Today Carbs']}
                        data={[selectedProfile.todayFats, selectedProfile.todayProteins, selectedProfile.todayCarbs]}
                        backgroundColor={['red', 'blue', 'yellow']}
                        borderColor={['black', 'black']}
                    />
                </div>
            )}
        </div>
    );
}

export default ProfileDisplay;
