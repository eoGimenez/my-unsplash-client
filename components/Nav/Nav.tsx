import './Nav.css'
import { useSwitch } from '../../hooks/useSwitch'
import AddPhoto from '../AddPhoto/AddPhoto'
import { searchInput } from '../../hooks/useSearch'



export default function Nav({searchInput}:{searchInput: searchInput}) {
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

