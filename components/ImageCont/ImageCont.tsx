import './ImageCont.css'
import { ImageType } from '../../hooks/useImages'

export default function ImageCont({images}: {images:ImageType[] | null}) {
    return (
        <>
        {images?.map(image => (
            <div key={image.id} className='img--container' >
              <div className='img--container--hover'>
                <h1>{image.label}</h1>
                <p className='btn--styled'>DELETE</p>
              </div>
              <img src={image.imgUrl} alt={image.label} className='imagenes'/>
            </div>
            ))}
        </>
    )
}