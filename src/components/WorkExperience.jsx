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
  const { companyName, position, title, responsibilities } = work;

  // Formats date using date-fns
  const startDate = formatDateToMonthYear(work.startDate);
  const endDate = formatDateToMonthYear(work.endDate);

  const hasResponsibilities = responsibilities.length > 0;

  return (
    <>
      <p>{companyName}</p>
      <p>
        {startDate} - {endDate}
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
  const [state, setState] = useState('view');
  // const [worksId, setWorksId] = useState('');
  const newWorkData = {
    id: count++,
    companyName: '',
    position: '',
    startDate: '',
    endDate: '',
    title: '',
    responsibilities: ['', '', ''],
  };
  const isEditing = state === 'edit';
  const isAdding = state === 'add';

  // Adds new works object into works array
  function addWork(workObject) {
    workObject.id = count++;
    const newWorksObject = [...works, workObject];
    setWorks(newWorksObject);
  }

  // Replaces edited object into works array
  function editWork(editedWorkObject) {
    const newWorksArray = works.map((work) => {
      if (work.id === editedWorkObject.id) return editedWorkObject;
      return work;
    });
    setWorks(newWorksArray);
  }

  // Handles cancel button, changes state to view hides form
  function handleCancelButton(e) {
    e.preventDefault();
    setState('view');
  }
  // companyName, position, title, responsibilities
  return (
    <>
      <Section>
        <h2>Practical Experience: </h2>
        <Button text={'+'} handleClick={() => setState('add')} />
        {isAdding && (
          <DisplayWorkInputs
            work={newWorkData}
            handleCancelButton={handleCancelButton}
          />
        )}
        {works.map((work) => (
          <Job key={work.id} work={{ ...work }} />
        ))}
      </Section>
    </>
  );
}

export default WorkExperience;
