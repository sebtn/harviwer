import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Formatter from '../Core/Formatter.js'
import TimingDetails from './TimingDetails.jsx'
import {OverlayTrigger, Popover} from 'react-bootstrap'


'use strict'
export default class TimeBar extends Component {
	constructor() {
		super()
		this.state = {}
	}
	render() {
		let value = (v) => {
			return `${this.props.scale(v)}%`
		},
		bars = [
			{
				type: 'time',
				style: {
					left: value(this.props.start),
					width: value(this.props.total)
				},
				className: 'timebar-mark-time'
			},
			{
				type: 'domContentLoad',
				style: {
					left: 80,
					width: 1
				},
				className: 'timebar-mark-contentLoad'
			},
			{
				type: 'pageLoad',
				style: {
					left: value(this.props.pageLoad),
					width: 1
				},
				className: 'timebar-mark-pageLoad'
			}
		]
		let label = Formatter.time(this.props.total)

		let barElements = _.chain(bars)
				.map((b) => {
					return (<div key={b.type} 
					className={`timebar-mark ${b.className}` } 
					style={b.style} ></div>)
				}) 
				.value()

		let overlay = (<Popover title={`Timing Details satrted at 
			${Formatter.time(this.props.start)}`}>
				<TimingDetails timings={this.props.timings}
											 start={this.props.start}
											 total={this.props.total}
				/>					
			</Popover>
		)			
		return (
			<OverlayTrigger trigger={['hover', 'focus']}
											placement='left'
											delay={0}
											overlay={overlay}
											>
				<div className="timebar">
					{barElements}
				<span className="timebar-label">{label}</span>
				</div>
			</OverlayTrigger>
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