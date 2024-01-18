import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BmiContext } from '../context/BmiContext';
import { Popover, Whisper } from 'rsuite';
import '../Style/addDay.css'
import useSWR from 'swr';

function addDay() {
 const { dispatch, state, selectedProfile } = useContext(BmiContext);
 const [searchTerm, setSearchTerm] = React.useState('');

 const date = new Date();
 const currentDate = date.toLocaleDateString('en-GB', {
 day: '2-digit',
 month: '2-digit',
 year: '2-digit'
 }).replace(/(\d{2})\/(\d{2})\/(\d{2})/, "$1.$2.$3"); //12.12.12 > 12 december 2012

 const apiKey = 'hWdaj14WL8WDgVYei8imulkY2hKH8uxTfiDUvVHP';

 const fetcher = async (url) => {
 const res = await fetch(url, {
   method: 'GET',
   headers: { 'X-Api-Key': apiKey },
   contentType: 'application/json',
 });
 if (!res.ok) throw new Error(res.status);
 return res.json();
 };

 const FoodList = () => {
 const { data, error } = useSWR(`https://api.api-ninjas.com/v1/nutrition?query=${searchTerm}`, fetcher);

 if (error){console.log(error)
  return <div>Failed to load</div>} ;
 if (!data) return <div>Loading...</div>;
 
 const food = data.map((item) => ({
   name: item.name,
   calories: item.calories,
   servingSizeG: item.serving_size_g,
   fatTotalG: item.fat_total_g,
   // Add other properties as needed
 }));

 return (
  <div>
    {food.map((item, index) => (
      <div key={index}>
        <p>{item.name}</p>
        <p>{item.calories} calories</p>
        <p>{item.servingSizeG}g serving size</p>
        <p>{item.fatTotalG}g total fat</p>
        {/* Display other properties as needed */}
      </div>
    ))}
  </div>
 );
 };

 return (
 <div className='addDay'>
 <input
 type="text"
 placeholder="Search for food..."
 value={searchTerm}
 onChange={e => setSearchTerm(e.target.value)}
/>
               <button >add Calories to Profile</button>
               <FoodList />
 </div>

 );
}

export default addDay;
