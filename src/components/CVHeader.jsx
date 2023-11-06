/* eslint-disable react/prop-types */
import Section from './Section';
import { useState } from 'react';
import Button from './Button';
import '../styles/cvHeader.css';
import '../styles/buttons.css';

import { formatLabel } from './utils';
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
  const { address, postCode, mobile, email } = user;

  let county = user.county !== '' ? user.county + ',' : '';

  return (
    <div className="about">
      <p>
        {address}, {county} {postCode}
      </p>
      <p className="contact">
        <span>
          <b>M:</b> {mobile}{' '}
        </span>
        <span>
          <b>E:</b> {email}
        </span>
      </p>
    </div>
  );
}

function EditUserInfoFields({ user, handleInputChange, handleClick }) {
  return (
    <>
      <div className="backdrop"> </div>
      <div className="headerInputs">
        {inputFields.map((input) => (
          <label key={input.index}>
            {formatLabel(input.value)}:
            <input
              className="headerInput"
              placeholder={input.value}
              value={user[input.value]}
              onChange={(e) => handleInputChange(e, input.value)}
            />
          </label>
        ))}
        <Button
          text={'Save'}
          color={'white'}
          handleClick={handleClick}
          className={'saveButton'}
        />
      </div>
    </>
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
  const editOrCloseButtonText = isEditing ? 'Close' : 'Edit';
  return (
    <>
      <Section className="header">
        {isEditing && (
          <EditUserInfoFields
            user={user}
            handleClick={handleClick}
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
        <Button
          className={'button editHeaderButton'}
          handleClick={handleClick}
          text={editOrCloseButtonText}
        />
      </Section>
    </>
  );
}

export default CVHeader;
