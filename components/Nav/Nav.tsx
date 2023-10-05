import './Nav.css'
import { useSwitch } from '../../hooks/useSwitch'
import { useSearch } from '../../hooks/useSearch'
import AddPhoto from '../AddPhoto/AddPhoto'
import { ImageType } from '../../hooks/useImages'
  

export default function Nav({images}: {images: ImageType[] }) {
    const searchInput = useSearch({images: images })
    const {isTrue, switchBool } = useSwitch()
    
    return (
        
            <nav>
                <div className='nav--search--container'>
                    <i className="fa-solid fa-user"></i>
                    <div className='nav-search-info'>
                        <h2>My Unsplash</h2>
                        <p>devchallenges.io</p>
                    </div>
                    <div className='nav--search--bar--container'>
                        <label htmlFor='nav--search--input'><i className="fa-solid fa-magnifying-glass"></i></label>
                        <input id='nav--search--input' placeholder='Search by name' {...searchInput}  />
                    </div>
                </div>
                <p className='nav--btn--add' onClick={switchBool}>Add a photo</p>
                {isTrue ? <AddPhoto switchBool={switchBool}/> : null}
            </nav>
        
    )
}

