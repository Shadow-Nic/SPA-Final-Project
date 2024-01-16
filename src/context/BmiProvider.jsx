// BmiProvider.js
import React, { useReducer, useEffect, useState } from 'react';
import { BmiContext, bmiReducer } from './BmiContext';

function BmiProvider({ children }) {
    const [state, dispatch] = useReducer(bmiReducer, [], () => {
        const savedState = localStorage.getItem('profiles');
        return savedState ? JSON.parse(savedState) : [];
    });
    const [selectedProfile, setSelectedProfile] = useState(null);

    useEffect(() => {
        setSelectedProfile(state[state.length - 1]);
    }, [state]);

    return (
        <BmiContext.Provider value={{ state, dispatch, selectedProfile, setSelectedProfile }}>
            {children}
        </BmiContext.Provider>
    );
}

export default BmiProvider;
