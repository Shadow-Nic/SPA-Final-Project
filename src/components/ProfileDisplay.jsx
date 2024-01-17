import React, { useContext } from 'react';
import { BmiContext } from '../context/BmiContext';
import DayChart from './dailyChart';
import '../Style/Profile.css'
import WeekChart from './weekChart';
import MonthlyChart from './monthlyChart';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


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
            <div className='Charts'>
                <Carousel controls={false}>
                    <Carousel.Item>
                        <DayChart
                            data={selectedProfile.days[dayIndex]}
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <WeekChart
                            data={days}
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <MonthlyChart
                            data={days} />
                    </Carousel.Item>
                </Carousel>
            </div>
        );
    }

    function Greeting() {
        return selectedProfile && <UserGreeting />;
    }


    return (
        <div>
            {selectedProfile && (
                <div className="Profile">
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



                </div>

            )}
            <div className='statistik'>
                <Greeting />
            </div>
        </div>
    );
}

export default ProfileDisplay;
