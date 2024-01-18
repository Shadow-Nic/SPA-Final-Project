import { Calendar, Badge } from 'rsuite';

function getTodoList(date) {
  const day = date.getDate();

  switch (day) {
    case 10:
      return [
        { time: '10:30 am', title: 'Meeting' },
        { time: '12:00 pm', title: 'Lunch' }
      ];
    case 15:
      return [
        { time: '09:30 pm', title: 'Products Introduction Meeting' },
        { time: '12:30 pm', title: 'Client entertaining' },
        { time: '02:00 pm', title: 'Product design discussion' },
        { time: '05:00 pm', title: 'Product test and acceptance' },
        { time: '06:30 pm', title: 'Reporting' },
        { time: '10:00 pm', title: 'Going home to walk the dog' }
      ];
    default:
      return [];
  }
}

const CalendarPlan = () => {
  function renderCell(date) {
    const list = getTodoList(date);

    if (list.length) {
      return <FaSmile size={19} color='#47d661' />;
    } else {
      return <FaFrown size={19} color='#df1111' />;
    }
  }
  return (
    <div className='calendar'>
      <Calendar compact bordered renderCell={renderCell} />{' '}
    </div>
  );
};

 export default CalendarPlan