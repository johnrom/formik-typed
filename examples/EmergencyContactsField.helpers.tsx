import { FieldProps, getIn } from '@johnrom/formik';
import {
  EmergencyContact,
  EmergencyContactsFormValues,
} from './EmergencyContactsField';
import { InputValueConverterFunction } from './helpers';

export const getDefaultEmergencyContactValue = () => ({
  name: '',
});

export const handleEmergencyContactAddEvent = (
  emergencyContactField: FieldProps<
    EmergencyContactsFormValues,
    EmergencyContact[]
  >
) => () =>
  emergencyContactField.form.setFieldValue(
    emergencyContactField.field.name,
    emergencyContactField.field.value.concat(getDefaultEmergencyContactValue())
  );

export const handleEmergencyContactChangeEvent = <
  TName extends keyof EmergencyContact
>(
  emergencyContactField: FieldProps<
    EmergencyContactsFormValues,
    EmergencyContact[]
  >,
  subField: FieldProps<EmergencyContact, EmergencyContact[TName]>,
  updateIndex: number,
  // there's currently no way I know of to make this optional only for string values
  valueConverter: InputValueConverterFunction<EmergencyContact[TName]>
) => (event: React.ChangeEvent<HTMLInputElement>) => {
  if (
    event.target.value !==
    getIn(emergencyContactField.field.value[updateIndex], subField.field.name)
  ) {
    const addresses = emergencyContactField.field.value.map(
      (addressField, fieldIndex) => {
        if (fieldIndex !== updateIndex) {
          return addressField;
        }

        return {
          ...addressField,
          [subField.field.name]: valueConverter
            ? valueConverter(event.target.value)
            : event.target.value,
        };
      }
    );
    emergencyContactField.form.setFieldValue(
      emergencyContactField.field.name,
      addresses
    );
  }
};

export const handleEmergencyContactRemoveEvent = (
  emergencyContactField: FieldProps<
    EmergencyContactsFormValues,
    EmergencyContact[]
  >,
  index: number
) => () =>
  emergencyContactField.form.setFieldValue(
    emergencyContactField.field.name,
    emergencyContactField.field.value.length > 1
      ? [
          ...emergencyContactField.field.value.slice(0, index),
          ...emergencyContactField.field.value.slice(index + 1),
        ]
      : [getDefaultEmergencyContactValue()]
  );
