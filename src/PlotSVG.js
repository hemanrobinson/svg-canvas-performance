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
            .range([ 0, props.width ]);
        this.yScale = d3.scaleLinear()
            .domain([ 0, 1 ])
            .range([ props.height, 0 ]);
    }
    
    // Draws on mounting.
    componentDidMount() {
        this.draw( this.props.data, this.props.size, this.props.opacity );
    }
    
    // Draws the scatter plot.
    draw( data, size, opacity )  {
        
        // Create the SVG element.
        const svg = d3.select( this.svg.current )
            .append( "svg" )
            .attr( "width", this.props.width )
            .attr( "height", this.props.height );
        
        // Draw the points.
        let t0 = Date.now();
        if( this.props.shape === "circle" ) {
            svg.selectAll( "circle" )
                .data( data ).enter()
                .append( "circle" )
                .attr( "cx", ( datum ) => this.xScale( datum[ 0 ]))
                .attr( "cy", ( datum ) => this.yScale( datum[ 1 ]))
                .attr( "r", size / 2 )
                .style( "opacity", opacity )
                .style( "fill", "none" )
                .style( "stroke", "black" )
        } else {
            svg.selectAll( "rect" )
                .data( data ).enter()
                .append( "rect" )
                .attr( "x", ( datum ) => this.xScale( datum[ 0 ]))
                .attr( "y", ( datum ) => this.yScale( datum[ 1 ]))
                .attr( "width", size )
                .attr( "height", size )
                .style( "opacity", opacity )
                .style( "fill", "none" )
                .style( "stroke", "black" )
        }
        this.time = Date.now() - t0;
        console.log( "svg:    " + this.props.shape + "  " + this.time );
    }
    
    render() { return <div ref={this.svg}></div> }
}

export default PlotSVG;
