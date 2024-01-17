import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BmiContext } from '../context/BmiContext';
import '../Style/addDay.css'
import DoughnutChart from './chart';


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

    // Fetch

    const apiKey = 'hWdaj14WL8WDgVYei8imulkY2hKH8uxTfiDUvVHP';
    const [query, setQuery] = useState('');
    const [nutritionFacts, setNutritionFacts] = useState([]);
    const [todayCalories, setTodayCalories] = useState(0);
    const [todayFats, setTodayFats] = useState(0);
    const [todayProteins, setTodayProteins] = useState(0);
    const [todayCarbs, setTodayCarbs] = useState(0);
    const [food, setfood] = useState([])


    const handleSubmit = async (query) => {
        // Api anfrage um die Nährstoffwerte zu bekommen
        const url = `https://api.api-ninjas.com/v1/nutrition?query=${query}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: { 'X-Api-Key': apiKey },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setNutritionFacts(data);
    };


    const handleWeight = (index) => {
        // berechnet die Nährstoffe der Menge die der User zu sich genommen hat
        const food = nutritionFacts[index];
        const weightInput = prompt(`Please enter the weight of ${food.name} in grams:`);
        if (weightInput) {
            const weight = parseFloat(weightInput);

            const {
                carbohydrates_total_g,
                fat_total_g,
                protein_g,
                calories,
                serving_size_g,
                name
            } = food;

            addNutrients(
                calories * (weight / serving_size_g),
                fat_total_g * (weight / serving_size_g),
                protein_g * (weight / serving_size_g),
                carbohydrates_total_g * (weight / serving_size_g)
            );

            addFood(name, weight);
        }
    };

    function addNutrients(calories, fats, proteins, carbs) {
        setTodayCalories((prevCalories) => prevCalories + calories);
        setTodayFats((prevFats) => prevFats + fats);
        setTodayProteins((prevProteins) => prevProteins + proteins);
        setTodayCarbs((prevCarbs) => prevCarbs + carbs);
    }
    function addFood(name, weight) {
        setfood((prevFood) => [...prevFood, { name, weight }]);
    }


    return (
        <div className='addDay'>
            <div className='display'>
                <div className='con1'>
                    <DoughnutChart
                        labels={['Fats', 'Protein', 'Carbs']}
                        data={[todayFats, todayProteins, todayCarbs]}
                        backgroundColor={['red', 'blue', 'yellow']}
                        borderColor={['black', 'black']}
                    />
                </div>
                <div className='con2'>
                    <p>Today's Calories: {todayCalories}</p>
                    <ul>
                        {food.map((food, index) => (
                            <li key={index}>
                                {food.weight}g {food.name}
                            </li>
                        ))}
                    </ul>
                    <button onClick={addCalories}>add Calories to Profile</button>
                </div>
            </div>
            <div>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(query); }}>
                    <input type="text" onChange={(e) => setQuery(e.target.value)} />
                    <button type="submit">Search</button>
                </form>
                <div>
                    <p>Result:</p>
                    {nutritionFacts.map((fact, index) => (
                        <p key={index} onClick={() => handleWeight(index)} className='resultItem'>
                            {fact.name}
                        </p>
                    ))}
                </div>
            </div>
        </div>

    );
}

export default addDay;
