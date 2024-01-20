
import React, { useContext, useMemo } from 'react';
import { calculateCalories } from './getChartData';
import { BmiContext } from '../context/BmiContext';
import { BarChart, YAxis, Bars, Line } from '@rsuite/charts';

const WeekChart = () => {
    const { selectedProfile } = useContext(BmiContext);

    const last7DaysData = selectedProfile.days.slice(0, 7).map(day => {
        const { goalCalories, achievedCalories, bmr } = calculateCalories(day.foods, day.sports);
        return { ...day, goalCalories, achievedCalories };
    });


    const data = last7DaysData.map(item => [item.date, parseInt(item.achievedCalories), parseInt(item.goalCalories)]);

    // Calculate the minimum value for YAxis
    const minAchievedCalories = useMemo(() => {
        return Math.min(...last7DaysData.map(item => parseInt(item.achievedCalories))) - 100;
    }, [last7DaysData]);

    const style = {
        height: 250,
        width: 330
    }
    const config = {
        legend: {
            top: '0',
        },
    };

    return (
        <div className='Wrapper' >
            <h3>Weekly</h3>
            <BarChart data={data} style={style} option={config} >
                <YAxis minInterval={200} min={minAchievedCalories - 500} axisLabel={(value) => `${value / 1}`} />
                <Bars name="Kcal" />
                <Line name="Required" />
            </BarChart>
        </div>
    );
};

export default WeekChart;