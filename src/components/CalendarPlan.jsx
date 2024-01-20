import { Calendar, Badge } from 'rsuite'
import { calculateCalories } from './getChartData';
import { BmiContext } from '../context/BmiContext';
import { useContext } from 'react';

function getTodoList(date) {
  const day = date.getDate();

  switch (day) {
    case 10:
      return [

      ];
    case 15:
      return [

      ];
    default:
      return [];
  }
}

function getDayIndex(date) {
  const { selectedProfile } = useContext(BmiContext);
  date = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  }).replace(/(\d{2})\/(\d{2})\/(\d{2})/, "$1.$2.$3");
  const dayIndex = selectedProfile.days.findIndex(day => day.date === date);
  return dayIndex
}

const CalendarPlan = () => {
  const { selectedProfile } = useContext(BmiContext);

  function renderCell(date) {
    const list = getTodoList(date);
    const dayIndex = getDayIndex(date)
    if (dayIndex !== -1) {
      const { goalReached } = calculateCalories(selectedProfile.days[dayIndex]?.foods, selectedProfile.days[dayIndex]?.sports);
      if (goalReached !== undefined) {
        return <Badge style={{ background: 'transparent' }} content={goalReached ? '😊' : '😠'} />;
      }
    }

    if (list.length) {
      return <Badge className="calendar-todo-item-badge" />;
    }


    return null;
  }

  return (
    <div className='calendar'>
      <Calendar compact bordered renderCell={renderCell} />
    </div>
  );
};

export default CalendarPlan