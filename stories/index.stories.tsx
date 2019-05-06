import * as React from 'react';
import { storiesOf } from '@storybook/react';
import {
  SignupForm,
  SignupFormValues,
  ConnectedSignupForm,
} from '../examples/SignupForm';
import { TypedFormik } from '../src/TypedFormik';
import Typography from 'typography';

const TypographyTheme = require('typography-theme-st-annes');
const typography = new Typography(TypographyTheme);

typography.injectStyles();

storiesOf('SignupForm', module)
  .add('TypedFormik', () => (
    <TypedFormik<SignupFormValues>
      initialValues={{
        title: '',
        name: '',
        emergencyContacts: [{ name: '' }],
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 500);
      }}
    >
      {formikProps => <SignupForm {...formikProps} />}
    </TypedFormik>
  ))
  .add('withTypedFormik', () => (
    <ConnectedSignupForm title="" name="" emergencyContacts={[{ name: '' }]} />
  ));
