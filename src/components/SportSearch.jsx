import React from 'react';

//rsuite components
import { TagGroup, Tag, Table, Modal, Button, List, Placeholder, InputGroup, IconButton, Loader } from 'rsuite';
const { Column, HeaderCell, Cell } = Table; // dest. for ez use

//shared ressources  1. format functions 2. api&related functions 3. Rsuit Icons
import { formatNumber, capitalizeAllWords, convertString } from './textFunc'
import { useSWR, fetcher, DebounceInput, useDebounce } from './apiFunc'
import { EditIcon, TrashIcon, SearchIcon, MinusIcon } from './icons'
//css
import '../Style/FoodSearch.css'

// component start
const SportSearch = ({ lbs, searchTerm, setSearchTerm, addedSports, setAddedSports }) => {

    // debounce (delayed input)
    const [debouncedSearchTerm] = useDebounce(searchTerm, 2000);

    // act vars
    const [selectedSport, setSelectedSport] = React.useState(null);
    const [tempDuration, setTempDuration] = React.useState('');

    // modal var
    const [open, setOpen] = React.useState(false);
    const [detailMode, setDetailMode] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setSelectedSport(null);
        setDetailMode(false);
        setTempDuration('');
    };

    // fetching for the initial sports list
    const SportList = () => {
        const { data, error, isLoading } = useSWR(debouncedSearchTerm ? `https://api.api-ninjas.com/v1/caloriesburned?activity=${debouncedSearchTerm}&weight=${lbs}&duration=10` : null, fetcher);
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
            const sport = data.map((item) => ({
                name: item.name,
                caloriesPerHour: item.calories_per_hour,
                durationMinutes: item.duration_minutes,
                totalCalories: item.total_calories
            }));
            return (
                <Table
                    height={400}
                    data={sport}
                    onRowClick={rowData => {
                        const existingSport = addedSports.find(sport => sport.name === rowData.name);
                        if (existingSport) {
                            setSelectedSport(existingSport);
                            handleOpen();
                        } else {
                            setAddedSports([...addedSports, rowData]);
                        }
                    }}
                >
                    <Column width={400} >
                        <HeaderCell>add 10 minutes with one tap, double tap to add more minutes</HeaderCell>
                        <Cell>
                            {rowData => capitalizeAllWords(rowData.name)}
                        </Cell>
                    </Column>
                </Table>
            );
        }
    };

    const AddedSportsList = () => {
        return addedSports.map((item, index) => (
            <Tag size="lg" key={index} >
                <p>{capitalizeAllWords(item.name)} - {formatNumber(item.durationMinutes)}m </p>

                <IconButton size='sm' icon={<EditIcon />} onClick={() => {
                    setSelectedSport(item);
                    handleOpen();
                }} />
                <IconButton size='sm' icon={<TrashIcon />} onClick={() => {
                    const updatedSports = addedSports.filter((_, i) => i !== index);
                    setAddedSports(updatedSports);
                }} />
                <IconButton size='sm' icon={<SearchIcon />} onClick={() => {
                    setSelectedSport(item);
                    setDetailMode(true);
                    setOpen(true);
                }} />
            </Tag>
        ));
    };
    /// Main Search input
    return (
        <div>
            <InputGroup>
                <DebounceInput
                    className="searchInput"
                    type="text"
                    placeholder="Search for activitys..."
                    minLength={1}
                    debounceTimeout={2000}
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                <InputGroup.Addon>
                    <IconButton icon={<MinusIcon />} onClick={() => setSearchTerm('')} />
                </InputGroup.Addon>
            </InputGroup>
            <SportList />
            {addedSports.length > 0 && <h3>Added Sports:</h3>}

            <TagGroup>
                <AddedSportsList />
            </TagGroup>

            <Modal
                open={open}
                onClose={handleClose}
                className={detailMode ? 'modalDetail' : 'modalPop'}
            >
                <Modal.Header>
                    <Modal.Title>{detailMode ? `${capitalizeAllWords(selectedSport.name)}'s stats` : 'Change Duration (minutes)'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {detailMode ? (
                        <>
                            <List>
                                {Object.entries(selectedSport).map(([key, value], index) => {
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
                            value={tempDuration}
                            onChange={(e) => setTempDuration(e.target.value)}
                        />
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {
                        // Only perform the following actions if in edit mode
                        if (!detailMode) {
                            const newDuration = parseFloat(tempDuration);

                            // Calculate proportions
                            const proportion = newDuration / selectedSport.durationMinutes;

                            const newDurationMinutes = selectedSport.durationMinutes * proportion;
                            const newTotalCalories = selectedSport.totalCalories * proportion;
                            // Update the sport item
                            const updatedItem = {
                                ...selectedSport,
                                durationMinutes: newDurationMinutes,
                                totalCalories: newTotalCalories,
                            };
                            const updatedSports = addedSports.map(sport => sport.name === selectedSport.name ? updatedItem : sport);
                            setAddedSports(updatedSports);
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

export default React.memo(SportSearch);
