import { afterEach, describe, expect, it, vi } from 'vitest'
import Nav from '../../components/Nav/Nav'
import { cleanup, fireEvent, render, renderHook, screen } from '@testing-library/react'
import { useSwitch } from '../../hooks/useSwitch'

describe('Component Nav', () => {
	afterEach(cleanup)

	const setup = () => {
		const utils = render(<Nav />)
		// const searchInput = screen.getByLabelText('search-input')
    const searchInput = screen.getByLabelText('search-input')
    
    
		return {
      searchInput,
			...utils,
		}
	}


  
	it('Should render propertly', () => {
    setup()
    
		screen.getByText('My Unsplash')
	})
  
	it('Shoudl change the input of the search bar propertly', () => {
    const { searchInput } = setup()
    
		expect(searchInput.value).toBe('')
		fireEvent.change(searchInput, { target: { value: 'Test' } })
		expect(searchInput.value).toBe('Test')
	})
  
	it('Should change the "isTrue" boolean when button is clicked', () => {

    
    setup()
    
		
		const buttonTest = screen.getByText('Add a photo')
		fireEvent.click(buttonTest)
    const { result } = renderHook(() => useSwitch())

		expect(result.current.isTrue).toBe(true)
	})
})
