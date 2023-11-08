import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import ImageCont from '../../components/ImageCont/ImageCont'

const imageTest = { _id: 'testId', label: 'testLabel', imgUrl: 'testImgUrl' }

describe('Component ImageCont()', () => {
	afterEach(cleanup)

	const setup = (image) => {
		const utils = render(<ImageCont image={image} />)

		return { ...utils }
	}

	it('Should render propertly', () => {
		setup(imageTest)

		screen.getByText('testLabel')
	})

	it('Should render DeletePhoto component, when button "delete" is clicked', () => {
		setup(imageTest)

		const buttonTest = screen.getByText('delete')
		fireEvent.click(buttonTest)

		expect(screen.getByText('Are you sure ?')).toBeDefined()
	})
})
