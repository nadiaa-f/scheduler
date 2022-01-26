import React, { useState } from 'react';
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  const { interviewers, onSave, onCancel } = props;
const [student, setStudent] = useState(props.student || "");
const [interviewer, setInterviewer] = useState(props.interviewer || null);
const reset = function() {
  setStudent("");
  setInterviewer(null);
  }
const cancel = function() {
  reset();
  onCancel();
  }
const save = function() {
  onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off"onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value={student}
        onChange={event => setStudent(event.target.value)}
      />
       <InterviewerList 
    interviewers={interviewers} value={interviewer} onChange={setInterviewer}
    />
    </form>
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick={save}>Save</Button>
    </section>
  </section>
</main>
  )
}