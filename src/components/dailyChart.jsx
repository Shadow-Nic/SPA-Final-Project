import Chart from 'chart.js/auto';
import React, { useContext, useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Progress } from 'rsuite';
import { BarChart, PieChart } from '@rsuite/charts';
import { calculateDayCalories } from './getChartData';

const DayChart = () => {
    // Berechnung der Tageskalorien
    const {
        intakeCalories,
        goalCalories,
        achievedCalories,
    } = calculateDayCalories();

    // Berechnung des Prozentsatzes der erreichten Kalorien
    const percentKcal = Number((achievedCalories / goalCalories * 100).toFixed(1));

    // Konfiguration der Nährwerttabelle
    const data = [
        ['Protein', intakeCalories.proteinG.toFixed(1)],
        ['Fat', intakeCalories.fatTotalG.toFixed(1)],
        ['Carbs', intakeCalories.carbohydratesTotalG.toFixed(1)],
    ];

    // Status für den Fortschrittsbalken
    const [status, setStatus] = useState('');

    // Effekt zum Aktualisieren des Status
    useEffect(() => {
        if (percentKcal >= 100) {
            setStatus('success');
        } else {
            setStatus('');
        }
    }, [percentKcal]);

    // Style für die Komponenten
    const styleProgress = {
        width: 125,
        height: 140,
    };

    const styleNutritions = {
        width: 150,
        height: 220,
        bottom: 0,
    };

    const config = {
        legend: {
            top: '0',
        },
    };

    // Methode zur Anzeige des Fortschrittsbalkens
    const renderProgressCircle = (status) => {
        if (status === 'success') {
            return <Progress.Circle percent={percentKcal} style={styleProgress} status="success" />;
        } else if (status === 'fail') {
            return <Progress.Circle percent={percentKcal} style={styleProgress} status="fail" />;
        } else {
            return <Progress.Circle percent={percentKcal} style={styleProgress} />;
        }
    };

    // Render-Methode für die Komponente
    return (
        <div className='daily'>
            <h3>Daily</h3>
            <div className='wrapperChart'>
                <div className='chartKcal'>
                    <p><strong>{parseInt(achievedCalories)} / {goalCalories}kcal</strong></p>
                    {renderProgressCircle(status)}
                </div>
                <div className='chartNutrition'>
                    <PieChart name="Nutritions" style={styleNutritions} data={data} option={config} label={false} />
                </div>
            </div>
        </div>
    );
};

export default DayChart;