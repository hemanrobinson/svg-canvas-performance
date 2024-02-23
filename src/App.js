import React, { useState } from 'react';
import { Slider, Select, MenuItem } from '@mui/material';
import * as d3 from 'd3';
import PlotCanvas from './PlotCanvas';
import PlotSVG from './PlotSVG';
import './App.css';
import github from './github.svg';

/**
 * A grid of performance tests.
 */
const App = () => {
    
    // Create state.
    const [ shape, setShape ] = useState( "square" );
    const [ size, setSize ] = useState( 4 );
    const [ data, setData ] = useState( App.getData( App.getPower( 9 )));
    const [ opacity, setOpacity ] = useState( 0.5 );
    
    // Return the App.
    return (
        <div className="Column">
            <div className="Description">
                <h1>SVG versus CANVAS Performance&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://github.com/hemanrobinson/svg-canvas-performance/"><img className="icon" title="Code Shared on GitHub" alt="Code Shared on GitHub" src={github}/></a></h1>
                <p>
                Scatter plots have been used to display up to 1,000,000 data points (for example, <a href="https://www.highcharts.com/demo/android/scatter-boost">here</a> and <a href="https://blog.scottlogic.com/2020/05/01/rendering-one-million-points-with-d3.html">here</a>).
                </p>
                <p>
                The SVG element cannot efficiently render such large data sets. This requires a CANVAS element. The performance difference becomes critical during user interactions such as <a href="https://hemanrobinson.github.io/fast-brushing/">brushing</a>.
                </p>
                <p>
                Use the sliders to adjust the point size, the number of points, their transparency, and their shape.
                </p>
            </div>
            <div className="GridPlots">
                <PlotSVG    size={size} data={data} opacity={opacity} shape={shape} />
                <PlotCanvas size={size} data={data} opacity={opacity} shape={shape} />
            </div>
            <div className="GridControls">
                <label>Size:</label>
                <Slider defaultValue={ 4 } step={ 1 } min={ 0 } max={ 10 }
                    valueLabelDisplay="auto" marks
                    onChangeCommitted={( event, value ) => setSize( value )} />
                <label>Points:</label>
                <Slider defaultValue={ 9 } step={ 1 } min={ 0 } max={ 15 }
                    valueLabelDisplay="auto" marks valueLabelFormat={( value ) => App.getPower( value )}
                    onChangeCommitted={( event, value ) => setData( App.getData( App.getPower( value )))} />
                <label>Transparency:</label>
                <Slider defaultValue={ 0.5 } step={ 0.01 } min={ 0 } max={ 1 }
                    valueLabelDisplay="auto"
                    onChangeCommitted={( event, value ) => setOpacity( 1 - value )} />
                <label>Shape:</label>
                <Select variant="standard" value={ shape } style={{minWidth: 200, backgroundColor: "#ffffff"}}
                    onChange={( event ) => { setShape( event.target.value )}}>
                    <MenuItem value="circle">Circle</MenuItem>
                    <MenuItem value="square">Square</MenuItem>
                    <MenuItem value="line">Line</MenuItem>
                </Select>
            </div>
            <div className="Description">
                <h2>User Interface</h2>
                <p>
                Traditionally, dense point clouds are displayed in contour plots. With suitably adjusted point size and transparency, scatter plots are superior because they show both the structure of the data and the individual points.
                </p>
                <h2>Implementation</h2>
                <p>
                This project uses <a href="https://react.dev">React</a>, <a href="https://github.com/mui-org/material-ui">Material-UI</a>, and <a href="https://github.com/d3/d3">d3</a>.
                </p>
                <p>
                This test does not measure creation time of SVG elements. Rendering time is all that matters during interactions.
                </p>
            </div>
        </div>
    );
}

/**
 * Generates bivariate random normal data.
 *
 * @param  {number}  n  number of values
 * @return {Array}  Array of x, y values between 0 and 1
 */
App.getData = ( n ) => {
    let data = [],
        f = d3.randomNormal( 0.5, 0.1 );
    for( let i = 0; ( i < n ); i++ ) {
        data[ i ] = [ f(), f()];
    }
    return data;
}

/**
 * Returns "nice" power of ten:  rounded to 1, 2, 5, 10, 20, 50, etc.
 *
 * @param  {number}  exp  exponent
 * @return {number}  "nice" power of ten:  rounded to 1, 2, 5, 10, 20, 50, etc.
 */
App.getPower = ( exp ) => {
    let m = (( exp % 3 ) === 0 ) ? 1 : (( exp % 3 ) === 1 ) ? 2 : 5;
    return m * ( 10 ** Math.floor( exp / 3 ));
}

export default App;
