/* eslint-disable react/prop-types */
import { useState } from 'react';
import Section from './Section';
import { formatDateToMonthYear } from './utils';
import { worksData } from './data';
import Button from './Button';
import DisplayWorkInputs from './DisplayWorkInputs';

// Used as key when creating new Job component
let count = 0;

// Render list element
function ResponsibilitiesList({ responsibility }) {
  return <li>{responsibility}</li>;
}

// Job component that render information about the job
function Job({ work }) {
  const { companyName, position, title, responsibilities, startDate, endDate } =
    work;

  const hasResponsibilities = responsibilities.length > 0;

  return (
    <>
      <p>{companyName}</p>
      <p>
        {formatDateToMonthYear(startDate)} - {formatDateToMonthYear(endDate)}
      </p>
      <p>{position}</p>
      <p>{title}</p>
      <p>{hasResponsibilities && 'Responsibilities: '}</p>
      <ul>
        {hasResponsibilities &&
          responsibilities.map((responsibility) => (
            <ResponsibilitiesList
              key={count++}
              responsibility={responsibility}
            />
          ))}
      </ul>
    </>
  );
}

function WorkExperience() {
  const [works, setWorks] = useState(worksData);
  const [editWorkId, setEditWorkId] = useState('');
  const [state, setState] = useState('view');
  const newWorkData = {
    companyName: '',
    position: '',
    startDate: '',
    endDate: '',
    title: '',
    responsibilities: [],
  };
  const selectedWorkObject = works.filter((work) => work.id === editWorkId)[0];
  const isEditing = state === 'edit';
  const isAdding = state === 'add';
  // FINISHED HERE NEXT ADD CHECKS TO THE OBJECT DON'T LET USER
  // Adds new works object into works array

  function addWork(workObject) {
    workObject.id = count++;
    const newWorksObject = [...works];
    newWorksObject.push(workObject);
    console.log(newWorksObject);
    setWorks(newWorksObject);
    setState('view');
  }

  // Replaces edited object into works array
  function editWork(editedWorkObject) {
    const newWorksArray = works.map((work) => {
      if (work.id === editedWorkObject.id) return editedWorkObject;
      return work;
    });
    setWorks(newWorksArray);
    setState('view');
  }

  // Handles cancel button, changes state to view hides form
  function handleCancelButton(e) {
    e.preventDefault();
    setState('view');
  }

  function handleEditButton(e, id) {
    e.preventDefault(e);
    setState('edit');
    setEditWorkId(id);
  }
  // companyName, position, title, responsibilities
  return (
    <>
      <Section className={'work'}>
        <hr className="separator"></hr>
        <h2>Practical Experience: </h2>
        <Button text={'+'} handleClick={() => setState('add')} />
        {(isAdding || isEditing) && (
          <DisplayWorkInputs
            work={isAdding ? newWorkData : selectedWorkObject}
            handleCancelButton={handleCancelButton}
            handleSaveButton={isEditing ? editWork : addWork}
          />
        )}

        {works.map((work) => (
          <div key={work.id}>
            <Job work={{ ...work }} />
            <Button
              text={'Edit'}
              handleClick={(e) => handleEditButton(e, work.id)}
            />
          </div>
        ))}
      </Section>
    </>
  );
}

export default WorkExperience;
