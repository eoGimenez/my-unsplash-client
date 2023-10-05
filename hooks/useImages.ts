import { useEffect, useState } from 'react'

const API_URL = "http://localhost:5005/api"

export type ImageType = {
  id:string,
  label: string,
  imgUrl: string
}



export function useImages() {
    const [images, setImages] = useState<ImageType[] | null>(null)
    // const [error, setError] = useState(null)

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

    const postImage = (label: string, imgUrl: string) => {

      const json_string = JSON.stringify({
          label,
          imgUrl
      })
      console.log(json_string);
      
      const requestOptions = {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: json_string
      } 
     fetch(API_URL, requestOptions)
     .then(response => {
      if (response.ok) {
        return response.json()
      }
      throw response
     })
     .then(data => {
      console.log(data);
     })
     .catch(err => console.error(err))
    }
    
    useEffect(() => {
        getImages()
    }, [])

    return { images, getImages, postImage }
}
