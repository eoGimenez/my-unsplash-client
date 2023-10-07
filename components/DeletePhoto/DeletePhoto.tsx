import './DeletePhoto.css'
import { ImageType, useImages } from '../../hooks/useImages'
import { useField } from '../../hooks/useField'

export default function DeletePhoto ({image, switchBool, }: {image:ImageType, switchBool: () => void} ) {
    const userCode = useField({type: 'password', field: ''})
    const {deleteImage} = useImages()

    const deleteHandler = (e) => {
        deleteImage({imageId: image._id, userCode: userCode.value})
    }
    
    
    return (
        <div className="modal--delete--photo" >
            <h2>Are you sure ?</h2>
            <form className='form--delete--photo' onSubmit={deleteHandler}>
                <fieldset>
                    <label htmlFor='password'>Password</label>
                    <input id='password' placeholder='***********' {...userCode} />
                </fieldset>
                <div className='form--delete--photo--buttons'>
                    <p onClick={() => {switchBool()}}>Cancel</p>
                    <button className='btn btn--styled'>Delete</button>
                </div>
            </form> 
        </div>
    )
}