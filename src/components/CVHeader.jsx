import Section from './Section';

function ContactDetails() {
  return (
    <div>
      <p>Somewhere in town, 55O-OXX</p>
      <p>
        <span>
          <b>M:</b> 555-555-555{' '}
        </span>
        <span>
          <b>E:</b> kpulawski13@gmail.com
        </span>
      </p>
    </div>
  );
}

function CVHeader() {
  return (
    <>
      <Section>
        <h1>Name Surname</h1>
        <ContactDetails />
      </Section>
    </>
  );
}

export default CVHeader;
