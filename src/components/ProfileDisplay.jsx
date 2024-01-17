import React, { useContext } from 'react';
import { BmiContext } from '../context/BmiContext';
import BmrChart from './chart';

function ProfileDisplay() {
    const { selectedProfile } = useContext(BmiContext);


    const date = new Date();
    const currentDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    }).replace(/(\d{2})\/(\d{2})\/(\d{2})/, "$1.$2.$3"); //12.12.12 > 12 december 2012


    function UserGreeting() {
        let days = selectedProfile.days;
        let dayIndex = days.findIndex(day => day.date === currentDate);

        return (
            <div>
                <BmrChart
                    labels={['Left', 'TODAY Calories']}
                    data={[
                        (selectedProfile.bmr - selectedProfile.days[dayIndex].todayCalories),
                        selectedProfile.days[dayIndex].todayCalories,
                    ]}
                    backgroundColor={['green', 'blue']}
                    borderColor={['black', 'black']}
                />
                <BmrChart
                    labels={['Fats', 'Protein', 'Carbs']}
                    data={[
                        selectedProfile.days[dayIndex].todayFats,
                        selectedProfile.days[dayIndex].todayProteins,
                        selectedProfile.days[dayIndex].todayCarbs,
                    ]}
                    backgroundColor={['red', 'blue', 'yellow']}
                    borderColor={['black', 'black']}
                />
            </div>

        );
    }
    function Greeting() {

        if (selectedProfile.days) {
            return <UserGreeting />;
        }


    }

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

                    <Greeting />

                </div>
            )}
        </div>
    );
}

export default ProfileDisplay;
