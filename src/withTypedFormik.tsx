import * as React from 'react';
import { FormikValues, WithFormikConfig, ComponentDecorator, CompositeComponent, withFormik } from '@johnrom/formik';
import { TypedFormikProps } from './types';
import { typedFieldProxy } from './utils';

/**
 * A public higher-order component to access the imperative API
 */
export const withTypedFormik = <
  OuterProps,
  Values extends FormikValues,
  Payload = Values
>(props: WithFormikConfig<OuterProps, Values, Payload>): ComponentDecorator<
  OuterProps,
  OuterProps & TypedFormikProps<Values>
> => {
  const TypedFieldProxy = typedFieldProxy<Values>();

  return (
    Component: CompositeComponent<OuterProps & TypedFormikProps<Values>>
  ): React.ComponentType<OuterProps> => withFormik(props)(props =>
    <Component
      {...{
        ...props,
        Fields: TypedFieldProxy,
      }}
    />)
  };
