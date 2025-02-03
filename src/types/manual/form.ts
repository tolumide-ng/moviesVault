type CommonProps = {
  name: string;
  label?: string;
  styles?: string;
  value: unknown;
  required?: boolean;
};

export type SelectOption = { label: string; value: string | number };

export type InputProps = {
  type: 'text' | 'number' | 'password';
} & CommonProps;

export type CheckBoxProps = Omit<InputProps, 'type'> & {
  type: 'checkbox';
  options: Array<string>;
};

export type SelectProps = {
  type: 'select';
  options: Array<SelectOption>;
  isMulti?: boolean;
} & CommonProps;

export type FormData = InputProps | SelectProps | CheckBoxProps;
