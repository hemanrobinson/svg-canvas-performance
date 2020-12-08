import React from 'react';
import * as d3 from 'd3';
import './PlotCanvas.css';

// Scatter plot in a Canvas element.
class PlotCanvas extends React.Component {
    
    // Constructor:  Creates reference and scales.
    constructor( props ) {
        super( props );
        this.width = 400;
        this.height = 400;
        this.canvasRef = React.createRef();
        this.xScale = d3.scaleLinear().domain([ 0, 1 ]).range([ 0, this.width ]);
        this.yScale = d3.scaleLinear().domain([ 0, 1 ]).range([ this.height, 0 ]);
    }
    
    // Draws on mounting.
    componentDidMount() {
        PlotCanvas.draw( this );
    }
                         
    // Render and return the component.
    render() {
        PlotCanvas.draw( this );
        return <canvas width={this.width} height={this.height} ref={this.canvasRef}></canvas>
    }
    
    // Draws the scatter plot and the time.
    static draw( that ) {
        
        // Initialization.
        let { width, height, canvasRef, xScale, yScale } = that,
            { data, size, shape, opacity } = that.props;
        
        // If the canvas has been created, draw the plot.
        let canvas = canvasRef.current;
        if( canvas ) {
        
            // Draw the points.  +0.5 minimizes anti-aliasing.
            let t0 = Date.now(),
                g = canvas.getContext( "2d" ),
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
}

export default PlotCanvas;
