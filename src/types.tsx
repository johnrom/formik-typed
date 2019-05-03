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
  _getField: <TExtraProps = {}>() => React.ComponentType<
    TypedAttributes<FormValues, ValueType, TExtraProps>
  >;
  _childProxy: ValueType extends object ? TypedFieldProxy<ValueType> : never;
}

type ArrayFieldDefinition<FormValues, FieldType> = TypedFieldProxy<
  FormValues,
  FieldType
>[] &
  FieldDefinition<FormValues, FieldType[]>;

type FieldDefinitionOrObjectProxy<
  FormValues,
  Values,
  FieldName extends keyof Values
> = Values[FieldName] extends object
  ? TypedFieldProxy<FormValues, Values[FieldName]>
  : FieldDefinition<FormValues, Values[FieldName]>;

export type TypedFieldProxy<FormValues, Values = FormValues> = {
  [fieldName in keyof Values]-?: Values[fieldName] extends (infer FieldType)[]
    ? ArrayFieldDefinition<FormValues, FieldType>
    : FieldDefinitionOrObjectProxy<FormValues, Values, fieldName>
} &
  FieldDefinition<FormValues, Values>;

export interface TypedFormikProps<Values> extends FormikProps<Values> {
  readonly fields: TypedFieldProxy<Values>;
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
export type TypedAttributes<Values, ValueType, TProps = {}> = TProps &
  Partial<
    Pick<
      BaseFieldAttributes<TProps, Values, ValueType>,
      Exclude<keyof BaseFieldAttributes<TProps, Values, ValueType>, 'name'>
    >
  >;
