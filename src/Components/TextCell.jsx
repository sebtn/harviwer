import React, {Component} from 'react'
import FixedDataTable from 'fixed-data-table-2'
import _ from 'lodash'

const {Cell, rowIndex, columnKey, data } = FixedDataTable

export default class TextCell extends Component {
	constructor() {
		super() 
	}
  render() {
    return (
      <Cell >
      </Cell>
    )
  }
}
