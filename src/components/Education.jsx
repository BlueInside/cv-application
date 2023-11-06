/* eslint-disable react/prop-types */
import Section from './Section';
import Button from './Button';
import { useState } from 'react';
import EducationForm from './EducationForm';
import { educationData } from './data';
import '../styles/CVHeader.css';
// Used as keys when creating new Education object
let count = 1;

function EducationSection() {
  const [education, setEducation] = useState(educationData);
  const [editEducationId, setEditEducationId] = useState('');
  const [state, setState] = useState('view');

  // Finds School component that we wants to edit;
  const editEducation = education.filter(
    (item) => item.id === editEducationId
  )[0];

  const isAdding = state === 'add';
  const isEditing = state === 'edit';
  const isViewing = state === 'view';

  // Updates object in Education array after edit is done
  function handleEditForm(newEducation) {
    if (isEditing) {
      const updatedEducations = education.map((obj) => {
        if (obj.id === editEducationId) {
          return newEducation;
        } else return obj;
      });
      setEducation(updatedEducations);
    }
  }
  // Adds new education on add to education state
  function handleSubmitForm(newEducation) {
    if (isAdding) {
      newEducation.id = count += 1;
      setEducation([...education, newEducation]);
    }
  }

  // Closes form, hides edit, add Education components by setting view state
  function handleCloseForm(e) {
    e.preventDefault(), setState('view');
  }

  // Displays education information
  function School({ education }) {
    // Handles edit button
    function handleClick() {
      // Finds edited education
      setEditEducationId(education.id);

      // Sets state to edit, show edit inputs
      setState('edit');
    }

    return (
      <>
        <div>
          <p>{education.schoolName}</p>
          <p>{education.title}</p>
        </div>
        <div>
          <p>{education.description} </p>
          <p>{education.date}</p>
        </div>
        <Button text={'edit'} handleClick={handleClick} />
      </>
    );
  }

  return (
    <Section>
      {/* Renders input fields to add new Education*/}
      {isAdding && (
        <EducationForm
          state={'adding'}
          submitForm={handleSubmitForm}
          closeForm={handleCloseForm}
        />
      )}
      {/* Renders edit input fields*/}
      {isEditing && (
        <EducationForm
          state={'editing'}
          submitForm={handleEditForm}
          closeForm={handleCloseForm}
          data={editEducation}
        />
      )}
      <h2>Education</h2>
      <Button text={'+'} handleClick={() => setState('add')} />
      {education.map((education) => (
        <School key={education.id} education={education} />
      ))}
    </Section>
  );
}

export default EducationSection;
