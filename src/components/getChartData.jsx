import { useContext } from "react";
import { BmiContext } from "../context/BmiContext";

function getDayIndex() {
    const { selectedProfile } = useContext(BmiContext);
    const currentDate = new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    }).replace(/(\d{2})\/(\d{2})\/(\d{2})/, "$1.$2.$3");
    const dayIndex = selectedProfile.days.findIndex(day => day.date === currentDate);

    return dayIndex
}

export const calculateDayCalories = () => {
    const { selectedProfile } = useContext(BmiContext);
    const dayIndex = getDayIndex()
    const foods = selectedProfile.days[dayIndex]?.foods || [];
    const sports = selectedProfile.days[dayIndex]?.sports || [];
    const base = selectedProfile.bmr;

    const burnedCalories = sports.reduce((acc, sport) => acc += sport.totalCalories, 0);
    const intakeCalories = foods.reduce((acc, food) => {
        acc.calories += food.calories;
        acc.fatTotalG += food.fatTotalG;
        acc.proteinG += food.proteinG;
        acc.carbohydratesTotalG += food.carbohydratesTotalG;
        return acc;
    }, {
        calories: 0,
        fatTotalG: 0,
        proteinG: 0,
        carbohydratesTotalG: 0,
    });
    const goalCalories = burnedCalories + base;
    const achievedCalories = intakeCalories.calories;


    return { intakeCalories, goalCalories, achievedCalories, burnedCalories };
};



export const calculateCalories = (foods, sports) => {
    const { selectedProfile } = useContext(BmiContext);
    const base = selectedProfile.bmr

    const burnedCalories = sports.reduce((acc, sport) => acc += sport.totalCalories, 0);
    const achievedCalories = foods.reduce((acc, food) => {
        acc += food.calories;
        return acc;
    }, 0);
    const goalCalories = burnedCalories + base;

    return { goalCalories, achievedCalories };
}

