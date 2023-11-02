import { afterEach, describe, it } from 'vitest'
import AddPhoto from '../../components/AddPhoto/AddPhoto'
import { cleanup, render, screen } from '@testing-library/react'

describe('AddPhoto()', () => {
  afterEach(cleanup)

  it('Should render the component "AddPhoto"', () => {
    render(<AddPhoto />)
  })

  it('Should render title correctly', () => {
    render(<AddPhoto />)

    screen.getByText('Add a new photo')
  })
})
