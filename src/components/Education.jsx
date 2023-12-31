/* eslint-disable react/prop-types */
import Section from './Section';
import Button from './Button';
import { useState } from 'react';
import EducationForm from './EducationForm';
import { educationData } from './data';
import '../styles/education.css';
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
  // const isViewing = state === 'view';

  // Updates object in Education array after edit is done
  function handleEditForm(newEducation) {
    if (isEditing) {
      const updatedEducations = education.map((obj) => {
        if (obj.id === editEducationId) {
          return newEducation;
        } else return obj;
      });
      setState('view');
      setEducation(updatedEducations);
    }
  }
  // Adds new education on add to education state
  function handleSubmitForm(newEducation) {
    if (isAdding) {
      newEducation.id = count += 1;
      setState('view');
      setEducation([...education, newEducation]);
    }
  }

  function handleRemoveEducation(id) {
    let updatedEducation = [...education];
    updatedEducation = updatedEducation.filter(
      (education) => education.id !== id
    );
    setEducation(updatedEducation);
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
      <div className="description">
        <div className="educationSchoolTitleSection">
          <p style={{ flex: '3' }}>{education.schoolName}</p>
          <p style={{ flex: '1' }}>{education.title}</p>
        </div>
        <div className="educationDescriptionDateSection">
          <p>{education.description} </p>
          <p style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {education.date}
          </p>
        </div>
        <div className="buttonsWrapper">
          <Button text={'edit'} handleClick={handleClick} />
          <Button
            text={'remove'}
            handleClick={() => handleRemoveEducation(education.id)}
          />
        </div>
      </div>
    );
  }

  return (
    <Section className={'education'}>
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
      <hr className="separator"></hr>
      <div className="titleWrapper">
        <h2 className="title">Education</h2>
        <Button
          text={'+'}
          handleClick={() => setState('add')}
          className={'button addButton'}
        />
      </div>

      {education.map((education) => (
        <School key={education.id} education={education} />
      ))}
    </Section>
  );
}

export default EducationSection;
