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
            const { profileId, dayData } = action.payload;
            const updatedState = [...state];

            // Find the index of the profile with the matching id
            let profileIndex = updatedState.findIndex(profile => profile.id === profileId);

            // If the profile was not found, return the original state
            if (profileIndex === -1) {
                return updatedState;
            }

            let days = updatedState[profileIndex].days;
            let dayIndex = days.findIndex(day => day.date === dayData.date);

            // If a day with the same date already exists, update it

            if (dayIndex !== -1) {
                days[dayIndex] = dayData;
            } else {
                // Otherwise, push a new day onto the array
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
