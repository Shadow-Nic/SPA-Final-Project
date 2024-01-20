
import React, { useContext, useMemo } from 'react';
import { BarChart, YAxis, Bars, Line } from '@rsuite/charts';
import { calculateCalories } from './getChartData';
import { BmiContext } from '../context/BmiContext';

const MonthlyChart = () => {

    const { selectedProfile } = useContext(BmiContext);
    const last30DaysData = selectedProfile.days.slice(0, 30).map(day => {
        const { goalCalories, achievedCalories } = calculateCalories(day.foods, day.sports);
        return { ...day, goalCalories, achievedCalories };
    });

    const data = last30DaysData.map(item => [item.date, parseInt(item.achievedCalories), parseInt(item.goalCalories)]);
    const minAchievedCalories = useMemo(() => {
        return Math.min(...last30DaysData.map(item => parseInt(item.achievedCalories))) - 100;
    }, [last30DaysData]);

    const style = {
        height: 250,
        width: 330
    }
    const config = {
        legend: {
            top: '0',
        },
        "color": [
            "#34c3ff",
            "#F8C88E",
        ],
    };

    return (
        <div className='Wrapper' >
            <h3>Monthly</h3>
            <BarChart data={data} style={style} option={config} >
                <YAxis minInterval={200} min={minAchievedCalories - 500} axisLabel={(value) => `${value / 1}`} />
                <Bars name="Kcal" />
                <Line name="Required" />
            </BarChart>
        </div>
    );
};

export default MonthlyChart;