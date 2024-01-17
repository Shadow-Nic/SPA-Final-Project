import Chart from 'chart.js/auto';
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';

const WeekChart = ({ data }) => {

    const last7DaysData = data.slice(-7);

    const chartData = {
        labels: last7DaysData.map(item => item.date),
        datasets: [
            {
                type: 'bar',
                label: 'Intake Calories',
                data: last7DaysData.map(item => item.todayCalories),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                type: 'bar',
                label: 'Burned Calories',
                data: last7DaysData.map(item => item.todayBurnedCalories),
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            }, {
                type: 'line',
                label: 'Calories',
                data: last7DaysData.map(item => (item.todayCalories - item.todayBurnedCalories)),
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
            <p style={{ marginBottom: '0' }}>Weekly</p>
            <div style={{ width: '300px', height: '150px', display: 'flex' }}>
                <Bar
                    data={chartData}
                    options={{
                        title: {
                            display: true,
                            text: 'Weekly Calories',
                            fontSize: 24,
                        },
                        legend: {
                            display: true,
                            position: 'top',
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default WeekChart;