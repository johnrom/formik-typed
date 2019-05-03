import * as React from 'react';
import { render, cleanup } from 'react-testing-library';

import { TypedFormik, TypedFormikProps, TypedFormikConfig } from '../src';
import { noop } from './testHelpers';
import { FieldProps } from '@johnrom/formik';

jest.spyOn(global.console, 'warn');

interface Values {
  name: string;
  address: {
    street: {
      line1: string;
      line2: string;
    };
  };
}

export const MySpecialField = (
  props: FieldProps<any, string, MySpecialProps>
) => <h1>{props.mySpecialProp}</h1>;

interface MySpecialProps {
  mySpecialProp: string;
}

function Form({
  values,
  touched,
  handleSubmit,
  handleChange,
  handleBlur,
  status,
  errors,
  isSubmitting,
  fields,
}: TypedFormikProps<Values>) {
  const NameField = fields.name._getField<MySpecialProps>();
  const AddressLine1Field = fields.address.street.line1._getField<
    MySpecialProps
  >();
  return (
    <form onSubmit={handleSubmit} data-testid="form">
      <NameField
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
        data-testid="name-input"
        component={MySpecialField}
        mySpecialProp="hello"
      />
      {touched.name && errors.name && <div id="feedback">{errors.name}</div>}
      <AddressLine1Field
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
        data-testid="name-input"
        component={MySpecialField}
        mySpecialProp="hello"
      />
      {touched.address &&
        touched.address.street &&
        touched.address.street.line1 &&
        errors.address &&
        errors.address.street &&
        errors.address.street.line1 && (
          <div id="feedback">{errors.address.street.line1}</div>
        )}
      {isSubmitting && <div id="submitting">Submitting</div>}
      {status && !!status.myStatusMessage && (
        <div id="statusMessage">{status.myStatusMessage}</div>
      )}
      <button type="submit" data-testid="submit-button">
        Submit
      </button>
    </form>
  );
}

const InitialValues: Values = {
  name: 'name',
  address: {
    street: {
      line1: 'street',
      line2: 'apt',
    },
  },
};

function renderFormik(props?: Partial<TypedFormikConfig<Values>>) {
  const ref = React.createRef<TypedFormik<Values>>();
  let injected: TypedFormikProps<Values>;

  return {
    getProps(): TypedFormikProps<Values> {
      return injected;
    },
    getRef() {
      return ref;
    },
    ...render(
      <TypedFormik<Values>
        ref={ref as any}
        onSubmit={noop as any}
        initialValues={InitialValues as any}
        {...props}
      >
        {formikProps => (injected = formikProps) && <Form {...formikProps} />}
      </TypedFormik>
    ),
  };
}

describe('<TypedFormik />', () => {
  // Cleanup the dom after each test.
  // https://github.com/kentcdodds/react-testing-library#example
  afterEach(cleanup);

  it('should pass a Fields parameter', () => {
    const { getProps } = renderFormik();
    const props = getProps();

    expect(props.fields).not.toBe(false);
  });
});
