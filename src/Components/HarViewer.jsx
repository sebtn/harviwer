import  ReactDOM from 'react-dom'
import  React, {Component, PorpTypes} from 'react'
import _ from 'lodash'
import mimeTypes from '../Core/mimeTypes.js'
import {Grid, Row, Col, PageHeader, Button, ButtonGroup, 
				FormGroup, FormControl, Alert} from 'react-bootstrap'
import HarEntryTable from './HarEntryTable.jsx'
import harParser from '../Core/harParser.js'

'use strict'
export default class HarViewer extends Component {
	constructor() {
		super() 
		this.state = 	this._initialState()
		
		this._sampleChanged = this._sampleChanged.bind(this)
		this._filterdTextChanged = this._filterdTextChanged.bind(this)
		this._filterRequested = this._filterRequested.bind(this)
		this._renderHeader = this._renderHeader.bind(this)
		this._initialState = this._initialState.bind(this)
		this._renderViewer = this._renderViewer.bind(this)
		this._renderEmptyViewer = this._renderEmptyViewer.bind(this)
	}

// ___________________
// 		METHODS TO USE  |
// ___________________|

	_initialState() {
		return {
			activeHar: null,
			entries: []
		}
	}

	_sampleChanged() {
		let selection = ReactDOM.findDOMNode(this.refs.selector).value
		let har =  selection 
			? _.find(window.samples, s => s.id === selection).har
			: null
			if(har) {
				this.setState({activeHar: har})
				console.log('active har obj:' , {activeHar: har})

			}
			else {
				this.setState(this._initialState())
			}
	}

	_filterRequested(type, event) {}

	_filterdTextChanged() {}

	_createButton(type, label) {
		var handler = this._filterRequested(type)
		return (
			<Button key={type}
							bsStyle="primary"
							active={this.state.type === type}
							onClick={handler}> { label }
			</Button>	
		)
	}

	render() {
		let content = this.state.activeHar
										? this._renderViewer(this.state.activeHar)
										: this._renderEmptyViewer()	

		return (	
			<div>
				{this._renderHeader()}
				{content}
			</div>
		)
	}

	_renderEmptyViewer() {
		return(
			<Grid>
				<Row>
					<Col sm={12}>
						<p></p>
						<Alert bsStyle="warning">
							<strong>No HAR loaded</strong>
						</Alert>
					</Col>
				</Row>		
			</Grid>				
		)
	}

	_renderViewer(har) {
		let pages = harParser.parse(har), 
				currentPage = pages[0]
		let entries = currentPage.entries
			console.log('pages: ', pages)
			console.log('entries: ', entries)
		return (
			<Grid>
				<Row>
					<Col sm={12}>
						<HarEntryTable entries={entries} />
					</Col>
				</Row>		
			</Grid>				
		)
	}

	// renderHeader is returning the Grid
	_renderHeader() {
		const buttons = _.map(_.keys(mimeTypes.types), (x) => {
			return this._createButton(x, mimeTypes.types[x].label)
		})
		//populate the select component
		const options = _.map(window.samples, (s) => {
			return ( <option key={s.id} value={s.id} > {s.label} </option> )
		})
		return (
			<Grid>
				<Row>
					<Col className="pageHeader" sm={12}>
						<PageHeader>HarViewer</PageHeader>
					</Col>
				</Row>
				<Row>
					<Col sm={12}>
						<p>PIE CHART</p>
					</Col>
				</Row>
				<Row>
					<Col className="margined" sm={4}>
						<div>
							<label className="control-label"></label>
							<select ref="selector" className="form-control" onChange={this._sampleChanged}>
								<option value="">-----</option>
								{options}
							</select>
						</div>
					</Col>
				</Row>
				<Row>
						<Col sm={8}>
							<ButtonGroup bsSize="large">
								{this._createButton('all', 'All')}
								{buttons}
							</ButtonGroup> 
						</Col>
						<Col sm={4}>
							<FormGroup>
								<FormControl type="search"
														  placeholder="Search URL"
														  bsSize="small"
														  onChange={this._filterdTextChanged}
														  inputRef={ ref => { this.input = ref } } />
							</FormGroup>														  
						</Col>
				</Row>
			</Grid>
		)
	}
}

HarViewer.defaultProps = {
	entries: []
}

