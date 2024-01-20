import React, { useState, useContext, useEffect } from 'react';
import { BmiContext } from '../context/BmiContext';
// rsuite components
import { Nav, DatePicker } from 'rsuite';
import { useToast } from './useToast';

//Tabbar components
import FoodSearch from './FoodSearch';
import SportSearch from './SportSearch';
import DaySummary from './DaySummary';

//shared extras
import { cutDate } from './textFunc'

//css
import '../Style/addDay.css'

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
                    // Load the day's data here
                    const dayData = selectedProfile.days[dayIndex];
                    // Set the state with the loaded data
                    setAddedFoods(dayData.foods);
                    setAddedSports(dayData.sports);
                    if (!(dayData.foods.length === 0 && dayData.sports.length === 0)) {
                        
                        showToast('info', `Loaded: ${fDate}`);
                    }
                    else{
                        setActive('food');
                    }
                }
                else {
                    // empty out the data beauser day was epmty anyways
                    setAddedFoods([]);
                    setAddedSports([]);
                    setActive('food');
                }
            }
        }
    }, [selectedProfile, pickDate]); // Dependencies

    // Tab controle
    const [active, setActive] = useState('food');

    const Tabbar = ({ active, onSelect, ...props }) => {
        return (
            <div>
                <Nav  justified {...props} activeKey={active} onSelect={onSelect}>
                    <Nav.Item eventKey="food" >Meal's 🍕 </Nav.Item>
                    <Nav.Item eventKey="sport">Activity's 🤸🏽‍♀️ </Nav.Item>
                    <Nav.Item disabled={(addedFoods.length === 0 && addedSports.length === 0)} eventKey="sum">Summary 📋</Nav.Item>
                    <DatePicker cleanable={false} value={pickDate} className='chooseDay' format="dd.MM.yy" defaultValue={pickDate} placement="leftStart" placeholder="📅" style={{ width: 115 }} onChange={date => setPickDate(date)} />
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