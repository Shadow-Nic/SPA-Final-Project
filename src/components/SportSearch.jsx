import React from 'react';

//rsuite components
import { Notification, TagGroup, Tag, Table, Modal, Button, List, Placeholder, InputGroup, IconButton, Loader, Panel, Badge } from 'rsuite';
const { Column, HeaderCell, Cell } = Table; // dest. for ez use

//shared ressources  1. format functions 2. api&related functions 3. Rsuit Icons 4.Toast
import { formatNumber, capitalizeAllWords, convertString } from './textFunc'
import { useSWR, fetcher, DebounceInput, useDebounce } from './apiFunc'
import { EditIcon, TrashIcon, SearchIcon, MinusIcon } from './icons'
import { useToast } from './useToast';

//css
import '../Style/Search.css'

// component start
const SportSearch = ({ lbs, searchTerm, setSearchTerm, addedSports, setAddedSports }) => {

    //toast
    const showToast = useToast();

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
                <>
                    {data.length > 0 ? (
                        <Table
                            height={(data.length * 45) + 50}
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
                    ) : (<Notification className='noResult' type="info" header="no results found">

                    </Notification>)}

                </>
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
            <InputGroup className='searchGroup'>
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
            {addedSports.length > 0 &&
                <Panel defaultExpanded header={<><Badge color="blue" content={addedSports.length} > <Button appearance="ghost" size='lg'>Added Activity's</Button>  </Badge></>} collapsible>
                    <TagGroup>
                        <AddedSportsList />
                    </TagGroup>
                </Panel>
            }

            <Modal
                open={open}
                onClose={handleClose}
                className={detailMode ? 'modalDetailSport' : 'modalPop'}
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
                    {!detailMode && (
                        <Button onClick={() => {
                            const newDuration = parseFloat(tempDuration);

                            // Check if newDuration is a valid positive number
                            if (isNaN(newDuration) || newDuration <= 0) {
                                showToast('error', `Duration must be atlest 1 Minute`);
                            } else {
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

export default React.memo(SportSearch);
