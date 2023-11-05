import { cleanup, fireEvent, render, screen /*, vi  */ } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import DeletePhoto from '../../components/DeletePhoto/DeletePhoto'

describe('Component DeletePhoto()', () => {
	afterEach(cleanup)

	const setup = () => {
		const utils = render(<DeletePhoto />)
		const passwordLabel = screen.getByLabelText('password-input')

		return {
			passwordLabel,
			...utils,
		}
	}

	it('Should render the modal of DeletePhoto', () => {
		setup()
	})

	it('Should render the DeletePhoto component correctly', () => {
		setup()

		screen.getByText('Are you sure ?')
	})

	it('SHould allow to change the "Password" input', () => {
		const { passwordLabel } = setup()

		fireEvent.change(passwordLabel, { target: { value: 'passtest' } })
		expect(passwordLabel.value).toBe('passtest')
	})

	// it('Should execute deleteHandler() when submit the form', () => {
	//   const deleteMock = vi.fn()
	//   render(<AddPhoto deleteHandler={deleteMock} />)

	//   const delete = screen.getByText('Delete')
	//   fireEvent.click(delete)

	//   expect(deleteMock).toBeCalled()
	// })
})
