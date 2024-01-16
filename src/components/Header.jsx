import React, { useState } from 'react';
import { Dropdown, Button } from 'rsuite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../Style/Main.css';


const Header = () => {
    return (
     <header>
       <div className="header">
         <img src="/src/assets/Logo-NoBG.png" alt="Fitify Logo" />
         <div className="menue">
           <Dropdown title={<FontAwesomeIcon icon={faBars} />}>
             <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
             <Dropdown.Item as={Link} to="/eat">Eat</Dropdown.Item>
             <Dropdown.Item as={Link} to="/sports">Sports</Dropdown.Item>
           </Dropdown>
         </div>
       </div>
     </header>
    );
   };
   
   export default Header;