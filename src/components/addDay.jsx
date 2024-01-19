import React, { useState, useContext, useEffect } from 'react';
import { BmiContext } from '../context/BmiContext';
import { Nav } from 'rsuite';
import '../Style/addDay.css'

//Tabbar components

import FoodSearch from './FoodSearch';
import SportSearch from './SportSearch';
import DaySummary from './DaySummary';

import { DatePicker } from 'rsuite';
import { cutDate } from './textFunc'
import { useToast } from './useToast';

//Tabbar end

function addDay() {
    // context
    const { selectedProfile } = useContext(BmiContext);

     //toast
     const showToast = useToast();

    // Foods
    const [searchTerm, setSearchTerm] = useState('');
    const [addedFoods, setAddedFoods] = useState([]);
    // Sports
    const [searchTermTab, setSearchTermTab] = useState('');
    const [addedSports, setAddedSports] = useState([]);

    // Date
    const [pickDate, setPickDate] = useState(new Date());

    //loading existing Day data
    useEffect(() => {
        if (selectedProfile) {
            let fDate = cutDate(pickDate);
            if (selectedProfile.days) {
                const dayIndex = selectedProfile.days.findIndex(day => day.date === fDate);
                if (dayIndex !== -1) {
                    showToast('info', `Loaded: ${fDate}`);
                    // Load the day's data here
                    const dayData = selectedProfile.days[dayIndex];
                    // Set the state with the loaded data
                    setAddedFoods(dayData.foods);
                    setAddedSports(dayData.sports);
                }
                else {
                      // empty out the data beauser day was epmty anyways
                    setAddedFoods([]);
                    setAddedSports([]);
                }
            }
        }
    }, [selectedProfile, pickDate]); // Dependencies

    // Tab controle
    const [active, setActive] = useState('food');

    const Tabbar = ({ active, onSelect, ...props }) => {
        return (
            <div>
                <Nav {...props} activeKey={active} onSelect={onSelect}>
                    <Nav.Item eventKey="food" >Meal's 🍕 </Nav.Item>
                    <Nav.Item eventKey="sport">Activity's 🤸🏽‍♀️ </Nav.Item>
                    <Nav.Item eventKey="sum">Summary 📋</Nav.Item>
                    <DatePicker value={pickDate} className='chooseDay' format="dd.MM.yy" defaultValue={new Date()} placement="leftStart" placeholder="📅" style={{ width: 115 }} onChange={date => setPickDate(date)} />
                </Nav>
                {active == 'food' && <FoodSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} addedFoods={addedFoods} setAddedFoods={setAddedFoods} />}
                {active == 'sport' && <SportSearch searchTerm={searchTermTab} setSearchTerm={setSearchTermTab} lbs={selectedProfile.weightLbs} addedSports={addedSports} setAddedSports={setAddedSports} />}
                {active == 'sum' && <DaySummary addedFoods={addedFoods} addedSports={addedSports} pickDate={pickDate} />}
            </div>
        );
    };
    return (
        <div className='addDay'>
            <Tabbar appearance="tabs" active={active} onSelect={setActive} />
        </div>
    );
}

export default addDay;