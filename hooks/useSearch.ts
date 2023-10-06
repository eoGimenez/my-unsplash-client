import { useState } from 'react';
import { ImageType } from './useImages'

export type searchInput = {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searched: ImageType[] | null;
}

export function useSearch( { images }: {images: ImageType[] | null}) {
    const [value, setValue] = useState<string>('');
    const [searched, setSearched] =useState<ImageType[] | null >(null) 
    const type: string = 'text'

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value.toLocaleLowerCase()
        setValue(newQuery);
        const filtrado = images?.filter(image => {
          return image.label.toLowerCase().includes(newQuery)
        })
        if (filtrado) {
          setSearched(filtrado)
        }
    };
    
    return {
      type,
      value,
      onChange,
      searched
    };
}