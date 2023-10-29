import { useField } from '../hooks/useField'
import { describe, expect, it } from 'vitest'
import { renderHook } from '@testing-library/react'

describe('useField()', () => {
	it('Shouold be a function', () => {
		expect(typeof useField).toBe('function')
	})

	it('Should throw if you dont provide any paramater', () => {
		expect(() => useField()).toThrow()
	})

	it('Should throw a specific error message if not string is provided in "type" parameter', () => {
		expect(() => useField({ type: 2 })).toThrow(/Type should be a string./)
	})

	it('Should yield an object with the with "type" propierty', () => {
		const testField = { type: 'text', field: '' }

		const { result } = renderHook(() => useField(testField))

		expect(result.current.type).toBe('text')
	})
})
