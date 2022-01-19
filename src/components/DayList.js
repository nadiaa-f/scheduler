import React from "react";
import DayListItem from "./DayListItem";


export default function DayList({days, setDay, name}) {
  return (
    <ul>        
      {days.map(day => <DayListItem 
      name={day.name}
      spots= {day.spots}
      selected= {day.name === name}
      setDay = {setDay} />)}</ul>
  );
  }