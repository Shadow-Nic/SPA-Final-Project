import React, { useState, useContext } from 'react';
import { BmiContext } from '../context/BmiContext';
import {TagGroup, Tag, Nav, Table, FlexboxGrid, Modal, Button, List, ButtonToolbar, Placeholder, Input, InputGroup, IconButton, Loader } from 'rsuite';
import {formatNumber, capitalizeAllWords, convertString} from './textFunc'


const SportSearch = ({ addedFoods, addedSports }) => {

    const AddedSportsList = () => {
        return addedSports.map((item, index) => (

            <Tag size="lg" key={index} >
                <p>{capitalizeAllWords(item.name)} - {formatNumber(item.durationMinutes)}m </p>
            </Tag>
        ));
    };

    const AddedFoodsList = () => {
        return addedFoods.map((item, index) => (

            <Tag size="lg" key={index} >
                <p>{capitalizeAllWords(item.name)} - {formatNumber(item.servingSizeG)}g </p>
            </Tag>
        ));
    };


    return (
        <div><p>this is a summary of your day</p>

            {addedSports.length > 0 && <h3>Added Sports:</h3>}
            <TagGroup>
                <AddedSportsList />
            </TagGroup>
            {addedFoods.length > 0 && <h3>Added Foods:</h3>}
            <TagGroup>
                <AddedFoodsList />
            </TagGroup>


        </div>
    );

}

export default React.memo(SportSearch);