
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = ({ labels, data, backgroundColor, borderColor }) => {
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
        <div style={{ width: '150px', height: '150px', padding: '5px' }}>
            <Doughnut ref={chartRef} data={chartData} options={options} />
        </div>
    );
};

export default DoughnutChart;
