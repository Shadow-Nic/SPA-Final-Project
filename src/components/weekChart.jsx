import React, { useContext } from 'react';
import { BmiContext } from '../context/BmiContext';
import { BarChart, YAxis, Bars, Line } from '@rsuite/charts';
import { calculateCalories } from './getChartData';

const WeekChart = () => {
    const { selectedProfile } = useContext(BmiContext);

    const lastSevenDaysData = selectedProfile.days.slice(0, 7).map((day) => {
        const { goalCalories, achievedCalories, bmr } = calculateCalories(day.foods, day.sports);
        return { ...day, goalCalories, achievedCalories };
    });

    const dailyData = lastSevenDaysData.map((item) => [
        item.date,
        parseInt(item.achievedCalories, 10),
        parseInt(item.goalCalories, 10),
    ]);

    const minAchievedCalories = Math.min(...lastSevenDaysData.map((item) => parseInt(item.achievedCalories, 10))) - 100;

    const chartStyle = {
        height: 250,
        width: 330,
    };

    const chartConfig = {
        legend: {
            top: '0',
        },
        color: ['#34c3ff', '#F8C88E'],
    };

    return (
        <div className="Wrapper">
            <h3>Weekly</h3>
            <BarChart data={dailyData} style={chartStyle} option={chartConfig}>
                <YAxis minInterval={200} min={minAchievedCalories - 500} axisLabel={(value) => `${value / 1}`} />
                <Bars name="kcal" />
                <Line name="required" />
            </BarChart>
        </div>
    );
};

export default WeekChart;