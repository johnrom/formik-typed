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
) => () => {
  const newValue = emergencyContactField.field.value.concat(
    getDefaultEmergencyContactValue()
  );

  console.log(emergencyContactField.field.value, newValue);

  emergencyContactField.form.setFieldValue(
    emergencyContactField.field.name,
    newValue
  );
};

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
  console.log(subField, emergencyContactField, updateIndex);
  if (
    event.target.value !==
    getIn(emergencyContactField.field.value[updateIndex], subField.field.name)
  ) {
    console.log('iffed');
    const addresses = emergencyContactField.field.value.map(
      (addressField, fieldIndex) => {
        console.log('mapped');
        if (fieldIndex !== updateIndex) {
          return addressField;
        }
        console.log('not early');
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
) => () => {
  const newValue =
    emergencyContactField.field.value.length > 1
      ? [
          ...emergencyContactField.field.value.slice(0, index),
          ...emergencyContactField.field.value.slice(index + 1),
        ]
      : [getDefaultEmergencyContactValue()];

  emergencyContactField.form.setFieldValue(
    emergencyContactField.field.name,
    newValue
  );
};
