// BmiContext.js
import React, { createContext, useReducer, useState } from 'react';

const BmiContext = createContext();

function bmiReducer(state, action) {
    switch (action.type) {
        case 'ADD_PROFILE':
            const newState = [...state, action.payload];
            localStorage.setItem('profiles', JSON.stringify(newState));
            return newState;
        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
}

export { BmiContext, bmiReducer };
