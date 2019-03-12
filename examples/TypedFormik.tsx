import * as React from 'react';
import { TypedFormik } from '../src/TypedFormik';
import { FormikActions } from '@johnrom/formik';

interface Values {
  firstName: string;
  lastName: string;
  email: string;
  address: {
    street: {
      line1: string,
      line2: string,
    }
  }
}

const Form: React.SFC<{}> = () => (
  <div>
    <h1>Signup</h1>
    <TypedFormik<Values>
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        address: {
          street: {
            line1: '',
            line2: '',
          }
        }
      }}
      onSubmit={(values: Values, { setSubmitting }: FormikActions<Values>) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 500);
      }}
    >
      {({ Fields }) => (
        <Form>
          <label htmlFor="firstName">First Name</label>
          <Fields.firstName._field>
            {props =>
              <>
                <label htmlFor={props.field.name}>Last Name</label>
                <input id={props.field.name} name={props.field.name} placeholder="John" />
              </>
            }
          </Fields.firstName._field>
          <Fields.lastName._field>
            {props =>
              <>
                <label htmlFor={props.field.name}>Last Name</label>
                <input id={props.field.name} name={props.field.name} placeholder="Doe" />
              </>
            }
          </Fields.lastName._field>
          <Fields.address.street.line1._field>
            {props =>
              <>
                <label htmlFor={props.field.name}>Last Name</label>
                <input id={props.field.name} name={props.field.name} placeholder="My Street" />
              </>
            }
          </Fields.address.street.line1._field>

          <button type="submit">Submit</button>
        </Form>
      )}
    </TypedFormik>
  </div>
);

export default Form;
