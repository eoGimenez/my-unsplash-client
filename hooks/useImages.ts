import { useEffect, useState } from 'react'

const API_URL = "http://localhost:5005/api"

type Image = {
  id:string,
  label: string,
  imgUrl: string
}

export function useImages() {
    const [images, setImages] = useState<Image[] | null>(null)

    const getImages = () => {
        fetch(API_URL)
        .then(response => {
          if (response.ok) {
            return response.json()
          }
          throw response
        })
        .then(data => {
          setImages(data)
        })
        .catch(err => alert(err))
    }
    
    useEffect(() => {
        getImages()
    }, [])

    return { images }
}
