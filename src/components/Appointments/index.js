import React from "react";
import "components/Appointments/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview } = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW"; 
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

 const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    bookInterview(id, interview).then(() => transition(SHOW));
  }
  const deleteApptointment = () => {
    transition(DELETING);
    cancelInterview(id).then(() => transition(EMPTY));
  }
  
  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition("CREATE")} />}
        {mode === SHOW && (
          <Show
          student={interview}
          interviewer={interview}
          onDelete={deleteApptointment}
          />
        )}
            {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
          bookInterview={bookInterview}
        />
      )}
      {mode === SAVING && <Status message="Saving"/>}
      {mode === DELETING && <Status message="Deleting" />}
    </article>
   );
 } 