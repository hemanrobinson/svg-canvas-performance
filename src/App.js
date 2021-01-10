import React, { useState } from 'react';
import { Slider } from '@material-ui/core';
import * as d3 from 'd3';
import PlotCanvas from './PlotCanvas';
import PlotSVG from './PlotSVG';
import './App.css';

/**
 * A grid of performance tests.
 */
const App = () => {
    
    // Create state.
    const [ size, setSize ] = useState( 4 );
    const [ data, setData ] = useState( App.getData( App.getPower( 9 )));
    const [ opacity, setOpacity ] = useState( 0.4 );
    
    // Return the App.
    return (
        <div className="Column">
            <div className="GridPlots">
                <PlotSVG    shape={"circle"} size={size} data={data} opacity={opacity} />
                <PlotCanvas shape={"circle"} size={size} data={data} opacity={opacity} />
                <PlotSVG    shape={"square"} size={size} data={data} opacity={opacity} />
                <PlotCanvas shape={"square"} size={size} data={data} opacity={opacity} />
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
                <label>Opacity:</label>
                <Slider defaultValue={ 0.4 } step={ 0.01 } min={ 0 } max={ 1 }
                    valueLabelDisplay="auto"
                    onChangeCommitted={( event, value ) => setOpacity( value )} />
            </div>
            <div className="Description">
                <p>
                Scatter plots have been used to display up to 1,000,000 data points (for example, <a href="https://www.highcharts.com/demo/android/scatter-boost">here</a> and <a href="https://blog.scottlogic.com/2020/05/01/rendering-one-million-points-with-d3.html">here</a>.  With suitably adjusted point size and opacity, these plots are superior to contour plots because they show both the structure of the data and the individual points.
                </p>
                <p>
                Even in modern browsers, the SVG element cannot support such large data sets.  This type of plot requires a CANVAS element.  The performance difference becomes critical during user interactions such as brushing.
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
