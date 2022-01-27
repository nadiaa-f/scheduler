//bookinterview
//cancelinterview
//setday
///state 
import {useEffect, useState} from "react";
import axios from "axios";

export default function useApplicationData(props) {
  const setDay = day => setState({ ...state, day });
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: []
  });
  
  const bookInterview = (id, interview, mode) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    let dayId = 0;
    for (const day in state.days) {
      if (state.days[day].name === state.day) {
        dayId = day;
      }
    }
    return axios.put(`/api/appointments/${id}`, appointment).then(res => {
      console.log(res);
      const days = state.days;
      if (mode === 'CREATE') {
        days[dayId].spots -= 1;
      }
      setState(prevState => ({ ...prevState, appointments, days }));
    });
  };

const cancelInterview = id => {
  const appointment = {
    ...state.appointments[id],
    interview: null,
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment,
  };
  let dayId = 0;
    for (const day in state.days) {
      if (state.days[day].name === state.day) {
        dayId = day;
      }
    }
  return axios.delete(`/api/appointments/${id}`).then(res => {
    console.log(res);
    const days = state.days;
    days[dayId].spots += 1;
    setState(prevState => ({ ...prevState, appointments, days }));
  });
};

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ])
    .then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
     })
  }, []);
  return { state, setDay, bookInterview, cancelInterview };
}
