import React, { useContext } from 'react';
import { BmiContext } from '../context/BmiContext';

import { TagGroup, Tag, Button, Divider } from 'rsuite';
import { formatNumber, capitalizeAllWords, cutDate } from './textFunc'

import { useToast } from './useToast';

//css
import '../Style/Search.css'



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
        showToast('success', `Updated ${fDate}`);
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
            <h4>Hey {capitalizeAllWords(selectedProfile.name)}, this is your summary!</h4>

            {addedSports.length > 0 && <Divider>Activitys</Divider>}
            <TagGroup>
                <AddedSportsList />
            </TagGroup>
            {addedFoods.length > 0 && <Divider>Meals</Divider>}
            <TagGroup>
                <AddedFoodsList />
            </TagGroup>

            <Divider />
            <Button color="green" appearance="primary" size='lg' className='bigButton' onClick={updateDay}>Confirm and update my Day!</Button>

        </div>


    );

}

export default React.memo(SportSearch);