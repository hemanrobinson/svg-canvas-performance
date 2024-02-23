import React, { useRef, useEffect }  from 'react';
import * as d3 from 'd3';
import './PlotCanvas.css';

/**
 * Scatter plot in a CANVAS element.
 *
 * @param  {Object}  props  properties
 * @return component
 */
const PlotCanvas = ( props ) => {
    
    // Create reference and scales.
    const width = 300, height = 300;
    let ref = useRef(),
        xScale = d3.scaleLinear().domain([ 0, 1 ]).range([ 0, width ]),
        yScale = d3.scaleLinear().domain([ 0, 1 ]).range([ height, 0 ]),
        { shape, data, size, opacity } = props;
    
    // Hook to draw on mounting, or on any other lifecycle update.
    useEffect(() => {
        PlotCanvas.draw( width, height, ref, xScale, yScale, shape, data, size, opacity );
    });
                         
    // Return the component.
    return <canvas width={width} height={height} ref={ref}></canvas>;
}

/**
 * Draws the points and the time.
 *
 * @param {number}     width    width, in pixels
 * @param {number}     height   height, in pixels
 * @param {Array}      ref      reference to SVG element
 * @param {d3.scale*}  xScale   X scale
 * @param {d3.scale*}  yScale   Y scale
 * @param {string}     shape    one of "circle", "square", "line"
 * @param {Array}      data     Array of x, y values between 0 and 1
 * @param {number}     size     size in pixels
 * @param {number}     opacity  alpha, between 0 and 1
 */
PlotCanvas.draw = ( width, height, ref, xScale, yScale, shape, data, size, opacity ) => {

    // Initialization.
    let t0 = Date.now(),
        canvas = ref.current,
        g = canvas.getContext( "2d" ),
        oldAlpha;
    
    // Draw the points.  +0.5 minimizes anti-aliasing.
    if( g ) {
        oldAlpha = g.globalAlpha;
        g.fillStyle = "#ffffff";
        g.fillRect( 0, 0, width, height );
        g.lineWidth = 1;
        g.strokeStyle = "#000000";
        g.globalAlpha = opacity;
        data.forEach( datum => {
            g.beginPath();
            let x = xScale( datum[ 0 ]),
                y = yScale( datum[ 1 ]);
            switch( shape ) {
                case "circle":
                    g.moveTo( x + size / 2, y );
                    g.arc( x, y, size / 2, 0, 2 * Math.PI, true );
                    break;
                case "square":
                    g.strokeRect( Math.round( x ) + 0.5, Math.round( y ) + 0.5, size, size );
                    break;
                default:
                    g.moveTo( Math.round( x + size / 2 ), Math.round( y - size / 2 ) + 0.5 );
                    g.lineTo( Math.round( x - size / 2 ), Math.round( y + size / 2 ) + 0.5 );
                    break;
            }
            g.stroke();
        });
        g.globalAlpha = oldAlpha;
        let t1 = Date.now() - t0;
                         
        // Draw the time.
        g.fillStyle = "#000000";
        g.font = "16px sans-serif";
        g.fillText( "CANVAS " + shape + "s: " + t1 + " msec", 10, height - 10 );
    }
}

export default PlotCanvas;
