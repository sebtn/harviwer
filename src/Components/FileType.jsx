import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class FileType extends Component {
	constructor() {
		super()
		this.state = {}
	}
	render() {
		let type = this.props.type
		return (
			<div className="fileType">
				<span className={"fileType-type " + type}> {type} </span>
				<span className="fileType-url">{this.props.url}</span>
			</div>
		)
	}
}

// ________________________________________________________________
FileType.defaultProps = {
	url: null,
	type: null
}
FileType.PropType = {

}