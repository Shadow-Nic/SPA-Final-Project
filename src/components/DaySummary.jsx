import React, { useContext } from 'react';
import { BmiContext } from '../context/BmiContext';

import { TagGroup, Tag, Button } from 'rsuite';
import { formatNumber, capitalizeAllWords, cutDate } from './textFunc'

import { useToast } from './useToast';



const SportSearch = ({ addedFoods, addedSports, pickDate }) => {

    //toast
    const showToast = useToast();
    //context and dispatch
    const { dispatch, selectedProfile } = useContext(BmiContext);
    let fDate = cutDate(pickDate);
    const updateDay = () => {
        dispatch({
            type: 'ADD_DAY',
            payload: {
                profileId: selectedProfile.id,
                dayData: {
                    date: fDate,
                    sports: addedSports,
                    foods: addedFoods
                }
            }
        });
        showToast('success', `Updated: ${fDate}`);
    };

    // sport summary
    const AddedSportsList = () => {
        return addedSports.map((item, index) => (

            <Tag size="lg" key={index} >
                <p>{capitalizeAllWords(item.name)} - {formatNumber(item.durationMinutes)}m </p>
            </Tag>
        ));
    };

    // food summary
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

            <p>note you will not </p>
            <Button onClick={updateDay}>update my Day!</Button>

        </div>


    );

}

export default React.memo(SportSearch);