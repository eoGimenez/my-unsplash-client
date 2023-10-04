import { useField } from '../../hooks/useField'
import './AddPhoto.css'

export default function AddPhoto() {
    const label = useField({type: 'text', field: ''})
    const imgUrl = useField({type: 'text', field: ''})

    return(
        <div className="modal--add--photo">
            <h2>Add a new photo</h2>
            <form className='form--new--photo'>
                <fieldset>
                    <label htmlFor='label'>Label</label>
                    <input id='label' placeholder='Example name' {...label} />
                </fieldset>
                <fieldset>
                    <label htmlFor='imgUrl'>Photo URL</label>
                    <input id='imgUrl' placeholder='https://www.example-path-of-image.com.la' {...imgUrl} />
                </fieldset>
            </form> 
        </div>
        )
}