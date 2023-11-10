/* eslint-disable react/prop-types */
import { useState } from 'react';
import Section from './Section';
import { formatDateToMonthYear } from './utils';
import { worksData } from './data';
import Button from './Button';
import DisplayWorkInputs from './DisplayWorkInputs';
import '../styles/work.css';

// Used as key when creating new Job component
let count = 0;

// Render list element
function ResponsibilitiesList({ responsibility }) {
  return <li>- {responsibility}</li>;
}

// Job component that render information about the job
function Job({ work }) {
  const { companyName, position, responsibilities, startDate, endDate } = work;

  const hasResponsibilities = responsibilities.length > 0;

  return (
    <>
      <div className="workPositionSection">
        <p style={{ flex: '1' }}>{position}</p>
        <p>|</p>
        <p style={{ flex: '1' }}>
          {formatDateToMonthYear(startDate)} - {formatDateToMonthYear(endDate)}
        </p>
      </div>

      <p>
        <b>{companyName}</b>
      </p>

      {/* <p>{title}</p> */}
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
    // title: '',
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

  function handleRemoveButton(id) {
    const newWorksArr = works.filter((work) => work.id !== id);
    setWorks(newWorksArr);
  }
  // companyName, position, title, responsibilities
  return (
    <>
      <Section className={'work'}>
        <hr className="separator"></hr>
        <div className="titleWrapper">
          <h2 className="title">Practical Experience: </h2>
          <Button
            className="button addButton"
            text={'+'}
            handleClick={() => setState('add')}
          />
        </div>
        {(isAdding || isEditing) && (
          <DisplayWorkInputs
            isEditing={isEditing}
            isAdding={isAdding}
            work={isAdding ? newWorkData : selectedWorkObject}
            handleCancelButton={handleCancelButton}
            handleSaveButton={isEditing ? editWork : addWork}
          />
        )}

        {works.map((work) => (
          <div key={work.id} className="description">
            <Job work={{ ...work }} />
            <div className="buttonsWrapper">
              <Button
                text={'Edit'}
                handleClick={(e) => handleEditButton(e, work.id)}
              />
              <Button
                text={'Remove'}
                handleClick={() => handleRemoveButton(work.id)}
              />
            </div>
          </div>
        ))}
      </Section>
    </>
  );
}

export default WorkExperience;
