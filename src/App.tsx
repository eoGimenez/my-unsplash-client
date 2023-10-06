import { useImages } from '../hooks/useImages'
import Nav from '../components/Nav/Nav'
import ImageCont from '../components/ImageCont/ImageCont'
import './App.css'
import { useSearch } from '../hooks/useSearch'


export default function App() {
  const { images } = useImages()
  const searchInput = useSearch({images: images})
  

  return (
    <>
      {images ? <Nav searchInput={searchInput}/> : null }
      <section>
        {!searchInput.searched ? <ImageCont images={images} /> : <ImageCont images={searchInput.searched} />}
      </section>
    </>
  )
}


/* 
refactorizado

(images?.map(image => (
          <div key={image.id} className='img--container' >
            <div className='img--container--hover'>
              <h1>{image.label}</h1>
              <p className='btn--styled'>DELETE</p>
            </div>
            <img src={image.imgUrl} alt={image.label} className='imagenes'/>
          </div>
        ))):
         (
          searchInput.searched?.map(image => (
            <div key={image.id} className='img--container' >
            <div className='img--container--hover'>
              <h1>{image.label}</h1>
              <p className='btn--styled'>DELETE</p>
            </div>
              <img src={image.imgUrl} alt={image.label} className='imagenes'/>
            </div>
          ))
        )
        
        */