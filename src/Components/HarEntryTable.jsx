import  React, {Component, PorpTypes} from 'react'
import  ReactDOM from 'react-dom'
import 'fixed-data-table/dist/fixed-data-table.css'
// import FixedDataTable from 'fixed-data-table-2'
import FixedDataTable from 'fixed-data-table'
import {Grid, Row, Col, PageHeader, Button, ButtonGroup, 
				FormGroup, FormControl} from 'react-bootstrap'
import TextCell from './TextCell.jsx'
import _ from 'lodash'

'use strict'
const {Table, Column, Cell, rowIndex, columnKey, data, field} = FixedDataTable

const GutterWidth = 30;

export default class HarEntryTable extends Component {
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
		this._onColumnResized = this._onColumnResized.bind(this)
		this._onResize = this._onResize.bind(this)
		this._getEntry =  this._getEntry.bind(this)
		this._readKey =  this._readKey.bind(this)

	}
	_readKey(key, entry) {
		let keyMap = {
			url: 'request.url',
			time: 'time.start'
		}
		key = keyMap[key] || key
		return _.get(entry, key)
	}

	_getEntry(index) {
		return this.props.entries[index] 
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
		global.addEventListener('resize', 
			_.debounce(this._onResize), 50, {leading : true, trailing: true})
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

	render() {

		return (					
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
				<Column header='url'
								columnKey='url'
								cellDataGetter={this._readKey} 
								dataKey="url"
								width={this.state.columnWidths.url}
								isResizable={true}
								flexGrow={null} />							
				<Column header="Size" 
								columnKey="size"
								dataKey="size"
								width={this.state.columnWidths.size}
								cellDataGetter={this._readKey} 
								isResizable={true} />							
			<Column   header="TimeLine"
								columnKey="time"
								dataKey="url"
								width={this.state.columnWidths.time}
								cellDataGetter={this._readKey} 
								minWidth={200}
								isResizable={true} />
			</Table>		
		)
	}
}

HarEntryTable.defaultProps = {
	entries: []
}
