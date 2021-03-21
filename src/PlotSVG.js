import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './PlotSVG.css';

/**
 * Scatter plot in an SVG element.
 *
 * @param  {Object}  props  properties
 * @return component
 */
const PlotSVG = ( props ) => {
    
    // Create reference and scales.
    const width = 300, height = 300;
    let ref = useRef(),
        xScale = d3.scaleLinear().domain([ 0, 1 ]).range([ 0, width ]),
        yScale = d3.scaleLinear().domain([ 0, 1 ]).range([ height, 0 ]),
        { shape, data, size, opacity } = props;
    
    // Set hook to draw on mounting.
    useEffect(() => {
        PlotSVG.draw( height, ref, xScale, yScale, shape, data, size, opacity );
    });
    
    // Return the component.
    return <svg width={width} height={height} ref={ref}></svg>;
};

/**
 * Draws the points and the time.
 *
 * @param {number}     height   height in pixels
 * @param {Array}      ref      reference to SVG element
 * @param {d3.scale*}  xScale   X scale
 * @param {d3.scale*}  yScale   Y scale
 * @param {string}     shape    one of "circle", "square"
 * @param {Array}      data     Array of x, y values between 0 and 1
 * @param {number}     size     size in pixels
 * @param {number}     opacity  alpha, between 0 and 1
 */
PlotSVG.draw = ( height, ref, xScale, yScale, shape, data, size, opacity ) => {
    
    // If the data changed, re-create the SVG elements.  +0.5 minimizes anti-aliasing.
    const svg = d3.select( ref.current );
    let allShapes = svg.selectAll(( shape === "circle" ) ? "circle" : "rect" );
    if( allShapes.size() !== data.length ) {
        allShapes.remove();
        if( shape === "circle" ) {
            data.forEach(( datum ) => {
                svg.append( "circle" )
                    .attr( "cx", Math.round( xScale( datum[ 0 ]) + 0.5 ))
                    .attr( "cy", Math.round( yScale( datum[ 1 ]) + 0.5 ))
                    .style( "fill", "none" )
                    .style( "stroke", "black" );
            });
        } else {
            data.forEach(( datum ) => {
                svg.append( "rect" )
                    .attr( "x", Math.round( xScale( datum[ 0 ]) + 0.5 ))
                    .attr( "y", Math.round( yScale( datum[ 1 ]) + 0.5 ))
                    .style( "fill", "none" )
                    .style( "stroke", "black" );
            });
        }
        svg.selectAll( "text" ).remove();
        svg.append( "text" );
    }
        
    // Draw the points.
    let t0 = Date.now();
    if( shape === "circle" ) {
        svg.selectAll( "circle" )
            .attr( "r", size / 2 )
            .style( "opacity", opacity )
    } else {
        svg.selectAll( "rect" )
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
};

export default PlotSVG;
