import React, { useContext } from 'react';
import { BmiContext } from '../context/BmiContext';
import '../Style/Profile.css'
import DayChart from './dailyChart';
import WeekChart from './weekChart';
import MonthlyChart from './monthlyChart';
import { Carousel } from 'rsuite';

function ProfileDisplay() {
    const { selectedProfile } = useContext(BmiContext);




    function UserGreeting() {

        return (
            <div className='Charts'>
                <Carousel
                    key={``}
                    placement={'bottom'}
                    shape={'bar'}
                    className="chartSlider"
                    as={'div'}
                    autoplay={true}
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
                    <p>Height: {selectedProfile.height}cm</p>
                    <p>
                        Weight: {selectedProfile.weightKg} kg / {selectedProfile.weightLbs.toFixed(2)} lbs
                    </p>
                    <p>BMI: {selectedProfile.bmi}</p>
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
