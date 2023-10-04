import './Nav.css'
import { useField } from '../../hooks/useField'

export default function Nav() {
    const searchInput = useField({type: 'text', field: ''})
    console.log(searchInput.value);
    
    return (
        <header>
            <nav>
                <div className='nav--search--container'>
                    <i className="fa-solid fa-user"></i>
                    <div className='nav-search-info'>
                        <h2>My Unsplash</h2>
                        <p>devchallenges.io</p>
                    </div>
                    <input id='nav--search--input' placeholder='Search by name' {...searchInput}  />
                </div>
            </nav>
        </header>
    )
}