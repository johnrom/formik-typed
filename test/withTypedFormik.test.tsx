import * as React from 'react';
import { render } from 'react-testing-library';

import { TypedFormikProps, withTypedFormik } from '../src';
import { noop } from './testHelpers';

interface Values {
  name: string;
  address: {
    street: {
      line1: string;
      line2: string;
    };
  };
}

const Form: React.SFC<TypedFormikProps<Values>> = ({
  values,
  handleSubmit,
  handleChange,
  handleBlur,
  touched,
  setStatus,
  status,
  errors,
  isSubmitting,
  fields,
}) => {
  const NameField = fields.name._getField();
  const AddressLine1Field = fields.address.street.line1._getField();
  return (
    <form onSubmit={handleSubmit}>
      <NameField
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
        data-testid="name-input"
      />
      {touched.name && errors.name && <div id="feedback">{errors.name}</div>}
      <AddressLine1Field
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
        data-testid="name-input"
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
      <button
        id="statusButton"
        onClick={() => setStatus({ myStatusMessage: 'True' })}
      >
        Call setStatus
      </button>
      {status && !!status.myStatusMessage && (
        <div id="statusMessage">{status.myStatusMessage}</div>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

const InitialValues: Values = {
  name: 'name',
  address: {
    street: {
      line1: 'street',
      line2: 'apt',
    },
  },
};

const renderWithTypedFormik = (options?: any, props?: any) => {
  let injected: any;

  const FormikForm = withTypedFormik<{}, Values>({
    mapPropsToValues: () => InitialValues,
    handleSubmit: noop,
    ...options,
  })(props => (injected = props) && <Form {...props} />);

  return {
    getProps() {
      return injected;
    },
    ...render(<FormikForm {...props} />),
  };
};

describe('withTypedFormik()', () => {
  it('should pass a Fields parameter', () => {
    const { getProps } = renderWithTypedFormik();
    const props = getProps();

    expect(props.fields).not.toBeFalsy();
  });
});
