import Chart from 'chart.js/auto';
import React, { useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { BmiContext } from '../context/BmiContext';


const DayChart = ({ data }) => {
    const { selectedProfile } = useContext(BmiContext);
    const bmr = selectedProfile.bmr;
    const { todayCalories, todayCarbs, todayProteins, todayFats } = data;

    const chartRef = React.useRef(null);

    const labelsCal = ['Calories', 'Bmr']
    const dataCal = [todayCalories, bmr]
    const labelsNut = ['Carbs', 'Fats', 'Proteins']
    const dataNut = [todayCarbs, todayFats, todayProteins]



    const chartDataCal = {
        labels: labelsCal,
        datasets: [
            {
                data: dataCal,
                backgroundColor: ['green', 'red'],
                borderColor: 'black',
                borderWidth: 1,
            },
        ],
    };

    const optionsCal = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Calories'
            }
        },
    };

    const chartDataNut = {
        labels: labelsNut,
        datasets: [
            {
                data: dataNut,
                backgroundColor: ['green', 'red', 'blue'],
                borderColor: 'black',
                borderWidth: 1,
            },
        ],
    };
    const optionsNut = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Nutrition'
            }
        },
    };

    return (

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
            <p style={{ marginBottom: '0' }}>Daily</p>
            <div style={{ width: '300px', height: '150px', display: 'flex' }}>
                <div style={{ width: '50%', float: 'left' }}>
                    <Doughnut ref={chartRef} data={chartDataCal} options={optionsCal} />
                </div>
                <div style={{ width: '50%', float: 'right' }}>
                    <Doughnut ref={chartRef} data={chartDataNut} options={optionsNut} />
                </div>
            </div>
        </div>
    );
};

export default DayChart;
