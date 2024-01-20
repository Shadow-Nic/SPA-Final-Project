import { Calendar, Badge } from 'rsuite';
import { calculateDayCalories } from './getChartData';

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

function getEmoji(date = new Date()) {
  const { goalCalories, achievedCalories } = calculateDayCalories(date);
  return achievedCalories > goalCalories ? '😠' : '😊';
 }
 
 
 const CalendarPlan = () => {
  function renderCell(date) {
     const list = getTodoList(date);
     const emoji = getEmoji(date);
 
     if (list.length) {
       return <Badge className="calendar-todo-item-badge">{emoji}</Badge>;
     }
 
     return null;
  }
 
  return (
     <div className='calendar'>
       <Calendar compact bordered renderCell={renderCell} />
     </div>
  );
 };
 
 export default CalendarPlan;