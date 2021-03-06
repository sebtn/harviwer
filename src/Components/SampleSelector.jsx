import  React, {Component} from 'react'
import  ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

'use strict'
export default class SampleSelector extends Component {
	constructor() {
		super()
		this.state = {}
	}

// ________________________________________________________________
	_sampleChanged() {
		let selection = ReactDOM.findDOMNode(this.refs.selector).value
		let har =  selection 
			? _.find(window.samples, s => s.id === selection).har
			: null
			if(this.props.onSampleChanged) {
				// this.setState({activeHar: har})
				this.props.onSampleChanged(har)
			}
	}

// ________________________________________________________________
	render() {
		//populate the select component
		let options = _.map(window.samples, (s) => {
			return ( <option key={s.id} value={s.id} > {s.label} </option> )
		})
		return (
			<div>
				<label className="control-label"></label>
				<select ref="selector" className="form-control" 
					onChange={ this._sampleChanged.bind(this) }>
					<option value="">-----</option>
					{options}
				</select>
			</div>
		)
	}
} 

// ________________________________________________________________
SampleSelector.defaultProps = {
	onSampleChanged: null
}
SampleSelector.propType = {
	onSampleChanged: PropTypes.func
}