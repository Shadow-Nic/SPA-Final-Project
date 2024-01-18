import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BmiContext } from '../context/BmiContext';
import { Form, Input, Button } from 'rsuite';


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
  
    const handleHeightChange = (event) => {
        setHeight(event);
    };

    const handleWeightChange = (event) => {
        let weightVal = event;
        if (unit === 'lbs') {
            setWeightLbs(weightVal);
            weightVal = weightVal * 0.453592; // Convert pounds to kilograms
        } else {
            setWeightLbs(weightVal * 2.20462); // Convert kilograms to pounds
        }
        setWeightKg(weightVal);
    };

    const handleUnitChange = (event) => {
        setUnit(event);
    };

    const handleNameChange = (event) => {
        setName(event);
    };

    const handleAgeChange = (event) => {
        setAge(event);
    };

    const handleGenderChange = (event) => {
        setGender(event);
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
                },
            });
            navigate('/');
        }
    };

    return (
        <Form>
           <div>
               <Form.ControlLabel>Name:</Form.ControlLabel>
               <Input type="text" value={name} onChange={handleNameChange} />
           </div>
           <div>
               <Form.ControlLabel>Age:</Form.ControlLabel>
               <Input type="number" value={age} onChange={handleAgeChange} />
           </div>
           <div>
               <Form.ControlLabel>Height (cm):</Form.ControlLabel>
               <Input type="number" value={height} onChange={handleHeightChange} />
           </div>
           <div>
               <Form.ControlLabel>Weight ({unit}):</Form.ControlLabel>
               <Input type="number" value={unit === 'kg' ? weightKg : weightLbs} onChange={handleWeightChange} />
           </div>
           <div>
               <Form.ControlLabel>Unit:</Form.ControlLabel>
               <Input as="select" value={unit} onChange={handleUnitChange}>
                  <option value="kg">Kilograms</option>
                  <option value="lbs">Pounds</option>
               </Input>
           </div>
           <div>
               <Form.ControlLabel>Gender:</Form.ControlLabel>
               <Input as="select" value={gender} onChange={handleGenderChange}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
               </Input>
           </div>
           <Button onClick={calculateBmi}>Calculate BMI</Button>
       </Form>
   );
}

export default BmiCalculator;
