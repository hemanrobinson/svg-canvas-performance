import React from 'react';
import * as d3 from 'd3';
import PlotCanvas from './PlotCanvas';
import PlotSVG from './PlotSVG';
import './App.css';

// Application:  A grid of performance tests.
function App() {
    
    // Generate random normal data.
    const data = [],
        f = d3.randomNormal( 0.5, 0.1 ),
        n = 10000;
    for( let i = 0; ( i < n ); i++ ) {
        data[ i ] = [ f(), f()];
    }
    
    // Return the App.
    return (
        <div className="App">
            <PlotSVG    width={400} height={400} data={data} size={4} opacity={0.5} shape={"circle"}/>
            <PlotCanvas width={400} height={400} data={data} size={4} opacity={0.5} shape={"circle"}/>
            <PlotSVG    width={400} height={400} data={data} size={4} opacity={0.5} shape={"square"}/>
            <PlotCanvas width={400} height={400} data={data} size={4} opacity={0.5} shape={"square"}/>
        </div>
    );
}

export default App;
