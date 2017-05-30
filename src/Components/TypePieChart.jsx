import  React, {Component} from 'react'
import  ReactDOM from 'react-dom'
import _  from 'lodash'
import PropTypes from 'prop-types'
import d3 from 'd3'
import ChartBuilder from '../Core/ChartBuilder.jsx'

'use strict'
export default class TypePieChart extends Component {
	constructor() {
		super()
		this.state = {
			svgWidth:325,
			svgHeight:325,
			width:150,
			height:150
		}
	}

	// ________________________________________________________________
	componentDidMount() {
		this._buildChart(this.props.entries)
	}

	// ________________________________________________________________
	componentWillReceiveProps(props) {
		if(this.props.entries.length !== props.entries.length) {
			this._buildChart(props.entries)
		}
	}

	// ________________________________________________________________
	_buildChart(entries) {
		//build the entries by type
		let groups = this._getEntriesByGroup( entries ),
				config = {
					width:this.state.width,
					height:this.state.height
				}
				// console.log(groups)

		ChartBuilder(groups, this.refs.container, config)				
	}

	// ________________________________________________________________
	_getEntriesByGroup(entries) {
		// entries group by type prop and then 
		// for each group create a new object
		//  with type and the count of numbers 
		//  of items in group. Both are to be displayed
		return _.chain(entries)
					.groupBy(function (x)  {
						return x.type 
					})
					.map(function(g, key)  {
						return {
							type:key,
							count:g.length
						}
					})
					.value()	
	}

	render() {
		// let center = {
		// 	x: this.state.svgWidth,
		// 	Y: this.state.svgHeight 
		// }
		return (
				<svg  ref="container" width={this.state.svgWidth} height={this.state.svgHeight}>
					{/*<g  ref="container"  transform={ `translate(${center.x}, ${center.y})` }></g>*/}
				</svg>
		)
	}

}

// ________________________________________________________________
TypePieChart.defaultProps = {
	entries: []
}
