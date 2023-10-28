import { describe, expect, it } from 'vitest'

import { useField } from '../hooks/useField'

describe('useField()', () => {
  it('Shouold be a function', () => {
    expect(typeof useField).toBe('function')
  })

  it('Should throw if you dont provide any paramater', () => {
    expect(() => useField()).toThrow()
  })

  it('Should throw a specific error message if not string is provided in "type" parameter', () => {
    expect(() => useField({type: 2, field: ''})).toThrow(/Type should be a string./)
  })
})
