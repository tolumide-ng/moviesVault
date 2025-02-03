import { SelectOption, SelectProps } from '@/types/manual/form';
import * as React from 'react';
import { MultiValue, default as ReactSelect, SingleValue } from 'react-select';
import { FormControl, FormLabel } from '@chakra-ui/react';

type Props = SelectProps & {
  onChange: (_name: string, _data: Array<SelectOption>) => void;
};

type State = MultiValue<SelectOption> | SingleValue<SelectOption>;

export function Select({
  name,
  label,
  options,
  onChange,
  isMulti = true,
}: Props) {
  const [state, setState] = React.useState<State>([]);

  function handleChange(input: State) {
    setState(input);

    if (isMulti) {
      onChange(name, input as Array<SelectOption>);
    } else {
      onChange(name, [input] as Array<SelectOption>);
    }
  }

  return (
    <FormControl id={name}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <ReactSelect
        value={state}
        defaultValue={state}
        options={options}
        onChange={handleChange}
        isMulti={isMulti}
        aria-labelledby={name}
        id={name}
        styles={{
          control: (base) => ({
            ...base,
            borderRadius: '4px',
            borderColor: '#000',
            marginTop: '0.25rem',
            display: 'flex',
            textAlign: 'left',
            flexDirection: 'row',
          }),
        }}
      />
    </FormControl>
  );
}
