import * as React from 'react';
import { TypedAttributes, FieldDefinition } from './types';
import { Field } from '@johnrom/formik';

export const wrapField = <FormValues, Values, Name extends keyof Values>(
  key: Name,
  parent?: FieldDefinition<FormValues, any>
) => {
  let suffix: string = '';
  let lastKey: string = key as string;

  while (parent && typeof parent._key !== 'undefined') {
    if (lastKey) {
      suffix = `[${lastKey}]${suffix}`;
    }

    lastKey = parent._key;
    parent = parent._parent;
  }

  return () => (props: TypedAttributes<FormValues, Values[Name]>) => {
    return <Field name={`${lastKey}${suffix}`} {...props} />;
  };
};
