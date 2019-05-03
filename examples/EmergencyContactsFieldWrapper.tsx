import * as React from 'react';
import { TypedFieldProxy } from '../src/types';
import { FieldProps } from '@johnrom/formik';
import {
  noopValueConverter,
  stringToIntValueConverter,
  InputValueConverterFunction,
} from './helpers';

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

export class EmergencyContactsFieldWrapper extends React.Component<
  ComponentFirstEmergencyContactFieldProps
> {
  handleEmergencyContactChangeEvent = <TName extends keyof EmergencyContact>(
    containerField: FieldProps<EmergencyContactsFormValues, EmergencyContact[]>,
    subField: FieldProps<EmergencyContact, EmergencyContact[TName]>,
    updateIndex: number,
    // there's currently no way I know of to make this optional only for string values
    valueConverter: InputValueConverterFunction<EmergencyContact[TName]>
  ) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      subField.field.value !==
      containerField.field.value[updateIndex][subField.field.name as TName]
    ) {
      const addresses = containerField.field.value.map(
        (addressField, fieldIndex) => {
          if (fieldIndex !== updateIndex) {
            return addressField;
          }
          return {
            ...addressField,
            [subField.field.name]: valueConverter
              ? valueConverter(event.target.value)
              : event.target.value,
          };
        }
      );
      containerField.form.setFieldValue(containerField.field.name, addresses);
    }
  };

  render() {
    const { fields } = this.props;
    let EmergencyContactField = fields.emergencyContacts._getField();

    return (
      <EmergencyContactField
        validate={value =>
          this.props.required !== false && value.length < 1
            ? 'Please add a friend'
            : ''
        }
      >
        {contactsProp =>
          contactsProp.field.value.map((value, index) => {
            const NameField = fields.emergencyContacts[
              index
            ]._childProxy.name._getField();
            const AgeField = fields.emergencyContacts[
              index
            ]._childProxy.age._getField();

            return (
              <fieldset key={index}>
                <legend>
                  {contactsProp.field.value[index].name || `Address ${index}`}
                </legend>
                <NameField>
                  {nameProps => (
                    <>
                      <label htmlFor={`${contactsProp.field.name}[${index}]`}>
                        Address: {value.name || index}
                      </label>
                      <input
                        id={nameProps.field.name}
                        name={nameProps.field.name}
                        value={contactsProp.field.value[index].name}
                        onChange={this.handleEmergencyContactChangeEvent<
                          'name'
                        >(contactsProp, nameProps, index, noopValueConverter)}
                        placeholder="John Doe"
                      />
                    </>
                  )}
                </NameField>
                <AgeField>
                  {ageProps => (
                    <>
                      <label htmlFor={ageProps.field.name}>Age</label>
                      <input
                        id={ageProps.field.name}
                        name={ageProps.field.name}
                        value={contactsProp.field.value[index].age}
                        onChange={this.handleEmergencyContactChangeEvent<'age'>(
                          contactsProp,
                          ageProps,
                          index,
                          stringToIntValueConverter
                        )}
                        placeholder="21"
                      />
                    </>
                  )}
                </AgeField>
              </fieldset>
            );
          })
        }
      </EmergencyContactField>
    );
  }
}
