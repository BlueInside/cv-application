import Section from './Section';
import Button from './Button';
import { useState } from 'react';

let count = 0;
const educationData = [
  {
    id: count++,
    schoolName: 'Secondary school named "Tadeusza Kosciuszki" Poland',
    title: 'Matriculation Certificate',
    date: 'June 2015',
    description:
      'Completed secondary education with a focus on mathematics and geography, achieving the Matriculation Certificate, equivalent to a high school diploma in Poland.',
  },
];

function School({ education }) {
  function handleClick(e) {}
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
      <Button text={'edit'} />
    </>
  );
}

function EducationSection() {
  const [education, newEdutacion] = useState(educationData);
  return (
    <Section>
      <h2>Education</h2>
      {education.map((education) => (
        <School key={education.id} education={education} />
      ))}
    </Section>
  );
}

export default EducationSection;
