import Section from './Section';
import { useState } from 'react';
import Button from './Button';

const inputFields = [
  { value: 'name' },
  { value: 'surname' },
  { value: 'mobile' },
  { value: 'email' },
  { value: 'address' },
  { value: 'county' },
  { value: 'postCode' },
];
function ContactDetails({ user }) {
  return (
    <div>
      <p>
        {user.address}, {user.county !== '' && user.county + ','}{' '}
        {user.postCode}
      </p>
      <p>
        <span>
          <b>M:</b> {user.mobile}{' '}
        </span>
        <span>
          <b>E:</b> {user.email}
        </span>
      </p>
    </div>
  );
}

function EditUserInfoFields({ user, handleInputChange }) {
  return (
    <div>
      {inputFields.map((input) => (
        <input
          key={input.index}
          placeholder={input.value}
          value={user[input.value]}
          onChange={(e) => handleInputChange(e, input.value)}
        />
      ))}
    </div>
  );
}

function CVHeader() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: 'Karol',
    surname: 'Pulawski',
    mobile: '555-555-555',
    email: 'kpulawski13@gmail.com',
    address: 'Somewhere in Tow',
    county: 'Townshire',
    postCode: '555-ZZZ',
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
          <EditUserInfoFields
            user={user}
            handleInputChange={handleInputChange}
          />
        )}

        <h1> {user.name + ' ' + user.surname} </h1>
        <ContactDetails
          user={{
            mobile: user.mobile,
            email: user.email,
            address: user.address,
            postCode: user.postCode,
            county: user.county,
          }}
        />
        <Button handleClick={handleClick} color="blue" text={'Edit'} />
      </Section>
    </>
  );
}

export default CVHeader;
