import './Nav.css'
import { useField } from '../../hooks/useField'
import { useSwitch } from '../../hooks/useSwitch'
import AddPhoto from '../AddPhoto/AddPhoto'

export default function Nav() {
    const searchInput = useField({type: 'text', field: ''})
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
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input id='nav--search--input' placeholder='Search by name' {...searchInput}  />
                    </div>
                </div>
                <p className='nav--btn--add' onClick={switchBool}>Add a photo</p>
                {isTrue ? <AddPhoto /> : null}
            </nav>
        
    )
}

