import { useEffect, useState } from 'react'

// NodeJS API
// const API_URL = "http://localhost:5005/api/"

// FastAPI API
const API_URL = "http://127.0.0.1:8000/api/" 

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
        .catch(err => console.error(err))
    }

    const postImage = (label: string, imgUrl: string) => {
      
      if (typeof label !== "string" || typeof imgUrl !== 'string') throw new Error('Type should be a string.')

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
      if (!response.ok) {
        throw new Error('Non-ok response')
      }
      return response
     })
    //  .then(data => {
    //   console.log(data);
      // return data
    //  })
     .catch(err => {
      console.error(err)
      setErrorMessage(err)
    })
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
      fetch(`${API_URL}${imageId}`, requestOptions)
      .then(response => {
      if (response.ok) {
        location.reload()
      }
      throw response
      })
      .catch(err => {
        console.error(err);
        
        setErrorMessage('Your user code is not correct !')
      })
    }
    
    useEffect(() => {
        getImages()
    }, [])

    return { images, errorMessage, getImages, postImage, deleteImage }
}
