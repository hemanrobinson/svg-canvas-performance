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
        
        // Create references.
        super( props );
        this.plotRef0 = React.createRef();
        this.plotRef1 = React.createRef();
        this.plotRef2 = React.createRef();
        this.plotRef3 = React.createRef();
    
        // Generate data.
        this.data = App.generateData( 1000 );
    }
    
    // Render and return the App.
    render() {
        return (
            <div className="Column">
                <div className="Grid">
                    <PlotCanvas data={this.data} size={4} shape={"circle"} opacity={0.4} ref={this.plotRef0}/>
                    <PlotCanvas data={this.data} size={4} shape={"square"} opacity={0.4} ref={this.plotRef1}/>
                    <PlotSVG    data={this.data} size={4} shape={"circle"} opacity={0.4} ref={this.plotRef2}/>
                    <PlotSVG    data={this.data} size={4} shape={"square"} opacity={0.4} ref={this.plotRef3}/>
                </div>
                <div className="GridControls">
                    <label>Size:</label>
                    <Slider defaultValue={ 4 } step={ 1 } min={ 0 } max={ 10 }
                        valueLabelDisplay="auto" onChangeCommitted={ this.setSize } marks />
                    <label>Points:</label>
                    <Slider defaultValue={ 3 } step={ 1 } min={ 0 } max={ 5 }
                        valueLabelDisplay="auto" onChangeCommitted={ this.setData } marks
                        valueLabelFormat={( value ) => ( 10 ** value )} />
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
    
    // Assigns state to all plots.
    static setPlotStates = ( that, state ) => {
        that.plotRef0.current.setState( state );
        that.plotRef1.current.setState( state );
        that.plotRef2.current.setState( state );
        that.plotRef3.current.setState( state );
    }
    
    // Assigns size.
    setSize = ( event, newValue ) => {
        App.setPlotStates( this, { size: newValue });
    }
    
    // Assigns opacity.
    setOpacity = ( event, newValue ) => {
        App.setPlotStates( this, { opacity: newValue });
    }
    
    // Assigns data.
    setData = ( event, newValue ) => {
        this.data = App.generateData( 10 ** newValue );
        App.setPlotStates( this, { data: this.data });
    }
}

export default App;
