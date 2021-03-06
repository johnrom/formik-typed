import { wrapField } from './wrapField';
import { FieldDefinition, TypedFieldProxy } from './types';

/** @private is the given object a Function? */
export const isFunction = (obj: any): obj is Function =>
  typeof obj === 'function';

export const typedFieldProxy = <FormValues, Values = FormValues>(
  // the originating Proxy is never going to return its parent, but _field is required
  parent: FieldDefinition<FormValues, any> = {} as any
) => {
  return new Proxy(parent as TypedFieldProxy<FormValues, Values>, {
    get: (
      target,
      key: keyof Values | keyof FieldDefinition<FormValues, any>
    ) => {
      if (key === '_field' || key === '_key' || key === '_parent') {
        key = key as keyof FieldDefinition<FormValues, any>;

        if (parent) {
          return parent[key];
        }
      } else {
        key = key as keyof Values;

        if (!(key in target)) {
          target[key] = typedFieldProxy<FormValues, Values[typeof key]>({
            _parent: target,
            _key: key as string,
            _getField: wrapField<FormValues, Values, typeof key>(key, parent),
            _childProxy: typedFieldProxy<Values>(),
          }) as any;
        }
      }

      return target[key];
    },
  });
};
