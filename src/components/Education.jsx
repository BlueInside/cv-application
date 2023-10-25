import Section from './Section';
import Button from './Button';
import { useState } from 'react';
import EducationForm from './EducationForm';

let count = 0;
const educationData = [
  {
    id: 0,
    schoolName: 'Secondary school named "Tadeusza Kosciuszki" Poland',
    title: 'Matriculation Certificate',
    date: 'June 2015',
    description:
      'Completed secondary education with a focus on mathematics and geography, achieving the Matriculation Certificate, equivalent to a high school diploma in Poland.',
  },
];

function School({ education }) {
  function handleClick(e) {
    console.log(education);
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

function EducationSection() {
  const [education, setEducation] = useState(educationData);
  // SHOULD I USE EDIT ?
  const [editEducationId, setEditEducationId] = useState(0);
  const [state, setState] = useState('view');

  const isAdding = state === 'add';
  const isEdditing = state === 'edit';
  const isViewing = state === 'view';

  function handleSubmitForm(newEducation) {
    newEducation.id = count += 1;
    setEducation([...education, newEducation]);
  }

  return (
    <Section>
      {isAdding && (
        <EducationForm
          state={'adding'}
          submitForm={handleSubmitForm}
          closeForm={(e) => {
            e.preventDefault(), setState('view');
          }}
        />
      )}
      {/* TODO IMPLEMENT EDIT  */}
      <h2>Education</h2>
      <Button text={'+'} handleClick={() => setState('add')} />
      {education.map((education) => (
        <School key={education.id} education={education} />
      ))}
    </Section>
  );
}

export default EducationSection;
