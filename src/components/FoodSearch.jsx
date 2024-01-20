import React from 'react';

//rsuite components
import { Badge, Notification, TagGroup, Tag, Table, Modal, Button, List, Placeholder, InputGroup, IconButton, Loader, Panel } from 'rsuite';
const { Column, HeaderCell, Cell } = Table; // dest. for ez use

//shared ressources  1. format functions 2. api&related functions 3. Rsuit Icons 4. toast
import { formatNumber, capitalizeAllWords, convertString } from './textFunc'
import { useSWR, fetcher, DebounceInput, useDebounce } from './apiFunc'
import { EditIcon, TrashIcon, SearchIcon, MinusIcon } from './icons'
import { useToast } from './useToast';

//css
import '../Style/Search.css'

// component Start
const FoodSearch = ({ searchTerm, setSearchTerm, addedFoods, setAddedFoods }) => {

    //toast
    const showToast = useToast();

    // debounce (delayed input)
    const [debouncedSearchTerm] = useDebounce(searchTerm, 2000);

    // food vars
    const [selectedFood, setSelectedFood] = React.useState(null);
    const [tempServingSizeG, setTempServingSizeG] = React.useState('');

    // Modal  vars
    const [open, setOpen] = React.useState(false);
    const [detailMode, setDetailMode] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setSelectedFood(null);
        setDetailMode(false);
        setTempServingSizeG('');
    };

    // fetching for the initial food list
    const FoodList = () => {
        const { data, error, isLoading } = useSWR(debouncedSearchTerm ? `https://api.api-ninjas.com/v1/nutrition?query=${debouncedSearchTerm}` : null, fetcher);
        if (error) {
            console.log(error)
            return <div>Failed to load</div>
        };
        if (isLoading)
            return (
                <div>
                    <Placeholder.Paragraph rows={15} />
                    <Loader center content="loading" />
                </div>
            );
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
            }));

            return (
                <>
                    {data.length > 0 ? (
                        <Table
                            height={(data.length * 45) + 50}
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
                                <HeaderCell>per 100g</HeaderCell>
                                <Cell>
                                    {rowData => capitalizeAllWords(rowData.name)}
                                </Cell>
                            </Column>
                            <Column >
                                <HeaderCell>Carbohydrates</HeaderCell>
                                <Cell dataKey="carbohydratesTotalG" />
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

                    ) : (<Notification className='noResult' type="info" header="no results found">

                    </Notification>)}

                </>
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
                    <IconButton icon={<MinusIcon />} onClick={() => setSearchTerm('')} />
                </InputGroup.Addon>
            </InputGroup>
            <FoodList />

            {addedFoods.length > 0 &&
                <Panel defaultExpanded header={<><Badge color="blue" content={addedFoods.length} > <Button appearance="ghost" size='lg'>Added Meal's</Button>  </Badge></>} collapsible>
                    <TagGroup>
                        <AddedFoodsList />
                    </TagGroup>
                </Panel>
            }

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
                    {!detailMode && (
                        <Button onClick={() => {
                            const newServingSizeG = parseFloat(tempServingSizeG);

                            // Check if newServingSizeG is a valid positive number
                            if (isNaN(newServingSizeG) || newServingSizeG <= 0) {

                                showToast('error', `Serving size must be atleast 1g`);
                            } else {
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

                                // Close the modal
                                handleClose();
                            }
                        }}>
                            Ok
                        </Button>
                    )}

                    <Button onClick={handleClose} appearance="subtle">
                        {detailMode ? "Close" : "Cancel"}
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default React.memo(FoodSearch);
