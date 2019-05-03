import * as React from 'react';
import { FieldProps } from '@johnrom/formik';

export interface NameFieldExtraProps {
  title?: string;
}

export const NameComponentField: React.FC<
  FieldProps<any, string, NameFieldExtraProps>
> = props => (
  <>
    <div>
      Name as it will be displayed: {props.title ? `${props.title} ` : ''}
      {props.field.value}
    </div>
    <label htmlFor={props.field.name}>Name</label>
    <input
      name={props.field.name}
      value={props.field.value}
      onChange={props.field.onChange}
      placeholder="John"
    />
  </>
);
