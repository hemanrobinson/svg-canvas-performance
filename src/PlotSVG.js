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
 * Most recent shape, to optimize creation of SVG elements.
 */
PlotSVG.shape = "square";

/**
 * Draws the points and the time.
 *
 * @param {number}     height   height in pixels
 * @param {Array}      ref      reference to SVG element
 * @param {d3.scale*}  xScale   X scale
 * @param {d3.scale*}  yScale   Y scale
 * @param {string}     shape    one of "circle", "square", "line"
 * @param {Array}      data     Array of x, y values between 0 and 1
 * @param {number}     size     size in pixels
 * @param {number}     opacity  alpha, between 0 and 1
 */
PlotSVG.draw = ( height, ref, xScale, yScale, shape, data, size, opacity ) => {
    
    // If the data changed, re-create the SVG elements.  +0.5 minimizes anti-aliasing.
    const svg = d3.select( ref.current );
    let allShapes = svg.selectAll(( PlotSVG.shape === "square" ) ? "rect" : PlotSVG.shape );
    if(( allShapes.size() !== data.length ) || ( PlotSVG.shape !== shape )) {
        allShapes.remove();
        switch( shape ) {
            case "circle":
                data.forEach(( datum ) => {
                    svg.append( "circle" )
                        .attr( "cx", Math.round( xScale( datum[ 0 ])) + 0.5 )
                        .attr( "cy", Math.round( yScale( datum[ 1 ])) + 0.5 )
                        .style( "fill", "none" )
                        .style( "stroke", "black" );
                });
                break;
            case "square":
                data.forEach(( datum ) => {
                    svg.append( "rect" )
                        .attr( "x", Math.round( xScale( datum[ 0 ])) + 0.5 )
                        .attr( "y", Math.round( yScale( datum[ 1 ])) + 0.5 )
                        .style( "fill", "none" )
                        .style( "stroke", "black" );
                });
                break;
            default:
                data.forEach(( datum ) => {
                    svg.append( "line" )
                        .datum( datum )
                        .style( "fill", "none" )
                        .style( "stroke", "black" );
                });
                break;
        }
        svg.selectAll( "text" ).remove();
        svg.append( "text" );
        PlotSVG.shape = shape;
    }
        
    // Draw the points.
    let t0 = Date.now();
    switch( shape ) {
        case "circle":
            svg.selectAll( "circle" )
                .attr( "r", size / 2 )
                .style( "opacity", opacity );
            break;
        case "square":
            svg.selectAll( "rect" )
                .attr( "width", size )
                .attr( "height", size )
                .style( "opacity", opacity );
            break;
        default:
            svg.selectAll( "line" )
                .attr( "x1", ( datum ) => { return( Math.round( xScale( datum[ 0 ]) + size / 2 ) + 0.5 ); })
                .attr( "y1", ( datum ) => { return( Math.round( yScale( datum[ 1 ]) - size / 2 ) - 0.5 ); })
                .attr( "x2", ( datum ) => { return( Math.round( xScale( datum[ 0 ]) - size / 2 ) - 0.5 ); })
                .attr( "y2", ( datum ) => { return( Math.round( yScale( datum[ 1 ]) + size / 2 ) + 0.5 ); })
                .style( "opacity", opacity );
            break;
    }
    let t1 = Date.now() - t0;
                  
    // Draw the time.
    svg.select( "text" )
        .attr( "x", 10 )
        .attr( "y", height - 10 )
        .text( "SVG " + shape + "s: " + t1 + "  msec" );
};

export default PlotSVG;
