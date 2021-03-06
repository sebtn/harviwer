import  React, {Component} from 'react'
import _ from 'lodash'
import mimeTypes from '../Core/mimeTypes.js'
import {Grid, Row, Col, PageHeader, Button, ButtonGroup, 
				FormGroup, FormControl, Alert, Input} from 'react-bootstrap'
import PropTypes from 'prop-types'

'use strict'
export default class FilterBar extends Component {

	constructor() {
		super()
		this.state = {
			type: 'all'
		}
	}

// ________________________________________________________________
	_createButton(type, label) {
		let handler = this._filterRequested.bind(this, type)
		return (
				<Button 
					key={type}
					bsStyle="primary"
					active={this.state.type === type}
					onClick={handler}
				> 
					{ label }
				</Button>	
		)
	}

// ________________________________________________________________
// Firing callback to be handled in harViewer, onChange
	_filterRequested(type, event) {
		this.setState({type: type})
		this.props.onChange(type)
	}

// ________________________________________________________________
// Firing callback to be handled in harViewer, onFilterTextChange
	_filterTextChanged(event) {	
		const text = event.target.value
		this.props._onFilterTextChange(text)
	}

// ________________________________________________________________
	render() {
		const buttons = _.map(_.keys(mimeTypes.types), (x) => {
			return this._createButton(x, mimeTypes.types[x].label)
		})
		return (
			<Row>
					<Col sm={8}>
							<ButtonGroup bsSize="large">
								{this._createButton('all', 'All')}
								{buttons}
							</ButtonGroup> 
					</Col>
					<Col sm={4}>
						<FormGroup>
								<input 
									type="search"
								  placeholder="Search URL"
								  onChange={ this._filterTextChanged.bind(this) } 
								  ref='input' 
							  /> 
						</FormGroup>														  
					</Col>
			</Row>
		)
	}
}

// ________________________________________________________________
FilterBar.defaultProps = {
	onChange: null,
	onFilterTextChange: null
}
FilterBar.porpType =  {
	onChange: PropTypes.func,
	onFilterTextChange: PropTypes.func
}