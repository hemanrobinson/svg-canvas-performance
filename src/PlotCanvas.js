import React from 'react';
import * as d3 from 'd3';
import './PlotCanvas.css';

// Scatter plot in a Canvas element.
class PlotCanvas extends React.Component {
    
    // Constructor:  Creates reference and scales.
    constructor( props ) {
        super( props );
        this.canvas = React.createRef();
        this.xScale = d3.scaleLinear()
            .domain([ 0, 1 ])
            .range([ 0, this.props.width ]);
        this.yScale = d3.scaleLinear()
            .domain([ 0, 1 ])
            .range([ this.props.height, 0 ]);
    }
    
    // Draws on mounting.
    componentDidMount() {
        this.draw( this.props.data, this.props.opacity );
    }
    
    // Draws the scatter plot.
    draw( data, opacity )  {
        
        // Initialization.
        let canvas = this.canvas.current,
            g = canvas.getContext( "2d" ),
            t,
        
            // Draws one point.
            drawPoint = function( g, r, x, y ) {
                if( opacity < 1 ) {
                    g.beginPath();
                }
                g.moveTo( x + r + 0.5, y + 0.5 );
                g.arc( x + 0.5, y + 0.5, r, 0, 2 * Math.PI, true );
                if( opacity < 1 ) {
                    g.stroke();
                }
            };
        
        // Draw the points.
        let t0 = Date.now();
        g.clearRect( 0, 0, this.props.width, this.props.height );
        g.lineWidth = 1;
        g.strokeStyle = "#000000";
        if( opacity < 1 ) {
            t = g.globalAlpha;
            g.globalAlpha = this.props.opacity;
        } else {
            g.beginPath();
        }
        data.forEach( datum => { drawPoint( g, this.props.size, this.xScale( datum[ 0 ]), this.yScale( datum[ 1 ]))});
        if( opacity < 1 ) {
            g.globalAlpha = t;
        } else {
            g.stroke();
        }
        this.time = Date.now() - t0;
        console.log( "canvas: " + this.time );
    }
    
    render() { return <canvas ref={this.canvas} width={this.props.width} height={this.props.height}></canvas> }
}

export default PlotCanvas;
