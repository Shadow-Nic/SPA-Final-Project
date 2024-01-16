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
                updatedState[profileIndex].days = [...updatedState[profileIndex].days, dayData];
                localStorage.setItem('profiles', JSON.stringify(updatedState));
                return updatedState;

        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
}

export { BmiContext, bmiReducer };
