import React from 'react';
import { Slider } from '@material-ui/core';
import * as d3 from 'd3';
import PlotCanvas from './PlotCanvas';
import PlotSVG from './PlotSVG';
import './App.css';

// Application:  A grid of performance tests.
class App extends React.Component {
    
    // Constructor:  Creates reference and data.
    constructor( props ) {
        super( props );
        this.state = { size: 4, data: App.generateData( 1000 ), opacity: 0.4 };
    }
    
    // Render and return the App.
    render() {
        const { data, size, opacity } = this.state;
        return (
            <div className="Column">
                <div className="Grid">
                    <PlotCanvas shape={"circle"} size={size} data={data} opacity={opacity} />
                    <PlotCanvas shape={"square"} size={size} data={data} opacity={opacity} />
                    <PlotSVG    shape={"circle"} size={size} data={data} opacity={opacity} />
                    <PlotSVG    shape={"square"} size={size} data={data} opacity={opacity} />
                </div>
                <div className="GridControls">
                    <label>Size:</label>
                    <Slider defaultValue={ 4 } step={ 1 } min={ 0 } max={ 10 }
                        valueLabelDisplay="auto" onChangeCommitted={ this.setSize } marks />
                    <label>Points:</label>
                    <Slider defaultValue={ 9 } step={ 1 } min={ 0 } max={ 15 }
                        valueLabelDisplay="auto" onChangeCommitted={ this.setData } marks
                        valueLabelFormat={( value ) => App.getPower( value )} />
                    <label>Opacity:</label>
                    <Slider defaultValue={ 0.4 } step={ 0.01 } min={ 0 } max={ 1 }
                        valueLabelDisplay="auto" onChangeCommitted={ this.setOpacity } />
                </div>
            </div>
        );
    }
    
    // Generates random normal data.
    static generateData = ( newValue ) => {
        let data = [],
            f = d3.randomNormal( 0.5, 0.1 ),
            n = newValue;
        for( let i = 0; ( i < n ); i++ ) {
            data[ i ] = [ f(), f()];
        }
        return data;
    }
    
    // Returns "nice" power of specified value: 1, 2, 5, 10, etc.
    static getPower = ( value ) => {
        let m = (( value % 3 ) === 0 ) ? 1 : (( value % 3 ) === 1 ) ? 2 : 5;
        return m * ( 10 ** Math.floor( value / 3 ));
    }
    
    // Assigns size.
    setSize = ( event, newValue ) => {
        this.setState({ size: newValue });
    }
    
    // Assigns data.
    setData = ( event, newValue ) => {
        this.setState({ data: App.generateData( App.getPower( newValue ))});
    }
                                      
    // Assigns opacity.
    setOpacity = ( event, newValue ) => {
        this.setState({ opacity: newValue });
    }
}

export default App;
