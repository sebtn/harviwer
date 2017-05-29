import React, {Component} from 'react'
import PropTypes from 'prop-types'

'use strict'
export default class TimeBar extends Component {
	constructor() {
		super()
		this.state = {}
	}
	render() {
		return (
			<span>{this.props.total}</span>

		)
	}
}

// ________________________________________________________________
TimeBar.defaultProps = {
	scale: null,
	start:0,
	total:0,
	timings: null,
	domContentLoad:0,
	pageLoad:0
}

TimeBar.propType = {
	scale: PropTypes.func,
	start:PropTypes.number,
	total:PropTypes.number,
	timings: PropTypes.object,
	domContentLoad:PropTypes.number,
	pageLoad: PropTypes.number
}