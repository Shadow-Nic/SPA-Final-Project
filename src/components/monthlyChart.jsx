import Chart from 'chart.js/auto';
import React, { useContext } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { calculateCalories } from './getChartData';
import { BmiContext } from '../context/BmiContext';

const MonthlyChart = () => {

    const { selectedProfile } = useContext(BmiContext);
    const last30DaysData = selectedProfile.days.slice(0, 30).map(day => {
        const { goalCalories, achievedCalories } = calculateCalories(day.foods, day.sports);
        return { ...day, goalCalories, achievedCalories };
    }).reverse();

    const chartData = {
        labels: last30DaysData.map(item => item.date),
        datasets: [
            {
                type: 'line',
                label: 'Required',
                data: last30DaysData.map(item => item.goalCalories),
                backgroundColor: 'red',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                type: 'bar',
                label: 'Total kcal',
                data: last30DaysData.map(item => (item.achievedCalories)),
                backgroundColor: 'green',
                borderColor: 'green',
                borderWidth: 2,
            },

        ],
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
            <p style={{ marginBottom: '0' }}>Monthly</p>
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

export default MonthlyChart;