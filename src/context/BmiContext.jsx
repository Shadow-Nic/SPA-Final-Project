// BmiContext.js
import React, { createContext, useReducer, useState } from 'react';

const BmiContext = createContext();

function bmiReducer(state, action) {
    switch (action.type) {
        case 'ADD_PROFILE':
            const newState = [...state, action.payload];
            localStorage.setItem('profiles', JSON.stringify(newState));
            return newState;

                case 'ADD_DAY':
                    const { profileIndex, dayData } = action.payload;
                    const updatedState = [...state];
                    if ( !updatedState[profileIndex].days){
                        updatedState[profileIndex].days = []
                    }
                    let days = updatedState[profileIndex].days;
                    let dayIndex = days.findIndex(day => day.date === dayData.date);
                    if (dayIndex !== -1) {
                     // Day already exists, overwrite it
                     days[dayIndex] = dayData;
                    } else {
                     // Day does not exist, add it
                     days.push(dayData);
                    }
                    updatedState[profileIndex].days = days;
                    localStorage.setItem('profiles', JSON.stringify(updatedState));
                    return updatedState;   

        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
}

export { BmiContext, bmiReducer };
