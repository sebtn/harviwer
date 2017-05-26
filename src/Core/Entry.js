import mimeTypes from './mimeTypes.js'

export default class Entry {
	constructor(harEntry, page) {
		'use strict'
		let startTime = new Date(harEntry.startedDateTime) 
									- new Date(page.startedDateTime)
		// this is the rescue
		let {
			time,
			request: { url, method },
			response: {
				content: {size, mimeType}
				},
			timings
			} = harEntry

		this.request = {url: url, method: method}
		this.time = {
			start: startTime,
			total: time,
			details: timings
		}
		this.size = size
		this.type = mimeTypes.identify(mimeType)
	}
}