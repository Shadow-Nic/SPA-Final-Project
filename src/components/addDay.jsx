import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BmiContext } from '../context/BmiContext';


function addDay() {
    const { dispatch, state, selectedProfile } = useContext(BmiContext);
    const navigate = useNavigate();

    const selectedProfileIndex = state.findIndex(profile => profile === selectedProfile);


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
