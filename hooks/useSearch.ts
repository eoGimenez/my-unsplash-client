import { useState } from 'react';
import { ImageType } from './useImages'

export type searchInput = {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searched: ImageType[];
}

export function useSearch( { images }: {images: ImageType[]}) {
    const [value, setValue] = useState<string | undefined>('');
    const [searched, setSearched] =useState<ImageType[]>() 
    const type: string = 'text'

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value.toLocaleLowerCase()
        setValue(newQuery);
        const filtrado = images.filter(image => {
          return image.label.toLowerCase().includes(newQuery)
        })
        setSearched(filtrado)
    };
    
    return {
      type,
      value,
      onChange,
      searched
    };
}