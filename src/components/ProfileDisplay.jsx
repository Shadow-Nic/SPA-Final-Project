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
                        <p>Today's calories: {selectedProfile.days[0].todayCalories}</p>
                        <p>Today's fats: {selectedProfile.days[0].todayFats}</p>
                        <p>Today's proteins: {selectedProfile.days[0].todayProteins}</p>
                        <p>Today's carbs: {selectedProfile.days[0].todayCarbs}</p>
                    </div>
                    <BmrChart
                        labels={['Left', 'TODAY Calories']}
                        data={[
                            selectedProfile.bmr - selectedProfile.days[0].todayCalories,
                            selectedProfile.days[0].todayCalories,
                        ]}
                        backgroundColor={['green', 'blue']}
                        borderColor={['black', 'black']}
                    />
                    <BmrChart
                        labels={['Fats', 'Protein', 'Carbs']}
                        data={[
                            selectedProfile.days[0].todayFats,
                            selectedProfile.days[0].todayProteins,
                            selectedProfile.days[0].todayCarbs,
                        ]}
                        backgroundColor={['red', 'blue', 'yellow']}
                        borderColor={['black', 'black']}
                    />
                </div>
            )}
        </div>
    );
}

export default ProfileDisplay;
