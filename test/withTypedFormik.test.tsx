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
    }
  }
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
  Fields
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Fields.name._field
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
        data-testid="name-input"
      />
      {touched.name && errors.name && <div id="feedback">{errors.name}</div>}
      <Fields.address.street.line1._field
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
        data-testid="name-input"
      />
      {
        touched.address && touched.address.street && touched.address.street.line1 &&
        errors.address && errors.address.street && errors.address.street.line1 &&
        <div id="feedback">
          {errors.address.street.line1}
        </div>
      }
      {isSubmitting && <div id="submitting">Submitting</div>}
      <button
        id="statusButton"
        onClick={() => setStatus({ myStatusMessage: 'True' })}
      >
        Call setStatus
      </button>
      {status &&
        !!status.myStatusMessage && (
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
    }
  }
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

describe('withFormik()', () => {
  it('should pass a Fields parameter', () => {
    const { getProps } = renderWithTypedFormik();
    const props = getProps();

    expect(props.Fields).not.toBe(false);
  });
});
