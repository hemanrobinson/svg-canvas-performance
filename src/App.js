import React, { useState } from 'react';
import { Slider } from '@material-ui/core';
import * as d3 from 'd3';
import PlotCanvas from './PlotCanvas';
import PlotSVG from './PlotSVG';
import './App.css';

// Application:  A grid of performance tests.
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
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tempor tempor massa. Morbi congue mi augue, a vulputate augue molestie eget. Sed egestas eros elit, ut pretium tellus pretium ut. Donec volutpat leo et neque laoreet porttitor sit amet et quam. In hac habitasse platea dictumst. Etiam eu magna tortor. Cras vel dapibus ligula, ut rutrum nibh. Morbi blandit ac elit id volutpat. Nam ut tincidunt elit. Sed fermentum lacinia magna, eget commodo leo gravida in. Suspendisse sit amet nibh magna. Cras ullamcorper libero id fermentum tincidunt. Quisque hendrerit nisl purus, non fringilla tortor fermentum a. Phasellus eleifend felis at ante porttitor tempus. Pellentesque vulputate odio vel tortor elementum blandit.
            </p>
        </div>
    );
}
    
// Generates bivariate random normal data.
App.getData = ( newValue ) => {
    let data = [],
        f = d3.randomNormal( 0.5, 0.1 ),
        n = newValue;
    for( let i = 0; ( i < n ); i++ ) {
        data[ i ] = [ f(), f()];
    }
    return data;
}
    
// Returns "nice" power of ten:  rounded to 1, 2, 5, 10, 20, 50, etc.
App.getPower = ( exp ) => {
    let m = (( exp % 3 ) === 0 ) ? 1 : (( exp % 3 ) === 1 ) ? 2 : 5;
    return m * ( 10 ** Math.floor( exp / 3 ));
}

export default App;
