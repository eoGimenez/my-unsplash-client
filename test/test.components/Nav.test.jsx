import { afterEach, describe, expect, it } from 'vitest'
import Nav from '../../components/Nav/Nav'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'

describe('Component Nav', () => {
	afterEach(cleanup)

	const setup = () => {
		const utils = render(<Nav />)
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

	it('Should render AddPhoto componenent, when button "Add a photo" is clicked', () => {
		setup()

		const buttonTest = screen.getByText('Add a photo')
		fireEvent.click(buttonTest)

		expect(screen.getByText('Add a new photo')).toBeDefined()
	})

	it('Should close AddPhoto component when the "Add a photo" button is clicked while AddPhoto is rendered', () => {
		const { container } = setup()
		const buttonTest = screen.getByText('Add a photo')

		expect(container.querySelector('.modal--add--photo')).toBeNull()

		fireEvent.click(buttonTest)
		fireEvent.click(buttonTest)

		expect(container.querySelector('.modal--add--photo')).toBeNull()
	})
})
