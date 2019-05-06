export type InputValueConverterFunction<TValue> = (value: string) => TValue;

export const noopValueConverter: InputValueConverterFunction<string> = value =>
  value;
export const stringToIntValueConverter: InputValueConverterFunction<
  number
> = value => parseInt(value, 10) || 0;
