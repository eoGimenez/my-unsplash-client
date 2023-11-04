import { afterEach, describe, expect, it } from 'vitest'
import AddPhoto from '../../components/AddPhoto/AddPhoto'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'

describe('Component AddPhoto()', () => {
	afterEach(cleanup)

	const setup = () => {
		const utils = render(<AddPhoto />)
		const inputLabel = screen.getByLabelText('label-input')
		const inputImgUrl = screen.getByLabelText('imgurl-input')

		return {
			inputImgUrl,
			inputLabel,
			...utils,
		}
	}

	it('Should render the component "AddPhoto"', () => {
		setup()
	})

	it('Should render title correctly', () => {
		setup()

		screen.getByText('Add a new photo')
	})

	it('Should allow to change the input "label"', () => {
		const { inputLabel } = setup()

		expect(inputLabel.value).toBe('')
		fireEvent.change(inputLabel, { target: { value: 'test label' } })
		expect(inputLabel.value).toBe('test label')
	})

	it('Should allot to change the input "imgUrl"', () => {
		const { inputImgUrl } = setup()

		expect(inputImgUrl.value).toBe('')
		fireEvent.change(inputImgUrl, { target: { value: 'test imgUrl' } })
		expect(inputImgUrl.value).toBe('test imgUrl')
	})
})
