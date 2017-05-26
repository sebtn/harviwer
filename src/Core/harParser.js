import _ from 'lodash'
import Page from './Page.js'
import Entry from './Entry.js'

export default {
	parse: parse
}

function parse(har) {
	'use strict'
	let pageMap = {},
			pages = []
	_.each(har.log.pages, function (p) {
			let page = new Page(p)
			pageMap[p.id] = page
			pages.push(page)
	})
	_.each(har.log.entries, function (p) {
		let page = pageMap[p.pageref],
				entry = new Entry(p, page)

		page.entries.push(entry)
	})
	return pages
}
