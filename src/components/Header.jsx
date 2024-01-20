import React, { useState, useContext } from 'react';
import { BmiContext } from '../context//BmiContext';

import { Dropdown, Button, SelectPicker } from 'rsuite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../Style/Main.css';




const Header = () => {

  const { state, selectedProfile, setSelectedProfile } = useContext(BmiContext);

  const data = state.map(
    profile => ({ label: profile.name, value: JSON.stringify(profile) })
  );

  const handleProfileSelect = (event) => {
    setSelectedProfile(JSON.parse(event));
};

    return (
     <header>
       <div className="header">
      <div className='picker'>
       <SelectPicker cleanable={false} value={JSON.stringify(selectedProfile)} data={data}  onChange={handleProfileSelect}/>
       </div>
        
         <img src="/src/assets/Logo-NoBG.png" alt="Fitify Logo" />
         <div className="menue">
           <Dropdown title={<FontAwesomeIcon icon={faBars} size="3x" />} noCaret>
             <Dropdown.Item as={Link} to="/">Profile</Dropdown.Item>
             <Dropdown.Item as={Link} to="/day">Input Day</Dropdown.Item>
             <Dropdown.Item as={Link} to="/calculator">Add new Profile</Dropdown.Item>
             <Dropdown.Item as={Link} to="/calendar">Calendar</Dropdown.Item>
           </Dropdown>
         </div>
       </div>
     </header>
    );
   };
   
   export default Header;