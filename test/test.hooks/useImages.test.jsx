import { describe, expect, it, vi } from 'vitest'
import { useImages } from '../../hooks/useImages'
import { renderHook } from '@testing-library/react'

const testResponseData = { _id: 'testId', label: 'testLabel', imgUrl: 'testImgUrl' }

const testFetch = vi.fn((url, options) => {
	return new Promise((resolve, reject) => {
		if (typeof options.body !== 'string') return reject('Not a string.')
		const testResponse = {
			ok: true,
			json() {
				return new Promise((resolve, reject) => {
					resolve(testResponseData)
				})
			},
		}
		resolve(testResponse)
	})
})

vi.stubGlobal('fetch', testFetch)

const { result } = renderHook(() => useImages())

it('useImages() should be a function', () => {
	expect(typeof useImages).toBe('function')
})

// TESTS Unitarios de metodo getImages()
describe('getImages()', () => {
	it('useImages() must have a method called "getImages()"', () => {
		expect(result.current.getImages).toBeTypeOf('function')
	})
})

// TESTS Unitarios de metodo postImages()
describe('postImage()', () => {
	it('useImages() must have a method called "postImage()"', () => {
		expect(result.current.postImage).toBeTypeOf('function')
	})

	it('Should throw if "label" provided is not a string"', () => {
		expect(() => {
			result.current.postImage(2, 'testing imgUrl')
		}).toThrow(/Type should be a string./)
	})

	it('Should throw if "imgUrl" provided is not a string', () => {
		expect(() => {
			result.current.postImage('testing label', 2)
		}).toThrow(/Type should be a string./)
	})

	it('Should return an object with propierties: "_id", "label" and "imgUrl", when success', async () => {
		const testData = { label: 'testig', imgUrl: 'image' }
		const resultTestPromise = result.current.postImage(testData)

		expect(resultTestPromise).resolves.toEqual(testResponseData)
	})

	it('Should throw in case of non-ok responses', async () => {
		const testData = { label: 'testig', imgUrl: 'image' }
		testFetch.mockResolvedValueOnce({
			ok: false,
		})
		const resultTestPromise = result.current.postImage(testData)

		expect(resultTestPromise).rejects.toThrow(/Non-ok response/)
	})
})

// TESTS Unitarios de metodo deleteImage()

describe('deleteImage()', () => {
	it('useImages() must have the method "deleteImage()"', () => {
		expect(result.current.deleteImage).toBeTypeOf('function')
	})

	it('Should throw if "imageId" provided is not a string', () => {
		expect(() => {
			result.current.deleteImage(2, 'testing userCode')
		}).toThrow(/Type should be a string./)
	})

	it('Should throw if "userCode" provided is not a string', () => {
		expect(() => {
			result.current.deleteImage('testing imageId', 2)
		}).toThrow(/Type should be a string./)
	})

	it('Should throw if "userCode" provided is not correct', async () => {
		const testWrongData = { imageId: 'testId', userCode: 'WrongCode' }
		testFetch.mockResolvedValueOnce({
			ok: false,
		})
		const resultTestPromise = result.current.deleteImage(testWrongData)

		expect(resultTestPromise).rejects.toThrow(/Your user code is not correct !/)
	})

	it('Should return a confirmation message if delete was successful', () => {
		const testData = { imageId: 'testId', userCode: 'testCode' }
		testFetch.mockImplementationOnce((url, options) => {
			return new Promise((resolve, reject) => {
				if (typeof options.body !== 'string') return reject('Not a string.')
				const testResponse = {
					ok: true,
					json() {
						return new Promise((resolve, reject) => {
							resolve({ message: 'The Photo was deleted' })
						})
					},
				}
				resolve(testResponse)
			})
		})

		const resultTestPromise = result.current.deleteImage(testData)

		expect(resultTestPromise).resolves.toStrictEqual({ message: 'The Photo was deleted' })
	})
})
