import  ReactDOM from 'react-dom'
import  React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import mimeTypes from '../Core/mimeTypes.js'
import {Grid, Row, Col, PageHeader, Button, ButtonGroup, 
				FormGroup, FormControl, Alert, Input} from 'react-bootstrap'
import HarEntryTable from './HarEntryTable.jsx'
import FilterBar from './FilterBar.jsx'
import harParser from '../Core/harParser.js'

'use strict'
export default class HarViewer extends Component {
	constructor() {
		super() 
		this.state = 	this._initialState()	
	}

// ________________________________________________________________
	_initialState() {
		return {
			activeHar: null,
			sortKey: null,
			sortDirection: null,
			filterType: 'all',
			filterText: null,
		}
	}

// ________________________________________________________________
	_onFilterChanged (type) {
		this.setState({filterType: type})	
	}

// ________________________________________________________________
	_onFilterTextChanged (text) {
		this.setState({filterText: text})	
	}

// ________________________________________________________________
	_filterEntries(filter, entries) {
		return _.filter(entries, function(f) {
			let matchesType = filter.type === 'all' || filter.type === f.type
			let matchesText = _.includes(f.request.url, filter.text || '')
			return matchesType && matchesText
		})
	}

// ________________________________________________________________
	_sampleChanged() {
		let selection = ReactDOM.findDOMNode(this.refs.selector).value
		let har =  selection 
			? _.find(window.samples, s => s.id === selection).har
			: null
			if(har) {
				this.setState({activeHar: har})
			}
			else {
				this.setState(this._initialState())
			}
	}

// ________________________________________________________________
	_onColumnSort(dataKey, dir) {
		this.setState({sortKey: dataKey, sortDirection: dir})
		// const nextSortkey = Object.assign({}, this.state.sortKey, dataKey)
		// const sortDirection = Object.assign({}, this.state.sortDirection, dir)
		// this.setState({sortKey: nextSortkey, sortDirection: sortDirection})  
	}

// ________________________________________________________________
	_sortEntriesByKey(sortKey, sortDirection, entries) {
		if(_.isEmpty(sortKey) | _.isEmpty(sortDirection)) return entries
			let keyMap = {
				url: 'request.url',
				time: 'time.start'
				},
				getValue = function(entry) {
					let key = keyMap[sortKey] || sortKey
					return _.get(entry, key)
			}
			let sorted =  _.sortBy(entries, getValue)
			if (sortDirection === 'desc') {
				sorted.reverse()
			}
			return sorted
	}

// ________________________________________________________________
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

// ________________________________________________________________
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

// ________________________________________________________________
	_renderViewer(har) {
		let pages = harParser.parse(har)
		let currentPage = pages[0]
		let filter = {
				type: this.state.filterType,
				text: this.state.filterText
				}
		let filteredEntries = this._filterEntries(filter, currentPage.entries)
		let entries = this._sortEntriesByKey(this.state.sortKey, 
									this.state.sortDirection, 
									filteredEntries)
		return (
			<Grid>
				<Row>
					<Col sm={12}>
						<HarEntryTable entries={entries} 
						onColumnSort={this._onColumnSort.bind(this)} />
					</Col>
				</Row>		
			</Grid>				
		)
	}

// ________________________________________________________________
	// renderHeader is returning the Grid
	_renderHeader() {
		//populate the select component
		let options = _.map(window.samples, (s) => {
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
							<select ref="selector" className="form-control" 
								onChange={ this._sampleChanged.bind(this) }>
								<option value="">-----</option>
								{options}
							</select>
						</div>
					</Col>
				</Row>
				<FilterBar onChange={ this._onFilterChanged.bind(this) } 
					_onFilterTextChange={this._onFilterTextChanged.bind(this) } />

			</Grid>
		)
	}
}

// ________________________________________________________________



