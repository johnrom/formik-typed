import * as React from 'react';
import { FormikConfig, FormikProps, FieldAttributes } from '@johnrom/formik';

export interface FieldDefinition<FormValues, ValueType> {
  _parent?: FieldDefinition<FormValues, any>;
  _key?: string;
  _field: ValueType extends object
    ? React.ComponentType<never>
    : React.ComponentType<TypedAttributes<FormValues, ValueType>>;
}

export type TypedFieldProxy<FormValues, Values = FormValues> = {
  [fieldName in keyof Values]: Values[fieldName] extends (infer FieldType)[]
    ? TypedFieldProxy<FormValues, FieldType>[]
    : Values[fieldName] extends object
      ? TypedFieldProxy<FormValues, Values[fieldName]>
      : FieldDefinition<FormValues, Values[fieldName]>
} &
  FieldDefinition<FormValues, any>;

export interface TypedFormikProps<Values> extends FormikProps<Values> {
  readonly Fields: TypedFieldProxy<Values>;
}

export interface TypedFormikConfig<Values> extends FormikConfig<Values> {
  component?: React.ComponentType<TypedFormikProps<Values>> | React.ReactNode;
  children?:
    | ((props: TypedFormikProps<Values>) => React.ReactNode)
    | React.ReactNode;
}

export type TypedAttributes<Values, ValueType> = Partial<
  Pick<
    FieldAttributes<{}, Values, ValueType>,
    Exclude<keyof FieldAttributes<{}, Values, ValueType>, 'name'>
  >
>;

export type WrapFieldFunction<
  FormValues,
  Parent,
  Values,
  Key extends keyof Values
> = (
  parent: Parent
) => React.ComponentType<TypedAttributes<FormValues, Values[Key]>>;
