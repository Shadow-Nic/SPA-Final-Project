import Chart from 'chart.js/auto';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const BmrChart = ({ title, labels, data, backgroundColor, borderColor }) => {
    const chartRef = React.useRef(null);
    const chartData = {
        labels: labels,
        datasets: [
            {
                data: data,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div style={{ width: '150px', height: '150px' }} className="Chart">
            <p>{title}</p>
            <Doughnut ref={chartRef} data={chartData} options={options} />
        </div>
    );
};

export default BmrChart;
