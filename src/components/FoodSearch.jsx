import React, { useState, useContext, useEffect } from 'react';
import useSWR from 'swr';
import { useDebounce } from 'use-debounce';
import { Tooltip, Whisper, TagGroup, Tag, Nav, Table, FlexboxGrid, Modal, Button, List, ButtonToolbar, Placeholder, Input, InputGroup, IconButton, Loader } from 'rsuite';
const { Column, HeaderCell, Cell } = Table;

import { DebounceInput } from 'react-debounce-input';

///icons
import CloseIcon from '@rsuite/icons/Close';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import EditIcon from '@rsuite/icons/Edit';
import TrashIcon from '@rsuite/icons/Trash';
import SearchIcon from '@rsuite/icons/Search';

import '../Style/FoodSearch.css';



//icon end

const FoodSearch = ({ searchTerm, setSearchTerm, addedFoods, setAddedFoods }) => {

    const [debouncedSearchTerm] = useDebounce(searchTerm, 2000);

    const [detailMode, setDetailMode] = React.useState(false);


    const [selectedFood, setSelectedFood] = React.useState(null);
    const [tempServingSizeG, setTempServingSizeG] = React.useState('');

    const apiKey = 'hWdaj14WL8WDgVYei8imulkY2hKH8uxTfiDUvVHP';

    const [open, setOpen] = React.useState(false);


    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setSelectedFood(null);
        setDetailMode(false);
        setTempServingSizeG('');
    };

    const fetcher = async (url) => {
        const res = await fetch(url, {
            method: 'GET',
            headers: { 'X-Api-Key': apiKey },
            contentType: 'application/json',
        });
        if (!res.ok) throw new Error(res.status);
        return res.json();
    };

    function formatNumber(num) {
        let numStr = parseFloat(num).toFixed(2);
        numStr = numStr.replace(/\.00$/, '');
        return numStr;
    }

    function capitalizeAllWords(str) {
        return str.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    function convertString(str) {
        return str.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
            .replace(/G|M/, ' $&').replace(/G|Mg/g, match => ` (${match.toLowerCase()})`);
    }


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
                fatSaturatedG: item.fat_saturated_g,
                proteinG: item.protein_g,
                sodiumMg: item.sodium_mg,
                potassiumMg: item.potassium_mg,
                cholesterolMg: item.cholesterol_mg,
                carbohydratesTotalG: item.carbohydrates_total_g,
                fiberG: item.fiber_g,
                sugarG: item.sugar_g
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

            <Tag size="lg" key={index} >
                <p>{capitalizeAllWords(item.name)} - {formatNumber(item.servingSizeG)}g </p>

                <IconButton size='sm' icon={<EditIcon />} onClick={() => {
                    setSelectedFood(item);
                    handleOpen();
                }} />
                <IconButton size='sm' icon={<TrashIcon />} onClick={() => {
                    const updatedFoods = addedFoods.filter((_, i) => i !== index);
                    setAddedFoods(updatedFoods);
                }} />
                <IconButton size='sm' icon={<SearchIcon />} onClick={() => {
                    setSelectedFood(item);
                    setDetailMode(true);
                    setOpen(true);
                }} />

            </Tag>
        ));
    };

    return (
        <div>
            <InputGroup>
                <DebounceInput
                    className="searchInput"
                    type="text"
                    placeholder="Search for food..."
                    minLength={1}
                    debounceTimeout={2000}
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                <InputGroup.Addon>
                    <IconButton icon={<CloseIcon />} onClick={() => setSearchTerm('')} />
                </InputGroup.Addon>
            </InputGroup>
            <FoodList />
            {addedFoods.length > 0 && <h3>Added Foods:</h3>}
            <TagGroup>
                <AddedFoodsList />
            </TagGroup>


            <Modal
                open={open}
                onClose={handleClose}
                className={detailMode ? 'modalDetail' : 'modalPop'}
            >
                <Modal.Header>
                    <Modal.Title>{detailMode ? `${capitalizeAllWords(selectedFood.name)}'s nutrient table` : 'Change Serving size (g)'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {detailMode ? (
                        <>
                            <List>
                                {Object.entries(selectedFood).map(([key, value], index) => {
                                    if (index > 0) {
                                        return (
                                            <List.Item key={index}>
                                                {`${convertString(key)}: ${formatNumber(value)}`}
                                            </List.Item>
                                        );
                                    }
                                })}
                            </List>



                        </>
                    ) : (
                        <input
                            type="number"
                            value={tempServingSizeG}
                            onChange={(e) => setTempServingSizeG(e.target.value)}
                        />
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {
                        // Only perform the following actions if in edit mode
                        if (!detailMode) {
                            const newServingSizeG = parseFloat(tempServingSizeG);

                            // Calculate proportions
                            const proportion = newServingSizeG / selectedFood.servingSizeG;

                            // Calculate new nutrient values
                            const newCalories = selectedFood.calories * proportion;
                            const newFatTotalG = selectedFood.fatTotalG * proportion;
                            const newFatSaturatedG = selectedFood.fatSaturatedG * proportion;
                            const newProteinG = selectedFood.proteinG * proportion;
                            const newSodiumMg = selectedFood.sodiumMg * proportion;
                            const newPotassiumMg = selectedFood.potassiumMg * proportion;
                            const newCholesterolMg = selectedFood.cholesterolMg * proportion;
                            const newCarbohydratesTotalG = selectedFood.carbohydratesTotalG * proportion;
                            const newFiberG = selectedFood.fiberG * proportion;
                            const newSugarG = selectedFood.sugarG * proportion;

                            // Update the food item
                            const updatedItem = {
                                ...selectedFood,
                                servingSizeG: newServingSizeG,
                                calories: newCalories,
                                fatTotalG: newFatTotalG,
                                fatSaturatedG: newFatSaturatedG,
                                proteinG: newProteinG,
                                sodiumMg: newSodiumMg,
                                potassiumMg: newPotassiumMg,
                                cholesterolMg: newCholesterolMg,
                                carbohydratesTotalG: newCarbohydratesTotalG,
                                fiberG: newFiberG,
                                sugarG: newSugarG
                            };

                            const updatedFoods = addedFoods.map(food => food.name === selectedFood.name ? updatedItem : food);
                            setAddedFoods(updatedFoods);
                        }
                        // Always close the modal
                        handleClose();
                    }}>
                        Ok
                    </Button>
                    <Button onClick={handleClose} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default React.memo(FoodSearch);
