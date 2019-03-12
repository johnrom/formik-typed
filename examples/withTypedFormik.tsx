import React from 'react';
import { withTypedFormik } from '../src/withTypedFormik';
import Form from './TypedFormik';
import { ErrorMessage } from '@johnrom/formik';

export interface Props {
  user: {
    email: string;
  }
}

export interface Values {
  email: string;
}

const formikEnhancer = withTypedFormik<Props, Values>({
  mapPropsToValues: props => ({ email: props.user.email }),
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },
  displayName: 'MyForm', // helps with React DevTools
});

const MyForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    Fields
  } = props;
  return (
    <Form>
      <label htmlFor="email">Email</label>
      <Fields.email placeholder="jane@acme.com" type="email" />
      <div>
        <ErrorMessage name="email" />
      </div>
      <button
        type="button"
        className="outline"
        onClick={handleReset}
        disabled={!dirty || isSubmitting}
      >
        Reset
      </button>
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </Form>
  );
};

export default formikEnhancer(MyForm);
