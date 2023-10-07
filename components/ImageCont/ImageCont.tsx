import './ImageCont.css'
import { ImageType } from '../../hooks/useImages'
import { useSwitch } from '../../hooks/useSwitch'
import DeletePhoto from '../DeletePhoto/DeletePhoto'

export default function ImageCont({image}: {image:ImageType}) {
    const {isTrue, switchBool} = useSwitch()

    return (
        <section className='section--img--container'>
                <div className='img--container' >
                    <h1 className='img--label'>{image.label}</h1>
                    <p className='btn--delete' onClick={switchBool}>delete</p>
                    <img src={image.imgUrl} alt={image.label} className='img'/>
                </div>
                    {isTrue ? <DeletePhoto image={image} switchBool={switchBool} /> : null}
        </section>
    )
}