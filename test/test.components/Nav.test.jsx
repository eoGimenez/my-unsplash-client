import { afterEach, describe, expect, it } from 'vitest'
import Nav from '../../components/Nav/Nav'
import { cleanup, render, screen } from '@testing-library/react'

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
})
