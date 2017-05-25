import  React, {Component, PorpTypes} from 'react'
import _ from 'lodash'
import {Row, Col, PageHeader, Button, ButtonGroup, Input} from 'react-bootstrap'
import FixedDataTable from 'fixed-data-table-2'
import 'fixed-data-table-2/dist/fixed-data-table.css'
'use strict'

const {Table, Column, Cell} = FixedDataTable

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
	}

// ___________________________________________________________________

	_getEntry(index) {
		return  this.props.entries[index] 
	}

	_onColumnResized(newColumnWidth, columnKey) { 
		let columnWidths = this.state.columnWidths
		// Select the col by key, then  the new col 
		// width can be set anything, this case 
		// is called newColumnWidth... could be x
		columnWidths[columnKey] = newColumnWidth
		this.setState({columnWidths: columnWidths, isResizable:false})
	}

	componentDidMount() {
		
	}

	render() {
		return(	
			<div>
				<div className="container-fluid pageHeader">
					<Row>
						<Col sm={12}>
							<PageHeader>HarViewer</PageHeader>
						</Col>
					</Row>			
				</div>

				<Row className="container">
					<Col sm={12}>
						<Table  rowsCount={this.props.entries.length}
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

			</div>
		)
	}
}

HarViewer.defaultProps = {
	entries: []
}

