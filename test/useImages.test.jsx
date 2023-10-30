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

const { result } = renderHook(() => useImages())

it('useImages() should be a function', () => {
	expect(typeof useImages).toBe('function')
})
describe('getImages()', () => {
	it('useImages() must have a method called "getImages"', () => {
		expect(result.current.getImages).toBeTypeOf('function')
	})
})

describe('postImage()', () => {
	it('useImages() must have a method called "postImage', () => {
		expect(result.current.postImage).toBeTypeOf('function')
	})

	it('Should throw if in "label" provided is not a "string"', () => {
		expect(() => {
			result.current.postImage(2, 'testing imgUrl')
		}).toThrow(/Type should be a string./)
	})

	it('Should throw if in "imgUrl" provided is not a "string"', () => {
		expect(() => {
			result.current.postImage('testing label', 2)
		}).toThrow(/Type should be a string./)
	})

	it('Should throw in case of non-ok responses', async () => {
		testFetch.mockImplementationOnce((url, options) => {
			return new Promise((resolve, reject) => {
				if (typeof options.body !== 'string') return reject('Not a string.')
				const testResponse = {
					ok: false,
					json() {
						return new Promise((resolve, reject) => {
							resolve(testResponseData)
						})
					},
				}
				resolve(testResponse)
			})
		})
		
		let errorMessage = null


		const postImageFn = async () => result.current.postImage('testLavel', 'testImgUrl')

		try {
			await postImageFn()
		} catch (err) {
			errorMessage = err
		}
		expect(errorMessage).toBe(/aaaaa/)
	})
})
