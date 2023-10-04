import { useState } from 'react';

type fieldInfo = {
    type: string,
    field: string | undefined
}

export function useField({ type, field }: fieldInfo) {
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