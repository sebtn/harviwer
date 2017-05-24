
import  React, {Component, PorpTypes} from 'react'
import _ from 'lodash'
import {Row, Col, PageHeader, Button, ButtonGroup, Input} from 'react-bootstrap'
import FixedDataTable from 'fixed-data-table'


const Table = FixedDataTable.Table
const Column = FixedDataTable.Column

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
			<Row>
				<Row>
					<Col sm={12}>
						<PageHeader>HarViewer</PageHeader>
					</Col>
				</Row>			

				<Row>
					<Col sm={12}>
						<Table rowsCount={this.props.entries.length}
										width={this.state.tableWidth}
										headerHeight={35}
										height={this.state.tableHeight}
										rowHeight={30}
										rowGetter={this._getEntry}>
							<Column dataKey="url"
											width={this.state.columnWidths.url}
											isResizable={true}
											label="Url" 
											flexGrow={null}/>							
							<Column  dataKey="size"
											width={this.state.columnWidths.size}
											isResizable={true}
											label="Size" />							
						<Column   dataKey="time"
											width={this.state.columnWidths.time}
											minWidth={200}
											isResizable={true}
											label="TimeLine" />
						</Table>		
					</Col>
				</Row>		

			</Row>
		)
	}
}


HarViewer.defaultProps = {
	entries: []
}

