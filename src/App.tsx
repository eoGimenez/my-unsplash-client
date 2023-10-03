import { useImages } from '../hooks/useImages'
import './App.css'

export default function App() {
const { images } = useImages()

  return (
    <section>
    {images?.map(image => (
        <div key={image.id} className='img--container' >
          <h1>{image.label}</h1>
          <img src={image.imgUrl} alt={image.label} className='imagenes'/>
        </div>
      ))}
    </section>
  )
}


