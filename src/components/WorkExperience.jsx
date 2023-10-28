/* eslint-disable react/prop-types */
import Section from './Section';
import { formatDateToMonthYear } from './utils';

// Used as key when creating new Job component
let count = 0;

// Data with all the jobs
const worksData = [
  {
    id: 0,
    companyName: 'some company',
    position: 'janitor',
    startDate: '2023-05-18',
    endDate: '2023-10-23',
    title: 'quick-mop',
    responsibilities: [
      'first responsibility',
      'second responsibility',
      'third responsibility',
      'fourth responsibility',
    ],
  },
];

// Render list element
function ResponsibilitiesList({ responsibility }) {
  return <li>{responsibility}</li>;
}

// Job component that render information about the job
function Job({ work }) {
  const { id, companyName, position, title, responsibilities } = work;

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
            <ResponsibilitiesList key={id} responsibility={responsibility} />
          ))}
      </ul>
    </>
  );
}

function WorkExperience() {
  return (
    <>
      <Section>
        <h2>Practical Experience: </h2>
        {worksData.map((work) => (
          <Job key={work.id} work={{ ...work }} />
        ))}
      </Section>
    </>
  );
}

export default WorkExperience;
