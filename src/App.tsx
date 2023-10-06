import { useImages } from '../hooks/useImages'
import Nav from '../components/Nav/Nav'
import './App.css'
import { useSearch } from '../hooks/useSearch'


export default function App() {
  const { images } = useImages()
  const searchInput = useSearch({images: images})
  

  return (
    <>
      {images ? <Nav searchInput={searchInput}/> : null }
      <section>
        {!searchInput.searched ? (images?.map(image => (
          <div key={image.id} className='img--container' >
            <h1>{image.label}</h1>
            <img src={image.imgUrl} alt={image.label} className='imagenes'/>
          </div>
        ))) : (
          searchInput.searched?.map(image => (
            <div key={image.id} className='img--container' >
              <h1>{image.label}</h1>
              <img src={image.imgUrl} alt={image.label} className='imagenes'/>
            </div>
          ))
        )}
      </section>
    </>
  )
}


