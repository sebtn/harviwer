import  ReactDOM from 'react-dom'
import  React, {Component, PorpTypes} from 'react'
import _ from 'lodash'
import FixedDataTable from 'fixed-data-table-2'
import 'fixed-data-table-2/dist/fixed-data-table.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import mimeTypes from '../Core/mimeTypes.js'
import {Grid, Row, Col, PageHeader, Button, ButtonGroup, 
				FormGroup, FormControl} from 'react-bootstrap'
require('../app.scss')

'use strict'
const {Table, Column, Cell} = FixedDataTable
const GutterWidth = 30;

export default class HarViewer extends Component {
	constructor() {
		super() 
		this.state = {
			isColumnResizing: false,
			columnWidths: {
				url:500,
				size:200,
				time:200
			},
			tableWidth:1000,
			tableHeight: 500
		}
		this._getEntry = this._getEntry.bind(this)
		this._onColumnResized = this._onColumnResized.bind(this)
		this._onResize = this._onResize.bind(this)
		this._sampleChanged = this._sampleChanged.bind(this)
		this._filterdTextChanged = this._filterdTextChanged.bind(this)
		this._filterRequested = this._filterRequested.bind(this)
	}

// ___________________________________________________________________
// 
	_filterdTextChanged() {

	}

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

	_filterRequested(type, event) {

	}

	_sampleChanged() {

	}

	_onResize() {
		// automatically adjustment of width and height of table
		// let parent = ReactDOM.findDOMNode(this).parentNode  
		let parent = ReactDOM.findDOMNode(this.refs.entriesTable).parentNode 
		this.setState({
			tableWidth: parent.clientWidth - GutterWidth,
			tableHeight: document.body.clientHeight - parent.offsetTop - GutterWidth * 0.5
		})
	}

	componentDidMount() {
		let global = window
		// you debounce something that repeats a lot
		global.addEventListener('resize', _.debounce(this._onResize), 50, {leading : true, trailing: true})
		this._onResize()
	}

	_onColumnResized(newColumnWidth, columnKey) { 
		let columnWidths = this.state.columnWidths
		// Select the col by key, then  the new col 
		// width can be set anything, this case 
		// is called newColumnWidth... could be x
		columnWidths[columnKey] = newColumnWidth
		this.setState({columnWidths: columnWidths, isResizable:false})
	}

	_getEntry(index) {
		return  this.props.entries[index] 
	}

	render() {
		const buttons = _.map(_.keys(mimeTypes.types), (x) => {
			return this._createButton(x, mimeTypes.types[x].label)
		})
		return(	
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
						<Table  ref="entriesTable" 
									  rowsCount={this.props.entries.length}
										width={this.state.tableWidth} 
										headerHeight={35} 
										height={this.state.tableHeight}
										rowHeight={30}
										rowGetter={this._getEntry}
										isColumnResizing={this.state.isColumnResizing}
										onColumnResizeEndCallback={this._onColumnResized}
										>
							<Column header="Url" 
											columnKey="url"
											width={this.state.columnWidths.url}
											isResizable={true}
											flexGrow={null} />							
							<Column header="Size" 
											columnKey="size"
											width={this.state.columnWidths.size}
											isResizable={true} />							
						<Column   header="TimeLine"
											columnKey="time"
											width={this.state.columnWidths.time}
											minWidth={200}
											isResizable={true} />
						</Table>		
					</Col>
				</Row>		
			</Grid>
		)
	}
}

HarViewer.defaultProps = {
	entries: []
}

