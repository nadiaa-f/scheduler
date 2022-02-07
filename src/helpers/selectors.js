export function getAppointmentsForDay(state, day) {
  let allAppointmentsArray = []; 
  let appointments = []
  for (let days of state.days) {
    if (days.name === day) {
      allAppointmentsArray = days.appointments
    }
  }
  for (let a = 0; a < allAppointmentsArray.length; a++) {
    appointments.push(state.appointments[allAppointmentsArray[a]])
  }
  return appointments;
}

export function getInterview(state, interview) {
  if (interview) {
    return {
      interviewer: state.interviewers[interview.interviewer],
      student: interview.student,
    };
  }
  return null;
};

export function getInterviewersForDay(state, day) {
  const interviewersArray = [];
  for (const item of state.days) {
    if (item.name === day) {
      for (const interviewer of item.interviewers) {
        interviewersArray.push(state.interviewers[interviewer])
      }
    }
  }
  return interviewersArray;
}