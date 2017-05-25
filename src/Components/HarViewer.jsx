import  ReactDOM from 'react-dom'
import  React, {Component, PorpTypes} from 'react'
import _ from 'lodash'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import mimeTypes from '../Core/mimeTypes.js'
import {Grid, Row, Col, PageHeader, Button, ButtonGroup, 
				FormGroup, FormControl} from 'react-bootstrap'
import HarEntryTable from './HarEntryTable.jsx'

'use strict'
export default class HarViewer extends Component {
	constructor() {
		super() 
		this.state = {
			c: []
		}
		this._getEntry =  this._getEntry.bind(this)
		this._sampleChanged = this._sampleChanged.bind(this)
		this._filterdTextChanged = this._filterdTextChanged.bind(this)
		this._filterRequested = this._filterRequested.bind(this)
	}

// ___________________________________________________________________

	_sampleChanged() {}

	_filterRequested(type, event) {}

	_filterdTextChanged() {}

	_createButton(type, label) {
		var handler = this._filterRequested(this, type)
		return (
			<Button key={type}
							bsStyle="primary"
							active={this.state.type === type}
							onClick={handler}> { label }
			</Button>	
		)
	}
	_getEntry(index) {
		return  this.props.entries[index] 
	}

	render() {
		const buttons = _.map(_.keys(mimeTypes.types), (x) => {
			return this._createButton(x, mimeTypes.types[x].label)
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
							<select className="form-control" onChange={this._sampleChanged}>
								<option value="">----</option>
							</select>
						</div>
					</Col>
				</Row>
				<Row>
						<Col sm={8}>
							<ButtonGroup bsSize="small">
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
				<Row>
					<Col sm={12}>
						<HarEntryTable entrie={this.state.entries} />
					</Col>
				</Row>		
			</Grid>
			)
	}
}

HarViewer.defaultProps = {
	entries: []
}

