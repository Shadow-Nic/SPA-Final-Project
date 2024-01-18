import React, { useState, useContext } from 'react';
import { BmiContext } from '../context/BmiContext';
import {TagGroup, Tag, Nav, Table, FlexboxGrid, Modal, Button, List, ButtonToolbar, Placeholder, Input, InputGroup, IconButton, Loader } from 'rsuite';
import {formatNumber, capitalizeAllWords, convertString, cutDate} from './textFunc'


const SportSearch = ({ addedFoods, addedSports, pickDate }) => {

    // context stuff

    const { dispatch, state, selectedProfile } = useContext(BmiContext);


    const updateDay = () => {
        dispatch({
            type: 'ADD_DAY',
            payload: {
                profileId: selectedProfile.id,
                dayData: {
                    date: cutDate(pickDate),
                    sports: addedSports,
                    foods: addedFoods
                }
            }
        });
    };

    //context stuff end

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
        <div>
            <h4>This is your summary {capitalizeAllWords(selectedProfile.name)}!</h4>

            {addedSports.length > 0 && <h3>Added Sports:</h3>}
            <TagGroup>
                <AddedSportsList />
            </TagGroup>
            {addedFoods.length > 0 && <h3>Added Foods:</h3>}
            <TagGroup>
                <AddedFoodsList />
            </TagGroup>


            <button onClick={updateDay}>update my Day!</button>
        </div>

        
    );

}

export default React.memo(SportSearch);