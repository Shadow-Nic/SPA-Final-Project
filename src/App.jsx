import React from 'react';
import BmiProvider from './context/BmiProvider';
import BmiCalculator from './components/calculateBmi';
import DayPlan from './components/addDay';

import ProfileDisplay from './components/ProfileDisplay';
import Navbar from './components/Navbar';



import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
    return (
        <>
            <Router>
                <BmiProvider>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<ProfileDisplay />} />
                        <Route path="/day" element={<DayPlan />} />
                        <Route path="/calculator" element={<BmiCalculator />} />
                    </Routes>
                </BmiProvider>
            </Router>
        </>
    );
}

export default App;
