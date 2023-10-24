import Section from './Section';

function School() {
  return (
    <>
      <p>School Name</p>
      <p>
        Title of Study <span>Date</span>
      </p>
      <p>Description</p>
    </>
  );
}

function EducationSection() {
  return (
    <Section>
      <h2>Education</h2>
      <School />
    </Section>
  );
}

export default EducationSection;
