import Section from './Section';
import { useState } from 'react';
import Button from './Button';

const inputFields = [
  { id: 'name' },
  { id: 'lastName' },
  { id: 'email' },
  { id: 'mobile' },
];
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
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: 'Karol',
    lastName: 'Pulawski',
    mobile: '555-555-555',
    email: 'kpulawski13@gmail.com',
  });

  function handleClick() {
    setIsEditing(!isEditing);
  }
  function handleInputChange(e, property) {
    const updatedUser = { ...user };
    updatedUser[property] = e.target.value;
    setUser(updatedUser);
  }

  return (
    <>
      <Section>
        {isEditing && (
          <div>
            {inputFields.map((input) => (
              <input
                key={input.id}
                value={user[input.id]}
                onChange={(e) => handleInputChange(e, input.id)}
              />
            ))}
          </div>
        )}

        <h1> {user.name + ' ' + user.lastName} </h1>
        <ContactDetails isEditing={isEditing} />
        <Button handleClick={handleClick} color="blue" text={'Edit'} />
        {isEditing && <Button color="red" text={'Submit'} />}
      </Section>
    </>
  );
}

export default CVHeader;
