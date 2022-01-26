import React, { useState, useEffect } from "react";

import "components/Application.scss";
import "components/Appointments";
import DayList from "./DayList";
import Appointment from "./Appointments";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  const setDay = day => setState({ ...state, day });
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: []
  });

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
   
    return axios.put(`/api/appointments/${id}`, appointment).then(res => {
      console.log(res);
      setState(prevState => ({ ...prevState, appointments }));
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

  return axios.delete(`/api/appointments/${id}`).then(res => {
    console.log(res);
    setState(prevState => ({ ...prevState, appointments }));
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

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
  if (state.day === "Tuesday"){
    console.log("appoinemnt", appointment, interview)

  }

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview = {bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });
     
  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu"><DayList days={state.days} value={state.day} onChange={setDay} /></nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
      {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}