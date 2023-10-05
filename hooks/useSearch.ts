import { useState } from 'react';
import { ImageType } from './useImages'


export function useSearch( { images }: {images: ImageType[]}) {
  
    const [value, setValue] = useState<string | undefined>();
    const type: string = ''

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value
        setValue(newQuery);
    };
  
    return {
      type,
      value,
      onChange,
    };
}