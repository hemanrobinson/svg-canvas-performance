import React from 'react';
import * as d3 from 'd3';
import './PlotSVG.css';

// Scatter plot in an SVG element.
class PlotSVG extends React.Component {
    
    // Constructor:  Creates reference and scales.
    constructor( props ) {
        super( props );
        this.svg = React.createRef();
        this.xScale = d3.scaleLinear()
            .domain([ 0, 1 ])
            .range([ 0, this.props.width ]);
        this.yScale = d3.scaleLinear()
            .domain([ 0, 1 ])
            .range([ this.props.height, 0 ]);
    }
    
    // Draws on mounting.
    componentDidMount() {
        this.draw( this.props.data );
    }
    
    // Draws the scatter plot.
    draw( data )  {
        
        // Create the SVG element.
        const svg = d3.select( this.svg.current )
            .append( "svg" )
            .attr( "width", this.props.width )
            .attr( "height", this.props.height );
        
        // Draw the points.
        let t0 = Date.now();
        svg.selectAll( "circle" )
            .data( data ).enter()
            .append( "circle" )
            .attr( "cx", ( datum ) => this.xScale( datum[ 0 ]))
            .attr( "cy", ( datum ) => this.yScale( datum[ 1 ]))
            .attr( "r", this.props.size )
            .style( "opacity", this.props.opacity )
            .style( "fill", "none" )
            .style( "stroke", "black" )
        this.time = Date.now() - t0;
        console.log( "svg:    " + this.time );
    }
    
    render() { return <div ref={this.svg}></div> }
}

export default PlotSVG;
