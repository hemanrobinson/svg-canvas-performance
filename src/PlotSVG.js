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
        PlotSVG.create( this );
        PlotSVG.draw( this );
    }
    
    // Render and return the component.
    render() {
        PlotSVG.create( this );
        PlotSVG.draw( this );
        return <svg width={this.width} height={this.height} ref={this.svgRef}></svg>
    }
    
    // Creates SVG elements.
    static create( that ) {
    
        // Create the points.
        const svg = d3.select( that.svgRef.current );
        let sgvShape = ( that.props.shape === "circle" ) ? "circle" : "rect";
        svg.selectAll( sgvShape ).remove();
        that.props.data.forEach(() => {
            svg.append( sgvShape )
                .style( "fill", "none" )
                .style( "stroke", "black" );
        });
        
        // Create the time.
        svg.selectAll( "text" ).remove();
        svg.append( "text" );
    }
    
    // Draws the scatter plot and the time.
    static draw( that ) {
        
        // Initialization.
        let { height, svgRef, xScale, yScale } = that,
            { data, size, shape, opacity } = that.props;
        
        // Draw the points.  +0.5 minimizes anti-aliasing.
        let t0 = Date.now();
        const svg = d3.select( svgRef.current );
        if( shape === "circle" ) {
            svg.selectAll( "circle" )
                .data( data )
                .attr( "cx", ( datum ) => Math.round( xScale( datum[ 0 ])) + 0.5 )
                .attr( "cy", ( datum ) => Math.round( yScale( datum[ 1 ])) + 0.5 )
                .attr( "r", size / 2 )
                .style( "opacity", opacity )
        } else {
            svg.selectAll( "rect" )
                .data( data )
                .attr( "x", ( datum ) => Math.round( xScale( datum[ 0 ])) + 0.5 )
                .attr( "y", ( datum ) => Math.round( yScale( datum[ 1 ])) + 0.5 )
                .attr( "width", size )
                .attr( "height", size )
                .style( "opacity", opacity )
        }
        let t1 = Date.now() - t0;
                      
        // Draw the time.
        svg.select( "text" )
            .attr( "x", 10 )
            .attr( "y", height - 10 )
            .text( "SVG " + shape + "s: " + t1 + "  msec" );
    }
}

export default PlotSVG;
