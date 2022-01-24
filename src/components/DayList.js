import React from "react";
import DayListItem from "./DayListItem";


export default function DayList({days, onChange, value}) {
  const parsedDayListItems = days.map(day => {
  return <DayListItem
      key={day.id}
      name={day.name}
      spots= {day.spots}
      selected= {day.name === value}
      setDay = {onChange} />
  });

  return (
    <ul>
      { parsedDayListItems }
    </ul>
  );
}