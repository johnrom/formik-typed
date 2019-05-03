import * as React from 'react';
import {
  EmergencyContactsFieldWrapper,
  EmergencyContact,
} from './EmergencyContactsFieldWrapper';
import { AgeCustomField } from './AgeCustomField';
import { TypedFormikProps } from '../src/types';
import { Form } from '@johnrom/formik';
import { withTypedFormik } from '../src/withTypedFormik';

export interface SignupFormValues {
  title: string;
  name: string;
  age?: number;
  emergencyContacts: EmergencyContact[];
}

export const SignupForm: React.FC<
  TypedFormikProps<SignupFormValues>
> = props => {
  const TitleField = props.fields.title._getField();
  const NameField = props.fields.name._getField();

  return (
    <div>
      <h1>Signup</h1>
      <Form>
        <div>
          {/* Writing a Field definition inline is pretty simple.  */}
          <TitleField>
            {nameProps => (
              <>
                <label htmlFor={nameProps.field.name}>Title</label>
                <select
                  value={nameProps.field.value}
                  onChange={nameProps.field.onChange}
                >
                  <option value="">Select a Title (optional)</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                </select>
              </>
            )}
          </TitleField>
        </div>
        <div>
          <NameField>
            {nameProps => (
              <>
                <label htmlFor={nameProps.field.name}>Name</label>
                <input
                  name={nameProps.field.name}
                  value={nameProps.field.value}
                  onChange={nameProps.field.onChange}
                  placeholder="John"
                />
              </>
            )}
          </NameField>
        </div>
        {/* Passing your own Custom Component to a Field definition is also pretty easy.
         */}
        <AgeCustomField field={props.fields.age._getField()} min={21} />
        {/* For Custom Components that need to manage multiple fields, you can pass the proxy directly */}
        <EmergencyContactsFieldWrapper fields={props.fields} />
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};

export const ConnectedSignupForm = withTypedFormik<
  SignupFormValues,
  SignupFormValues
>({
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },
  displayName: 'MyForm', // helps with React DevTools
})(SignupForm);
