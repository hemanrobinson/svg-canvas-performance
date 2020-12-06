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
        this.state = {
            data: props.data,
            size: props.size,
            opacity: props.opacity
        }
    }
    
    // Draws on mounting.
    componentDidMount() {
        this.draw();
    }
    
    // Draws the scatter plot and the time.
    draw() {
        
        // Initialization.
        let { width, height, canvasRef, xScale, yScale } = this;
        let { shape } = this.props;
        let { data, size, opacity } = this.state;
        
        // Initialization.
        let canvas = canvasRef.current,
            g = canvas.getContext( "2d" ),
            t = g.globalAlpha;
        
        // Draw the points.
        let t0 = Date.now();
        g.clearRect( 0, 0, width, height );
        g.lineWidth = 1;
        g.strokeStyle = "#000000";
        g.globalAlpha = opacity;
        g.beginPath();
        if( shape === "circle" ) {
            data.forEach( datum => {
                let x = Math.round( xScale( datum[ 0 ])) + 0.5,
                    y = Math.round( yScale( datum[ 1 ])) + 0.5;
                g.moveTo( x + size / 2, y );
                g.arc( x, y, size / 2, 0, 2 * Math.PI, true );
            });
        } else {
            data.forEach( datum => {
                let x = Math.round( xScale( datum[ 0 ])) + 0.5,
                    y = Math.round( yScale( datum[ 1 ])) + 0.5;
                g.strokeRect( x, y, size, size );
            });
        }
        g.stroke();
        g.globalAlpha = t;
        let t1 = Date.now() - t0;
                         
        // Draw the time.
        g.fillStyle = "#000000";
        g.font = "16px sans-serif";
        g.fillText( "Canvas " + shape + "s: " + t1 + " msec", 10, height - 10 );
    }
    
    render() { return <canvas width={this.width} height={this.height} ref={this.canvasRef}></canvas> }
}

export default PlotCanvas;
