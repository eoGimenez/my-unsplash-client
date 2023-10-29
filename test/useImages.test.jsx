import { describe, expect, it, vi } from 'vitest'
import { useImages } from '../hooks/useImages'
import { renderHook } from '@testing-library/react'

const testResponseData = { _id: 'testId', label: 'testLabel', imgUrl: 'testImgUrl' }

const testFetch = vi.fn((url, options) => {
	return new Promise((resolve, reject) => {
		if (typeof options.body !== 'string') return reject('Not a string.')
		if (!options.body) {
			const testResponse = {
				ok: true,
			}
			resolve(testResponse)
		} else {
			const testResponse = {
				ok: true,
				json() {
					return new Promise((resolve, reject) => {
						resolve(testResponseData)
					})
				},
			}
			resolve(testResponse)
		}
	})
})

vi.stubGlobal('fetch', testFetch)

it('useImages() should be a function', () => {
	expect(typeof useImages).toBe('function')
})
describe('getImages()', () => {
	const { result } = renderHook(() => useImages())
	it('useImages() must have a method called "getImages', () => {
		expect(result.current.getImages).toBeTypeOf('function')
	})
})
