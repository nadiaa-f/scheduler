import React from "react";
import DayListItem from "./DayListItem";


export default function DayList({days, onChange, value}) {
  return (
    <ul>        
      {days.map(day => <DayListItem
      name={day.name}
      spots= {day.spots}
      selected= {day.name === value}
      setDay = {onChange} />)}</ul>
  );
  }