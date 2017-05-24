import  React, {Component, PorpTypes} from 'react'
import _ from 'lodash'
import {Row, Col, PageHeader, Button, ButtonGroup, Input} from 'react-bootstrap'
import FixedDataTable from 'fixed-data-table-2'
import 'fixed-data-table-2/dist/fixed-data-table.css'

const {Table, Column, Cell} = FixedDataTable

export default class HarViewer extends Component {
	constructor() {
		super() 
		this.state = {
			columnWidths: {
				url:500,
				size:200,
				time:200
			},
			tableWidth:1000,
			tableHeight: 500
		}
		this._getEntry = this._getEntry.bind(this)
	}

	/*_________________

	 METHODS CUTSOM
	 _________________*/

	_getEntry(index) {
		return this.props.entries[index]
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

				<Row className="container-fluid">
					<Col sm={12}>
						<Table rowsCount={this.props.entries.length}
										width={this.state.tableWidth}
										headerHeight={35}
										height={this.state.tableHeight}
										rowHeight={30}
										rowGetter={this._getEntry}>
							<Column header="Url" 
											width={this.state.columnWidths.url}
											isResizable={true}
											flexGrow={null} />							
							<Column  header="Size" 
											width={this.state.columnWidths.size}
											isResizable={true} />							
						<Column   header="TimeLine"
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

