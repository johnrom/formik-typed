import * as React from 'react';
import {
  FormikConfig,
  FormikProps,
  GenericFieldHTMLAttributes,
  FieldConfig,
} from '@johnrom/formik';

export interface FieldDefinition<FormValues, ValueType> {
  _parent?: FieldDefinition<FormValues, any>;
  _key?: string;
  _getField: <TExtraProps extends object = {}>() => React.ComponentType<
    TypedAttributes<FormValues, ValueType, TExtraProps>
  >;
}

export type TypedFieldProxy<FormValues, Values = FormValues> = {
  [fieldName in keyof Values]: Values[fieldName] extends any[]
    ? FieldDefinition<FormValues, Values[fieldName]>
    : Values[fieldName] extends object
    ? TypedFieldProxy<FormValues, Values[fieldName]>
    : FieldDefinition<FormValues, Values[fieldName]>
} &
  FieldDefinition<FormValues, Values>;

export interface TypedFormikProps<Values> extends FormikProps<Values> {
  readonly Fields: TypedFieldProxy<Values>;
}

export interface TypedFormikConfig<Values> extends FormikConfig<Values> {
  component?: React.ComponentType<TypedFormikProps<Values>> | React.ReactNode;
  children?:
    | ((props: TypedFormikProps<Values>) => React.ReactNode)
    | React.ReactNode;
}

/**
 * These are FieldAttributes without the Pass-Through Props so they can be redefined outside of the Omit in TypedAttributes
 */
export declare type BaseFieldAttributes<
  Props,
  Values,
  ValueType = any
> = GenericFieldHTMLAttributes & FieldConfig<Values, ValueType, Props>;

/**
 * The attributes passed to a Typed Field Wrapper. Note these Omit `name`, because the field wrapper handles that.
 * This refines TProps outside of FieldAttributes because those Props may not be partial
 */
export type TypedAttributes<
  Values,
  ValueType,
  TProps extends object = {}
> = TProps &
  Partial<
    Pick<
      BaseFieldAttributes<TProps, Values, ValueType>,
      Exclude<keyof BaseFieldAttributes<TProps, Values, ValueType>, 'name'>
    >
  >;
