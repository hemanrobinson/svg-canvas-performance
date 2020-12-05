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
        
        // Initialization.
        let canvas = this.canvas.current,
            g = canvas.getContext( "2d" ),
            t = g.globalAlpha;
        
        // Draw the points.
        let t0 = Date.now();
        g.clearRect( 0, 0, this.props.width, this.props.height );
        g.lineWidth = 1;
        g.strokeStyle = "#000000";
        g.globalAlpha = opacity;
        g.beginPath();
        if( this.props.shape === "circle" ) {
            data.forEach( datum => {
                let x = this.xScale( datum[ 0 ]),
                    y = this.yScale( datum[ 1 ]);
                g.moveTo( x + size / 2, y );
                g.arc( x, y, size / 2, 0, 2 * Math.PI, true );
            });
        } else {
            data.forEach( datum => {
                let x = this.xScale( datum[ 0 ]),
                    y = this.yScale( datum[ 1 ]);
                g.strokeRect( x, y, size, size );
            });
        }
        g.stroke();
        g.globalAlpha = t;
        this.time = Date.now() - t0;
        console.log( "canvas: " + this.props.shape + "  " + this.time );
    }
    
    render() { return <canvas ref={this.canvas} width={this.props.width} height={this.props.height}></canvas> }
}

export default PlotCanvas;
