import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BmiContext } from '../context/BmiContext';


function addDay() {
    const { dispatch, state, selectedProfile } = useContext(BmiContext);
    const navigate = useNavigate();

    const selectedProfileIndex = state.findIndex(profile => profile === selectedProfile);


    const date = new Date();
    const currentDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    }).replace(/(\d{2})\/(\d{2})\/(\d{2})/, "$1.$2.$3"); //12.12.12 > 12 december 2012


    // Fürs profile daten:
    const [todayCalories, setTodayCalories] = useState(1000);
    const [todayFats, setTodayFats] = useState(200);
    const [todayProteins, setTodayProteins] = useState(80);
    const [todayCarbs, setTodayCarbs] = useState(300);

    const addNutrients = (calories, fats, proteins, carbs) => {
        setTodayCalories((prevCalories) => prevCalories + calories);
        setTodayFats((prevFats) => prevFats + fats);
        setTodayProteins((prevProteins) => prevProteins + proteins);
        setTodayCarbs((prevCarbs) => prevCarbs + carbs);
    };

    //   ende profil daten




    const addCalories = () => {




        dispatch({
            type: 'ADD_DAY',
            payload: {
                profileIndex: selectedProfileIndex,
                dayData: {
                    date: currentDate,
                    todayCalories,
                    todayProteins,
                    todayFats,
                    todayCarbs
                }
            }
        });
        navigate('/');
    };


    return (
        <div>

            <button onClick={addCalories}>add Calories</button>
        </div>
    );
}

export default addDay;
