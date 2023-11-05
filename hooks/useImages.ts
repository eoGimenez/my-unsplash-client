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

    const postImage = ({label, imgUrl} : {label: string, imgUrl: string}) => {
      
      if (typeof label !== "string" || typeof imgUrl !== 'string') {
        throw new Error('Type should be a string.')
      }
      
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
     return fetch(API_URL, requestOptions)
     .then(response => {
      if (!response.ok) {
        // esta respuesta es siendo hardcodeada por finalidades de los tests, 
        // se incorporara esta misma respuesta en el back-end
        throw ('Non-ok response')
      }
      return response.json()
     })
     .catch(err => {
      console.error("somthing go wrong : ",err)
      throw err
    })
    }

    const deleteImage = ({imageId , userCode } : {imageId: string, userCode: string}) => {

      if (typeof imageId !== "string" || typeof imageId !== 'string') {
        throw new Error('Type should be a string.')
      }
      const json_string = JSON.stringify({ userCode })
      
      const requestOptions = {
        method: 'DELETE',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: json_string
      }
      return fetch(`${API_URL}${imageId}`, requestOptions)
      .then(response => {
        
        if (!response.ok) {
        // esta respuesta es siendo hardcodeada por finalidades de los test,
        // EN EL BACK-END Tiene la misma respuesta
        throw ('Your user code is not correct !')
      }
        location.reload()
        return response.json()
      })
      .catch(err => {
        console.error(err);
        setErrorMessage('Your user code is not correct !')
        throw err
      })
    }

    const imageHandler = ({label, imgUrl} : {label: string |undefined , imgUrl: string | undefined}) => {
      // e.preventDefault()
      if (label && imgUrl) {
          postImage({label: label, imgUrl: imgUrl})
          location.reload()
      }
    }
    
    useEffect(() => {
        getImages()
    }, [])

    return { images, errorMessage, getImages, postImage, deleteImage, imageHandler }
}
