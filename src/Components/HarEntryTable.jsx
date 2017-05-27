import  React, {Component} from 'react'
import  ReactDOM from 'react-dom'
import 'fixed-data-table/dist/fixed-data-table.css'
// import FixedDataTable from 'fixed-data-table-2'
import FixedDataTable from 'fixed-data-table'
import {Grid, Row, Col, PageHeader, Button, ButtonGroup, 
				FormGroup, FormControl, Glyphicon} from 'react-bootstrap'
import _ from 'lodash'
import PropTypes from 'prop-types'

'use strict'
const {Table, Column, Cell, rowIndex, columnKey, data, field} = FixedDataTable
const GutterWidth = 30


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
			sortDirection: {
				url: null,
				size: null,
				time: null
			},
			tableWidth:1000,
			tableHeight: 500
		}
		this._onColumnResized = this._onColumnResized.bind(this)
		this._onResize = this._onResize.bind(this)
		this._getEntry =  this._getEntry.bind(this)
		this._readKey =  this._readKey.bind(this)
		this._columnClicked =  this._columnClicked.bind(this)
		this._headerRenderer =  this._headerRenderer.bind(this)

	}
	_readKey(key, entry) {
		let keyMap = {
			url: 'request.url',
			time: 'time.start'
		}
		//size is not inside keyMap so it's key is passed
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

	_columnClicked(dataKey) {
		let sortDirections = this.state.sortDirection,
				dir = sortDirections[dataKey]
		if(dir === null ) {dir = 'asc'}			
		else if(dir === 'asc' ) {dir = 'desc'}			
		else if(dir === 'desc' ) {dir = null}			

		// Reset sort			
		_.each(_.keys(sortDirections), function(e) {
			sortDirections[e] = null
		})
			sortDirections[dataKey] = dir

		if (this.props.onColumnSort) { 
			this.props.onColumnSort(dataKey, dir) 
		}
	}

	_headerRenderer(label, dataKey) {
		// console.log(sortDirection[dataKey])
		// var dir = this.state.sortDirection[dataKey],
		//     classMap = {
		//       asc: 'glyphicon glyphicon-sort-by-attributes',
		//       desc: 'glyphicon glyphicon-sort-by-attributes-alt',
		//     }
		// console.log(dir);
		// let sortClass = dir ? classMap[dir] : 'See me?'
		// console.log(classMap[dir])
		// console.log(sortClass)

		let sortClass = 'glyphicon glyphicon-sort'

		return (
			<div className="text-primary sortable"
				onClick={() => this._columnClicked(dataKey)}>
				<strong>{label}</strong>
				&nbsp;
				<i className={sortClass}></i>
			</div>
		)
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
				<Column header={<Cell>Url</Cell>}
							  headerRenderer={this._headerRenderer}
								label='Url'
								columnKey='url'
								dataKey="url"
								cellDataGetter={this._readKey} 
								width={this.state.columnWidths.url}
								isResizable={true}
								flexGrow={null} />							
				<Column header={<Cell>Size</Cell>} 
							  headerRenderer={this._headerRenderer}
								label='Size'
								columnKey="size"
								dataKey="size"
								width={this.state.columnWidths.size}
								cellDataGetter={this._readKey} 
								isResizable={true} />							
			<Column   header={<Cell>TimeLine</Cell>}
							  headerRenderer={this._headerRenderer}
								label='TimeLine'
								columnKey="time"
								dataKey="time"
								width={this.state.columnWidths.time}
								cellDataGetter={this._readKey} 
								minWidth={200}
								isResizable={true} />
			</Table>		
		)
	}
}

HarEntryTable.defaultProps = {
	entries: [],
	page: null,
	onColumnSort: null
}

HarEntryTable.porpType =  {
	entries: PropTypes.array,
	onColumnSort: PropTypes.func,
	page: PropTypes.object
}
