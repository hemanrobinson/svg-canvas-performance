import React from 'react';
import * as d3 from 'd3';
import PlotD3 from './PlotD3';
import './App.css';

// Application:  A grid of performance tests.
function App() {
    const data = [], n = 10000, f = d3.randomNormal( 0.5, 0.1 );
    for( let i = 0; ( i < n ); i++ ) {
        data[ i ] = [ f(), f()];
    }
    return (
        <div className="App">
            <PlotD3 width={400} height={400} data={data} size={2} opacity={0.5}/>
        </div>
    );
}

export default App;
