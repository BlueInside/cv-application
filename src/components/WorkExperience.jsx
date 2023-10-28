import Section from './Section';

// Used as key when creating new Job component
let count = 0;
const data = [
  {
    id: 0,
  },
];
function JobResponsibilities() {
  return (
    <ul>
      <li>First Responsibility</li>
      <li>Second Responsibility</li>
      <li>Third Responsibility</li>
    </ul>
  );
}

function Job() {
  return (
    <>
      <p>Company Name</p>
      <p>position</p>
      <p>title</p>
      <p>responsibilities: </p>
      <JobResponsibilities />
    </>
  );
}

function WorkExperience() {
  return (
    <>
      <Section>
        <h2>Practical Experience: </h2>
        <Job />
      </Section>
    </>
  );
}

export default WorkExperience;
