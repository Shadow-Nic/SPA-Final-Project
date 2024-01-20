import Chart from 'chart.js/auto';
import React, { useContext, useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { BmiContext } from '../context/BmiContext';
import { calculateDayCalories } from './getChartData';


const DayChart = () => {

    const { intakeCalories, goalCalories, achievedCalories } = calculateDayCalories();
    const colors = ['#34c3ff', '#1464ac', 'blue']
    // Create the chart data for the calories chart
    const chartDataCalories = {
        labels: [],
        datasets: [
            {
                label: 'Calories',
                data: [achievedCalories, Math.max(0, goalCalories - achievedCalories)],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)', // Light green
                    'rgba(255, 99, 132, 0.2)', // Light red
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)', // Dark green
                    'rgba(255, 99, 132, 1)', // Dark red
                ],
                borderWidth: 1,
            },
        ],
    };

    // Create the chart data for the nutrition chart
    const chartDataNutrition = {
        labels: [],
        datasets: [
            {
                label: ['Fats', 'Proteins', 'Carbs'],
                data: [intakeCalories.proteinG, intakeCalories.fatTotalG, intakeCalories.carbohydratesTotalG],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)', // Light blue
                    'rgba(255, 206, 86, 0.2)', // Light yellow
                    'rgba(75, 192, 192, 0.2)', // Light green
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)', // Dark blue
                    'rgba(255, 206, 86, 1)', // Dark yellow
                    'rgba(75, 192, 192, 1)', // Dark green
                ],
                borderWidth: 1,
            },
        ],
    };

    // Create the chart options
    const options = {
        responsive: true,
        plugins: {
        },
    };
    const dataNut =
        [
            ['Protein', 50],
            ['Fat', 50],
            ['Carbs', 50]
        ]

    // Render the charts
    return (
        <div className='wrapperChart'>
            <div className='con1' >
                <p>Calories</p>
                <p>{achievedCalories.toFixed(2)}kcal /{goalCalories}kcal </p>
                <div className='dailyChart'>
                    <Doughnut data={chartDataCalories} options={options} style={{ width: '100%', height: '100%' }} />
                </div>
            </div>
            <div className='con2'>
                <div className='dailyChart'>
                    <Doughnut data={chartDataNutrition} options={options} style={{ width: '100%', height: '100%' }} />
                </div>
                <ul>
                    <li>{intakeCalories.proteinG.toFixed(1)}g Proteins,</li>
                    <li>{intakeCalories.fatTotalG.toFixed(1)}g Fats,</li>
                    <li>{intakeCalories.carbohydratesTotalG.toFixed(1)}g Carbs</li>
                </ul>
            </div>
        </div >
    );
};

export default DayChart;