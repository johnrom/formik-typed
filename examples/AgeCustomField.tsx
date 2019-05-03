import * as React from 'react';
import { TypedAttributes } from '../src/types';

export interface AgeCustomFieldProps {
  field: React.ComponentType<TypedAttributes<any, number | undefined>>;
  min: number;
}

export const AgeCustomField: React.FC<AgeCustomFieldProps> = props => (
  <props.field
    validate={value =>
      !value || value < props.min
        ? `Please enter an age above ${props.min}.`
        : ''
    }
  >
    {fieldProps => (
      <>
        <label htmlFor={props.field.name}>Name</label>
        <input
          type="number"
          min={props.min}
          id={fieldProps.field.name}
          name={fieldProps.field.name}
          value={fieldProps.field.value}
          onChange={fieldProps.field.onChange}
          placeholder="21"
        />
      </>
    )}
  </props.field>
);
