import React from "react";
import "components/Appointments/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview } = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW"; 
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

   //saves interview and transitions mode to saving
  function save(name, interviewer) {
    transition("SAVING");
    const interview = {
      student: name,
      interviewer
    };
    bookInterview(id, interview, function(){ transition("SHOW") }, function(){ transition("ERROR_SAVE") }, mode);
  }

  //cancels interview and transitions mode to deleting
  function trash() {
    transition("DELETING");
    cancelInterview(id, function(){ transition("EMPTY") }, function(){ transition("ERROR_DELETE", true) });
  }
  
  // rendering of appointment on current mode
   return (
      <article className="appointment" data-testid="appointment">
        <Header time={time} />
        {mode === EMPTY && <Empty onAdd={() => transition("CREATE")} />}
        {mode === SHOW && (
          <Show
            student={interview.student}
            interviewer={interview.interviewer}
            onDelete={() => transition("CONFIRM")}
            onEdit={() => transition("EDIT")}
          />
        )}
        {mode === EDIT && <Form name = {interview.student} interviewer = {interview.interviewer.id} interviewers = {interviewers} onCancel= {() => back()} onSave= {save}/>}
        {mode === CONFIRM && <Confirm message = "Are you sure you would like to delete?" onCancel={() => back()} onConfirm={() => trash()}/>}
        {mode === CREATE && <Form interviewers = {interviewers} onCancel= {() => back()} onSave= {save}/>}
        {mode === SAVING && <Status message = "Saving"/>}
        {mode === DELETING && <Status message = "Deleting"/>}
        {mode === ERROR_SAVE && <Error message = "Could not book appointment." onClose = {() => transition(CREATE)}/>}
        {mode === ERROR_DELETE && <Error message = "Could not cancel appointment." onClose= {() => transition(SHOW)}/>}
      </article>
   );
 }