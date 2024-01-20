import React, { useContext } from 'react';
import { BmiContext } from '../context/BmiContext';
import DayChart from './dailyChart';
import '../Style/Profile.css'
import WeekChart from './weekChart';
import MonthlyChart from './monthlyChart';
import { Carousel } from 'rsuite';
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

        return (
            <div className='Charts'>
                <Carousel
                    key={``}
                    placement={'bottom'}
                    shape={'bar'}
                    className="chartSlider"
                    as={'div'}
                    autoplay={false}
                    autoplayInterval={5000}
                >
                    <div><DayChart /></div>
                    <div><WeekChart /></div>
                    <div><MonthlyChart /></div>
                </Carousel>

            </div>
        );
    }

    function Greeting() {
        if (selectedProfile) {
            if (selectedProfile.days) {
                return <UserGreeting />;
            }
        }
    }

    return (
        <div className='main'>
            {selectedProfile && (

                <div className="Profile">
                    <h2>{selectedProfile.name}'s Profile</h2>

                    <p>Age: {selectedProfile.age}</p>
                    <p>Height: {selectedProfile.height}</p>
                    <p>
                        Weight: {selectedProfile.weightKg} kg / {selectedProfile.weightLbs.toFixed(2)} lbs
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
