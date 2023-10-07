import { useEffect, useState } from 'react'

const API_URL = "http://localhost:5005/api"

export type ImageType = {
  _id:string,
  label: string,
  imgUrl: string
}




export function useImages() {
    const [images, setImages] = useState<ImageType[] | null>(null)
    const [errorMessage, setErrorMessage] = useState<string |null>(null)
  
  
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

    const deleteImage = ({imageId , userCode } : {imageId: string, userCode: string}) => {

      const json_string = JSON.stringify({ userCode })
      
      const requestOptions = {
        method: 'DELETE',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: json_string
      }
      fetch(`${API_URL}/${imageId}`, requestOptions)
      .then(response => {
      if (response.ok) {
        location.reload()
      }
      throw response
      })
      .catch(err => setErrorMessage('Your user code is not correct !'))
    }
    
    useEffect(() => {
        getImages()
    }, [])

    return { images, errorMessage, getImages, postImage, deleteImage }
}
