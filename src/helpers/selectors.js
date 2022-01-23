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
  let results = null;
  if (!interview) {
    return results;
  }
  for (const person in state.interviewers) {
    if (person === interview.interviewer) {
      results = {student: interview.student, interviewer: state.interviewers[person]};
    }
  }
  return results;
}