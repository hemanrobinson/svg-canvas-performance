import React, { useRef, useEffect }  from 'react';
import * as d3 from 'd3';
import './PlotCanvas.css';

// Scatter plot in a Canvas element.
const PlotCanvas = ( props ) => {
    
    // Create reference and scales.
    const width = 400, height = 400;
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

// Draws the points and the time.
PlotCanvas.draw = ( width, height, ref, xScale, yScale, shape, data, size, opacity ) => {
    
    // Draw the points.  +0.5 minimizes anti-aliasing.
    let t0 = Date.now(),
        canvas = ref.current,
        g = canvas.getContext( "2d" ),
        oldAlpha;
    if( g ) {
        oldAlpha = g.globalAlpha;
        g.clearRect( 0, 0, width, height );
        g.lineWidth = 1;
        g.strokeStyle = "#000000";
        g.globalAlpha = opacity;
        g.beginPath();
        data.forEach( datum => {
            let x = Math.round( xScale( datum[ 0 ])) + 0.5,
                y = Math.round( yScale( datum[ 1 ])) + 0.5;
            if( shape === "circle" ) {
                g.moveTo( x + size / 2, y );
                g.arc( x, y, size / 2, 0, 2 * Math.PI, true );
            } else {
                g.strokeRect( x, y, size, size );
            }
        });
        g.stroke();
        g.globalAlpha = oldAlpha;
        let t1 = Date.now() - t0;
                         
        // Draw the time.
        g.fillStyle = "#000000";
        g.font = "16px sans-serif";
        g.fillText( "Canvas " + shape + "s: " + t1 + " msec", 10, height - 10 );
    }
}

export default PlotCanvas;
