import { useState, useEffect } from "react";
import axios from "axios";


// states stored here and retrieval/editing functions 
export default function useApplicationData() {
  const setDay = day => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: []
  });

  // retrieves all data from api
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

  // books interview
  function bookInterview(id, interview, callback, errCallback, mode) {
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

    // updates the database
    axios.put(`/api/appointments/${id}`, appointment)
      .then(res => {
        const days = state.days;
        if (mode === 'CREATE') {
          days[dayId].spots -= 1;
        }
        setState({
          ...state,
          appointments
        });
        callback();
      })
      .catch(err => errCallback());

  }

  // cancels interview
  function cancelInterview(id, callback, errCallback) {
    let dayId = 0;
    for (const day in state.days) {
      if (state.days[day].name === state.day) {
        dayId = day;
      }
    }
    axios.delete(`/api/appointments/${id}`)
      .then(res => {
        const days = state.days;
        days[dayId].spots += 1;
        setState({
          ...state
        })
        callback();
      })
      .catch(err => errCallback());

  }

  return {state, setDay, bookInterview, cancelInterview};
}