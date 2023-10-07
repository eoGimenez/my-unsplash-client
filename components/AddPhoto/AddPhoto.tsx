import { useField } from '../../hooks/useField'
import { useImages } from '../../hooks/useImages'
import './AddPhoto.css'

/* type switchType = {
    switchBool: () => void
} */

export default function AddPhoto({ switchBool }: {switchBool: () => void}) {
    const label = useField({type: 'text', field: ''})
    const imgUrl = useField({type: 'text', field: ''})
    const { postImage } = useImages()

    const imageHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        if (label.value && imgUrl.value) {
            postImage(label.value,imgUrl.value)
            location.reload()
        }
    }

    return(
        <div className="modal--add--photo" >
            <h2>Add a new photo</h2>
            <form className='form--new--photo' onSubmit={imageHandler}>
                <fieldset>
                    <label htmlFor='label'>Label</label>
                    <input id='label' placeholder='Example name' {...label} />
                </fieldset>
                <fieldset>
                    <label htmlFor='imgUrl'>Photo URL</label>
                    <input id='imgUrl' placeholder='https://www.example-path-of-image.com.la' {...imgUrl} />
                </fieldset>
                <div className='form--new--photo--buttons'>
                <p onClick={() => {switchBool()}}>Cancel</p>
                <button className='btn btn--styled'>Submit</button>
                </div>
            </form> 
        </div>
        )
}