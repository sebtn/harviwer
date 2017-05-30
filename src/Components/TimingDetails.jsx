import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Formatter from '../Core/Formatter.js'

'use strict'
export default class TiminigDetails extends Component {
	constructor() {
		super()
		this.state= {}
	}
	render() {
		let {blocked, connect, dns, wait, send, receive} = this.props.timings
		return(
			<table className="table table-condensed timing-details">
				<tbody>
					<tr className="bg-danger">
						<td><strong>Start</strong></td>
						<td>{Formatter.time(this.props.start)}</td>
					</tr>
					<tr className="timing-group">
						<td><small>Blocked</small></td>
						<td>{Formatter.time(blocked)}</td>
					</tr>
					<tr className="timing-group">
						<td><small>dns</small></td>
						<td>{Formatter.time(dns)}</td>
					</tr>
					<tr className="timing-group">
						<td><small>Send</small></td>
						<td>{Formatter.time(send)}</td>
					</tr>
					<tr className="timing-group">
						<td><small>Wait</small></td>
						<td>{Formatter.time(wait)}</td>
					</tr>
					<tr className="timing-group">
						<td><small>Receive</small></td>
						<td>{Formatter.time(receive)}</td>
					</tr>
					<tr className="bg-success">
						<td><strong>Total</strong></td>
						<td>{Formatter.time(this.props.total)}</td>
					</tr>
				</tbody>
			</table>
		)
	}
}
TiminigDetails.defaultProps = {
	timings: null,
	start:0,
	total: 0
}