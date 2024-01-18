import React, { useState } from 'react';
import { Table, Column, HeaderCell, Cell } from 'rsuite';
import { IconButton } from 'rsuite';
import useSWR from 'swr';
import { useDebounce } from 'use-debounce';
import CloseIcon from '@rsuite/icons/Close';
import EditIcon from '@rsuite/icons/Edit';
import TrashIcon from '@rsuite/icons/Trash';

function FoodSearch({ searchTerm, setAddedFoods }) {
    const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);
    const [addedFoods, setLocalAddedFoods] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);
    const [tempServingSizeG, setTempServingSizeG] = useState('');

    const apiKey = 'hWdaj14WL8WDgVYei8imulkY2hKH8uxTfiDUvVHP';

    const [open, setOpen] = useState(false);

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

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setSelectedFood(null);
        setTempServingSizeG('');
    };

    const { data, error, isLoading } = useSWR(debouncedSearchTerm ? `https://api.api-ninjas.com/v1/nutrition?query=${debouncedSearchTerm}` : null, fetcher);

    if (error) {
        console.log(error)
        return <div>Failed to load</div>
    };
    if (isLoading) return <div><Placeholder.Paragraph rows={8} /><Loader center content="loading" /></div>;

    if (Array.isArray(data)) {
        const food = data.map((item) => ({
            name: item.name,
            calories: item.calories,
            servingSizeG: item.serving_size_g,
            fatTotalG: item.fat_total_g,
        }));

        return (
            <>
                <Table
                    height={400}
                    data={food}
                    onRowClick={rowData => {
                        const existingFood = addedFoods.find(food => food.name === rowData.name);
                        if (existingFood) {
                            setSelectedFood(existingFood);
                            handleOpen();
                        } else {
                            setLocalAddedFoods([...addedFoods, rowData]);
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
                {addedFoods.length > 0 && <h3>Added Foods:</h3>}
                {addedFoods.map((item, index) => (
                    <div key={index}>
                        <p>{capitalizeAllWords(item.name)} - {formatNumber(item.servingSizeG)}g </p>

                        <IconButton icon={<EditIcon />} onClick={() => {
                            setSelectedFood(item);
                            handleOpen();
                        }} />
                        <IconButton icon={<TrashIcon />} onClick={() => {
                            const updatedFoods = addedFoods.filter((_, i) => i !== index);
                            setLocalAddedFoods(updatedFoods);
                            setAddedFoods(updatedFoods);
                        }} />
                    </div>
                ))}
                <Modal open={open} onClose={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Change Serving size</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input
                            type="number"
                            value={tempServingSizeG}
                            onChange={(e) => setTempServingSizeG(e.target.value)}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => {
                            const newServingSizeG = parseFloat(tempServingSizeG);
                            const newCalories = (selectedFood.calories / selectedFood.servingSizeG) * newServingSizeG;
                            const newFatTotalG = (selectedFood.fatTotalG / selectedFood.servingSizeG) * newServingSizeG;
                            const updatedItem = { ...selectedFood, servingSizeG: newServingSizeG, calories: newCalories, fatTotalG: newFatTotalG };
                            const updatedFoods = addedFoods.map(food => food.name === selectedFood.name ? updatedItem : food);
                            setLocalAddedFoods(updatedFoods);
                            setAddedFoods(updatedFoods);
                            handleClose();
                        }}>
                            Ok
                        </Button>
                        <Button onClick={handleClose} appearance="subtle">
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    export default FoodSearch;
