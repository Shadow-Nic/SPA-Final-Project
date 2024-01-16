import React from 'react';
import BmiProvider from './context/BmiProvider';
import BmiCalculator from './components/calculateBmi';

import ProfileDisplay from './components/ProfileDisplay';
import Navbar from './components/Navbar';
import Header from './components/Header';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
    return (
        <>
            <Router>
                <BmiProvider>
                    <Header></Header>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<ProfileDisplay />} />
                        <Route path="/calculator" element={<BmiCalculator />} />
                    </Routes>
                </BmiProvider>
            </Router>
        </>
    );
}

export default App;
