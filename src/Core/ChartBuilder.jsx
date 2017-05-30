import mimeTypes from './mimeTypes.js'

export default function(groups, parentNode, config) {
	let radius = Math.min(config.width, config.height) / 2,
		arc = d3.svg.arc()
			.outerRadius(radius - 10)
			.innerRadius(radius / 2),
		labelArc = d3.svg.arc()		
			.outerRadius(radius - 5)
			.innerRadius(radius - 5),
		pie = d3.layout.pie()
			.sort(null)
			.value(function (d) { return d.count ? d.count : 0 })
	
	let data = pie(groups),
			keyFn = (x) => { return x.data.type } 		

	let parent = d3.select(parentNode)

// ----------- Pie slices
	let path = parent.selectAll('path')
		.data(data, keyFn)

	path
		.enter()
		.append('path')

	path
		.attr('d', arc)
		.style('fill', function (d) { 
			return mimeTypes.types[d.data.type].color 
		})
		.style('fill-opacity', 0)
		.transition()
		.duration(500)
		.style('fill-opacity', 1)	

	path.exit()			
		.transition()
		.duration(500)
		.style('fill-opacity', 0)
		.remove()		

// Labels
	let text = parent.selectAll('text')
		.data(data, keyFn)

	text
		.enter()
		.append('text')
		.attr('dy', '0.5em')
		.style('font-size', '0.7em')

	text
		.transition()
		.duration(500)
		.attr('transform', function (d) {
			let angle = (d.startAngle + d.endAngle) / 2,
					degrees = displayAngle(angle)
			
			if(degrees > 90) {
					degrees -= 180
			}					
			return `translate(${labelArc.centroid(d)}) rotate(${degrees} 0 0)`
		})
		.style('text-anchor', function (d) {
			let angle = (d.startAngle + d.endAngle) / 2,
					degrees = displayAngle(angle)
			
			return (degrees > 90 ? 'end' : 'start')
		})
		.text(function (d) {
			let label = mimeTypes.types[d.data.type].label
			return `${label} (${d.data.count})`
		})

	text.exit()
		.transition()
		.duration(500)
		.style('fill-opacity', 0)
		.remove()

}

function displayAngle(radians) {
	let degrees = (radians * 180 ) / Math.PI
	degrees = degrees - 90

	return degrees
}