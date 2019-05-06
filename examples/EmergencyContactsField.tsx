import * as React from 'react';
import { TypedFieldProxy } from '../src/types';
import { noopValueConverter, stringToIntValueConverter } from './helpers';
import {
  handleEmergencyContactChangeEvent,
  handleEmergencyContactAddEvent,
  handleEmergencyContactRemoveEvent,
} from './EmergencyContactsField.helpers';

export interface EmergencyContact {
  name: string;
  age?: number;
}

export interface EmergencyContactsFormValues {
  emergencyContacts: EmergencyContact[];
}

export interface ComponentFirstEmergencyContactFieldProps {
  fields: TypedFieldProxy<EmergencyContactsFormValues>;
  required?: boolean;
}

export const EmergencyContactsField: React.FC<
  ComponentFirstEmergencyContactFieldProps
> = ({ fields, required }) => {
  const EmergencyContactField = fields.emergencyContacts._getField();

  return (
    <EmergencyContactField
      validate={value =>
        required !== false && value.length < 1 ? 'Please add a friend' : ''
      }
    >
      {contactsProps => (
        <fieldset>
          {contactsProps.field.value.map((contactValue, index) => {
            const NameField = fields.emergencyContacts[
              index
            ]._childProxy.name._getField();
            const AgeField = fields.emergencyContacts[
              index
            ]._childProxy.age._getField();

            return (
              <fieldset key={index}>
                <legend>{contactValue.name || `Address ${index}`}</legend>
                <NameField>
                  {nameProps => {
                    const nameId = `${contactsProps.field.name}-${index}-${
                      nameProps.field.name
                    }`;

                    return (
                      <>
                        <label htmlFor={nameId}>Name</label>
                        <input
                          id={nameId}
                          name={`${contactsProps.field.name}[${index}][${
                            nameProps.field.name
                          }]`}
                          value={contactValue.name}
                          onChange={handleEmergencyContactChangeEvent<'name'>(
                            contactsProps,
                            nameProps,
                            index,
                            noopValueConverter
                          )}
                          placeholder="John Doe"
                        />
                      </>
                    );
                  }}
                </NameField>
                <AgeField>
                  {ageProps => {
                    const ageId = `${contactsProps.field.name}-${index}-${
                      ageProps.field.name
                    }`;

                    return (
                      <>
                        <label htmlFor={ageId}>Age</label>
                        <input
                          id={ageId}
                          name={`${contactsProps.field.name}[${index}][${
                            ageProps.field.name
                          }]`}
                          value={contactValue.age || ''}
                          onChange={handleEmergencyContactChangeEvent<'age'>(
                            contactsProps,
                            ageProps,
                            index,
                            stringToIntValueConverter
                          )}
                          placeholder="21"
                        />
                      </>
                    );
                  }}
                </AgeField>
                <button
                  type="button"
                  onClick={handleEmergencyContactRemoveEvent(
                    contactsProps,
                    index
                  )}
                >
                  Remove Address
                </button>
              </fieldset>
            );
          })}
          <div>
            <button
              type="button"
              onClick={handleEmergencyContactAddEvent(contactsProps)}
            >
              Add another Address
            </button>
          </div>
        </fieldset>
      )}
    </EmergencyContactField>
  );
};
