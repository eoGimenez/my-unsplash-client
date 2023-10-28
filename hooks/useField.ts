import { useState } from 'react';

type fieldInfo = {
    type: string,
    field: string | undefined
}

export function useField({ type, field }: fieldInfo) {
  if (typeof type !== 'string') throw new Error('Type should be a string.')

  const [value, setValue] = useState<string | undefined>(field);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
}