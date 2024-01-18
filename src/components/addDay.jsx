import React, { useState, useContext } from 'react';
import { BmiContext } from '../context/BmiContext';
import useSWR from 'swr';
import { useDebounce } from 'use-debounce';
import { Nav, Table, FlexboxGrid, Modal, Button, List, ButtonToolbar, Placeholder, Input, InputGroup, IconButton, Loader } from 'rsuite';
const { Column, HeaderCell, Cell } = Table;

///icons
import CloseIcon from '@rsuite/icons/Close';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import EditIcon from '@rsuite/icons/Edit';
import TrashIcon from '@rsuite/icons/Trash'

    ;
import FoodSearch from './FoodSearch';
import SportSearch from './SportSearch';

//icon end

function addDay() {
    const [searchTerm, setSearchTerm] = useState('');
    const [addedFoods, setAddedFoods] = useState([]);
    const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);


    const { dispatch, state, selectedProfile } = useContext(BmiContext);

    const [active, setActive] = useState('food');


    const [activityData, setActivityData] = useState([]);






    const Tabbar = ({ active, onSelect, ...props }) => {
        return (
            <div>
                <Nav {...props} activeKey={active} onSelect={onSelect}>
                    <Nav.Item eventKey="food" >
                        🌮 Food 🍕
                    </Nav.Item>
                    <Nav.Item eventKey="sport"> 🚴🏼 Activity 🤸🏽‍♀️</Nav.Item>
                </Nav>
                {active == 'food' && <FoodSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} addedFoods={addedFoods} setAddedFoods={setAddedFoods} />}
                {active == 'sport' && <SportSearch activityData={activityData} setActivityData={setActivityData} />}
            </div>
        );
    };

    const FoodList = () => {
        const { data, error, isLoading } = useSWR(debouncedSearchTerm ? `https://api.api-ninjas.com/v1/nutrition?query=${debouncedSearchTerm}` : null, fetcher);

        if (error) {
            console.log(error)
            return <div>Failed to load</div>
        };
        if (isLoading) return <div>   <Placeholder.Paragraph rows={8} />
            <Loader center content="loading" /></div>;

        if (Array.isArray(data)) {
            const food = data.map((item) => ({
                name: item.name,
                calories: item.calories,
                servingSizeG: item.serving_size_g,
                fatTotalG: item.fat_total_g,
                // Add other properties as needed
            }));

            return (
                <Table
                    height={400}
                    data={food}
                    onRowClick={rowData => {
                        const existingFood = addedFoods.find(food => food.name === rowData.name);
                        if (existingFood) {
                            setSelectedFood(existingFood);
                            handleOpen();
                        } else {
                            setAddedFoods([...addedFoods, rowData]);
                        }
                    }}
                >
                    <Column >
                        <HeaderCell>Name</HeaderCell>
                        <Cell>
                            {rowData => capitalizeAllWords(rowData.name)}
                        </Cell>
                    </Column>
                    <Column >
                        <HeaderCell>Serving (g)</HeaderCell>
                        <Cell dataKey="servingSizeG" />
                    </Column>
                    <Column >
                        <HeaderCell>Calories</HeaderCell>
                        <Cell dataKey="calories" />
                    </Column>
                    <Column >
                        <HeaderCell>Total Fat (g)</HeaderCell>
                        <Cell dataKey="fatTotalG" />
                    </Column>
                </Table>


            );
        }
    };

    const AddedFoodsList = () => {
        return addedFoods.map((item, index) => (
            <div key={index}>
                <p>{capitalizeAllWords(item.name)} - {formatNumber(item.servingSizeG)}g </p>

                <IconButton icon={<EditIcon />} onClick={() => {
                    setSelectedFood(item);
                    handleOpen();
                }} />
                <IconButton icon={<TrashIcon />} onClick={() => {
                    const updatedFoods = addedFoods.filter((_, i) => i !== index);
                    setAddedFoods(updatedFoods);
                }} />
            </div>
        ));
    };

    return (
        <div className='addDay'>
            <Tabbar appearance="tabs" active={active} onSelect={setActive} />
        </div>
    );
}

export default addDay;