import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../Style/Main.css';

const Dropdown = ({ items }) => {
    const [visible, setVisible] = useState(false);
   
    const select = (item) => {
       
    };
   
    const show = () => {
       setVisible(true);
       document.addEventListener("click", hide);
    };
   
    const hide = () => {
       setVisible(false);
       document.removeEventListener("click", hide);
    };
   
    const renderListItems = () => {
       return items.map((item, index) => (
           <Link key={index} to={item.path} onClick={() => select(item)}>
               {item.name}
           </Link>
       ));
    };
   
    return (
       <div className={"dropdown-container" + (visible ? " show" : "")}>
           <div className={"dropdown-display" + (visible ? " clicked": "")} onClick={show}>
               <FontAwesomeIcon icon={faBars} style={{color: "#FFD43B",}} />
           </div>
           <div className="dropdown-list">
               {renderListItems()}
           </div>
       </div>
    );
   };
   
   const Header = () => {
    return (
       <header>
           <div className="header">
               <img src="/src/assets/Logo-NoBG.png" alt="Fitify Logo" />
               <div className="menue">
                 <Dropdown items={[
                    { name: 'Profile', path: '/' },
                    { name: 'Eat', path: '/' },
                    { name: 'Sports', path: '/' }
                 ]} />
               </div>
           </div>
       </header>
    );
   };
   
   export default Header;