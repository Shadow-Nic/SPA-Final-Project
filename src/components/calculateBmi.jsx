import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BmiContext } from '../context/BmiContext';

function BmiCalculator() {
    const { dispatch } = useContext(BmiContext);
    const navigate = useNavigate();
    const [height, setHeight] = useState('');
    const [weightKg, setWeightKg] = useState('');
    const [weightLbs, setWeightLbs] = useState('');
    const [unit, setUnit] = useState('kg');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
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

    const handleHeightChange = (event) => {
        setHeight(event.target.value);
    };

    const handleWeightChange = (event) => {
        let weightVal = event.target.value;
        if (unit === 'lbs') {
            setWeightLbs(weightVal);
            weightVal = weightVal * 0.453592; // Convert pounds to kilograms
        } else {
            setWeightLbs(weightVal * 2.20462); // Convert kilograms to pounds
        }
        setWeightKg(weightVal);
    };

    const handleUnitChange = (event) => {
        setUnit(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleAgeChange = (event) => {
        setAge(event.target.value);
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const calculateBmr = () => {
        let bmrVal = 0;
        if (gender === 'male') {
            bmrVal = 10 * weightKg + 6.26 * height - 5 * age + 5;
        } else {
            bmrVal = 10 * weightKg + 6.26 * height - 5 * age - 161;
        }
        return Math.round(bmrVal);
    };

    const calculateBmi = () => {
        let bmrVal = calculateBmr();
        if (height && weightKg) {
            const heightInMeters = height / 100;
            const bmiVal = (weightKg / (heightInMeters * heightInMeters)).toFixed(2);
            let categoryMsg = '';
            if (bmiVal < 18.5) {
                categoryMsg = 'Underweight';
            } else if (bmiVal >= 18.5 && bmiVal < 25) {
                categoryMsg = 'Normal weight';
            } else if (bmiVal >= 25 && bmiVal < 30) {
                categoryMsg = 'Overweight';
            } else {
                categoryMsg = 'Obese';
            }
            dispatch({
                type: 'ADD_PROFILE',
                payload: {
                    name,
                    height,
                    weightKg,
                    weightLbs,
                    unit,
                    gender,
                    age,
                    bmr: bmrVal,
                    bmi: bmiVal,
                    category: categoryMsg,
                    todayCalories,
                    todayProteins,
                    todayFats,
                    todayCarbs,
                },
            });
            navigate('/');
        }
    };

    return (
        <div>
            <label>
                Name:
                <input type="text" value={name} onChange={handleNameChange} />
            </label>
            <label>
                Age:
                <input type="number" value={age} onChange={handleAgeChange} />
            </label>
            <label>
                Height (cm):
                <input type="number" value={height} onChange={handleHeightChange} />
            </label>
            <label>
                Weight ({unit}):
                <input type="number" value={unit === 'kg' ? weightKg : weightLbs} onChange={handleWeightChange} />
            </label>
            <label>
                Unit:
                <select value={unit} onChange={handleUnitChange}>
                    <option value="kg">Kilograms</option>
                    <option value="lbs">Pounds</option>
                </select>
            </label>
            <label>
                Gender:
                <select value={unit} onChange={handleGenderChange}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </label>
            <button onClick={calculateBmi}>Calculate BMI</button>
        </div>
    );
}

export default BmiCalculator;
