import * as React from 'react';
import { typedFieldProxy, isFunction } from './utils';
import { isEmptyChildren, Formik } from '@johnrom/formik';
import { TypedFormikConfig, TypedFormikProps } from './types';

export class TypedFormik<Values> extends React.Component<
  TypedFormikConfig<Values>
> {
  TypedFields = typedFieldProxy<Values>();

  render() {
    const { component, children, ...formikConfig } = this.props;

    return (
      <Formik<Values> {...formikConfig}>
        {formikProps =>
          component
            ? React.createElement(component as any, {
                Fields: this.TypedFields,
                ...formikProps,
              })
            : children // children come last, always called
            ? isFunction(children)
              ? (children as ((
                  props: TypedFormikProps<Values>
                ) => React.ReactNode))({
                  Fields: this.TypedFields,
                  ...formikProps,
                })
              : !isEmptyChildren(children)
              ? React.Children.only(children)
              : null
            : null
        }
      </Formik>
    );
  }
}
