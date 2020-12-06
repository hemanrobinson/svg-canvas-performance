import React from 'react';
import * as d3 from 'd3';
import PlotCanvas from './PlotCanvas';
import PlotSVG from './PlotSVG';
import './App.css';

// Application:  A grid of performance tests.
class App extends React.Component {
    
    // Constructor:  Creates reference and data.
    constructor( props ) {
        
        // Create references.
        super( props );
        this.plotRef0 = React.createRef();
        this.plotRef1 = React.createRef();
        this.plotRef2 = React.createRef();
        this.plotRef3 = React.createRef();
    
        // Generate random normal data.
        let data = [],
            f = d3.randomNormal( 0.5, 0.1 ),
            n = 20000;
        for( let i = 0; ( i < n ); i++ ) {
            data[ i ] = [ f(), f()];
        }
        this.data = data;
    }
    
    // Redraws all plots.
    redraw = () => {
        this.plotRef0.current.draw();
        this.plotRef1.current.draw();
        this.plotRef2.current.draw();
        this.plotRef3.current.draw();
    }
    
    // Return the App.
    render() {
        return (
            <div className="Column">
                <div className="Grid">
                    <PlotCanvas data={this.data} size={4} shape={"circle"} opacity={0.4} ref={this.plotRef2}/>
                    <PlotCanvas data={this.data} size={4} shape={"square"} opacity={0.4} ref={this.plotRef3}/>
                    <PlotSVG    data={this.data} size={4} shape={"circle"} opacity={0.4} ref={this.plotRef0}/>
                    <PlotSVG    data={this.data} size={4} shape={"square"} opacity={0.4} ref={this.plotRef1}/>
                </div>
                <div>
                    <label>{this.data.length} Points</label>
                </div>
                <div>
                    <button onClick={this.redraw}>Redraw</button>
                </div>
            </div>
        );
    }
}

export default App;
