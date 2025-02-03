import { Select } from '@/components/atoms/Select/Select';
import { FormData, SelectOption } from '@/types/manual/form';
import * as React from 'react';
import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';

type Props = Readonly<{
  formData: Array<FormData>;
  onChange: (_: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect: (_name: string, _data: Array<SelectOption>) => void;
}>;

export function SearchBar({ onChange, onSelect, ...props }: Props) {
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <Box as="form" onSubmit={onSubmit} width={'calc(min(50rem, 90%))'}>
      <Flex
        direction="row"
        flexWrap="wrap"
        justifyContent="space-between"
        gap={4}
        width="100%"
      >
        {props.formData.map((data) => (
          <Box
            key={data.name}
            width={
              data.type === 'select' ? { base: '100%', md: '48%' } : '100%'
            }
          >
            <FormControl>
              {data.type === 'text' && (
                <>
                  <FormLabel htmlFor={data.name}>{data.label}</FormLabel>
                  <Input
                    id={data.name}
                    name={data.name}
                    value={data.value as string}
                    onChange={onChange}
                    borderColor={'black'}
                  />
                </>
              )}

              {data.type === 'select' ? (
                <Box w={'100%'}>
                  <FormLabel htmlFor={data.name}>{data.label}</FormLabel>
                  <Select
                    name={data.name}
                    value={data.value}
                    onChange={onSelect}
                    type="select"
                    options={data.options}
                  />
                </Box>
              ) : null}

              {data.type === 'checkbox' && (
                <>
                  <FormLabel htmlFor={data.name}>{data.label}</FormLabel>
                  {data.options.map((option) => (
                    <Checkbox
                      key={option}
                      id={option}
                      name={data.name}
                      isChecked={(data.value as Array<string>).includes(option)}
                      onChange={onChange}
                      mr={'6'}
                      mb={'2'}
                      value={option}
                    >
                      {option}
                    </Checkbox>
                  ))}
                </>
              )}
            </FormControl>
          </Box>
        ))}
      </Flex>
    </Box>
  );
}
