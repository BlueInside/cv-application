import Section from './Section';
import Button from './Button';
import { useState } from 'react';
import EducationForm from './EducationForm';
import { educationData } from './data';

let count = 0;

function EducationSection() {
  const [education, setEducation] = useState(educationData);
  // SHOULD I USE EDIT ?
  const [editEducationId, setEditEducationId] = useState('');
  const [state, setState] = useState('view');

  const editEducation = education.filter(
    (item) => item.id === editEducationId
  )[0];
  const isAdding = state === 'add';
  const isEdditing = state === 'edit';
  const isViewing = state === 'view';

  //JUST FINISHED THIS
  function handleSubmitForm(newEducation) {
    if (isAdding) {
      newEducation.id = count += 1;
      setEducation([...education, newEducation]);
    } else if (isEdditing) {
      const updatedEducations = education.map((obj) => {
        if (obj.id === editEducationId) {
          return newEducation;
        } else return obj;
      });
      setEducation(updatedEducations);
    }
  }

  function handleCloseForm(e) {
    e.preventDefault(), setState('view');
  }

  function School({ education }) {
    function handleClick(e) {
      setEditEducationId(education.id);
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
      {isAdding && (
        <EducationForm
          state={'adding'}
          submitForm={handleSubmitForm}
          closeForm={handleCloseForm}
        />
      )}
      {/* TODO IMPLEMENT EDIT  */}
      {isEdditing && (
        <EducationForm
          state={'editing'}
          submitForm={handleSubmitForm}
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
