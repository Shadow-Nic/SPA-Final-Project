import Chart from 'chart.js/auto';
import React, { useContext } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { calculateCalories } from './getChartData';
import { BmiContext } from '../context/BmiContext';

const WeekChart = () => {
    const { selectedProfile } = useContext(BmiContext);

    const last7DaysData = selectedProfile.days.slice(0, 7).map(day => {
        const { goalCalories, achievedCalories, bmr } = calculateCalories(day.foods, day.sports);
        return { ...day, goalCalories, achievedCalories };
    });

    const chartData = {
        labels: last7DaysData.map(item => item.date),
        datasets: [
            {
                type: 'line',
                label: 'Required',
                data: last7DaysData.map(item => item.goalCalories),
                backgroundColor: 'red',
                borderColor: 'red',
                borderWidth: 1,
            },
            {
                type: 'bar',
                label: 'Total kcal',
                data: last7DaysData.map(item => (item.achievedCalories)),
                backgroundColor: 'green',
                borderColor: 'green',
                borderWidth: 2,
            },
        ],
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }} >
            <h3 style={{ marginBottom: '0' }}>Weekly</h3>
            <div style={{ width: '300px', height: '200px', display: 'flex' }}>
                <Bar
                    data={chartData}
                    options={{
                        legend: {
                            display: false,
                            position: 'top',
                        },
                        responsive: true,
                        maintainAspectRatio: false,

                        scales: {
                            x: {
                                stacked: true,
                            },
                            y: {
                                stacked: true
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default WeekChart;