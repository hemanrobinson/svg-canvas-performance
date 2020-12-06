import React from 'react';
import * as d3 from 'd3';
import './PlotSVG.css';

// Scatter plot in an SVG element.
class PlotSVG extends React.Component {
    
    // Constructor:  Creates reference and scales.
    constructor( props ) {
        super( props );
        this.width = 400;
        this.height = 400;
        this.svgRef = React.createRef();
        this.xScale = d3.scaleLinear().domain([ 0, 1 ]).range([ 0, this.width ]);
        this.yScale = d3.scaleLinear().domain([ 0, 1 ]).range([ this.height, 0 ]);
    }
    
    // Draws on mounting.
    componentDidMount() {
        
        // Create the points.
        const svg = d3.select( this.svgRef.current );
        let sgvShape = ( this.props.shape === "circle" ) ? "circle" : "rect";
        this.props.data.forEach(() => {
            svg.append( sgvShape );
        });
        
        // Create the time.
        svg.append( "text" );
                        
        // Draw both.
        this.draw();
    }
    
    // Draws the scatter plot and the time.
    draw() {
        
        // Initialization.
        let { width, height, svgRef, xScale, yScale } = this;
        let { data, size, shape, opacity } = this.props;
        
        // Draw the points.
        let t0 = Date.now();
        const svg = d3.select( svgRef.current );
        if( shape === "circle" ) {
            svg.selectAll( "circle" )
                .data( data )
                .attr( "cx", ( datum ) => Math.round( xScale( datum[ 0 ])) + 0.5 )
                .attr( "cy", ( datum ) => Math.round( yScale( datum[ 1 ])) + 0.5 )
                .attr( "r", size / 2 )
                .style( "opacity", opacity )
                .style( "fill", "none" )
                .style( "stroke", "black" )
        } else {
            svg.selectAll( "rect" )
                .data( data )
                .attr( "x", ( datum ) => Math.round( xScale( datum[ 0 ])) + 0.5 )
                .attr( "y", ( datum ) => Math.round( yScale( datum[ 1 ])) + 0.5 )
                .attr( "width", size )
                .attr( "height", size )
                .style( "opacity", opacity )
                .style( "fill", "none" )
                .style( "stroke", "black" )
        }
        let t1 = Date.now() - t0;
                      
        // Draw the time.
        svg.select( "text" )
            .attr( "x", width / 2 )
            .attr( "y", height - 10 )
            .text( "SVG " + shape + "s: " + t1 + "  msec" );
    }
    
    // Return the component.
    render() {
        return <svg width={this.width} height={this.height} ref={this.svgRef}></svg>
    }
}

export default PlotSVG;
