import { useField } from '../hooks/useField'
import { beforeEach, describe, expect, it, vi } from 'vitest'


	/* const useStateSpy = vi.fn((initialValue) => {
		let value = initialValue

		return [
			value,
			(newValue) => {
				value = newValue
			},
		]
	}) */
	vi.mock('useState', (initialValue) => {
		let value = initialValue

		return [
			value,
			(newValue) => {
				value = newValue
			},
		]
	})


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
		const testField = useField({ type: 'text', field: '' })

		expect(testField.value).toBe('text')
	})
})
