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
        this.data = this.generateData( 1000 );
    }
    
    // Redraws all plots.
    redraw = () => {
        this.plotRef0.current.draw();
        this.plotRef1.current.draw();
        this.plotRef2.current.draw();
        this.plotRef3.current.draw();
    }
    
    // Assigns size.
    setSize = ( event, newValue ) => {
        this.plotRef0.current.setState({ size: newValue });
        this.plotRef1.current.setState({ size: newValue });
        this.plotRef2.current.setState({ size: newValue });
        this.plotRef3.current.setState({ size: newValue });
        this.redraw();
    }
    
    // Assigns opacity.
    setOpacity = ( event, newValue ) => {
        this.plotRef0.current.setState({ opacity: newValue });
        this.plotRef1.current.setState({ opacity: newValue });
        this.plotRef2.current.setState({ opacity: newValue });
        this.plotRef3.current.setState({ opacity: newValue });
        this.redraw();
    }
    
    // Generates random normal data.
    generateData = ( newValue ) => {
        let data = [],
            f = d3.randomNormal( 0.5, 0.1 ),
            n = newValue;
        for( let i = 0; ( i < n ); i++ ) {
            data[ i ] = [ f(), f()];
        }
        return data;
    }
    
    // Assigns data.
    setData = ( event, newValue ) => {
        let newData = this.generateData( 10 ** newValue );
        this.plotRef0.current.setState({ data: newData });
        this.plotRef1.current.setState({ data: newData });
        this.plotRef2.current.setState({ data: newData });
        this.plotRef3.current.setState({ data: newData });
        this.redraw();
    }
    
    // Return the App.
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
                    <Slider
                        defaultValue={ 4 }
                        step={ 1 }
                        min={ 0 }
                        max={ 10 }
                        valueLabelDisplay="auto"
                        marks
                        onChangeCommitted={ this.setSize }
                    />
                    <label>Opacity:</label>
                    <Slider
                        defaultValue={ 0.4 }
                        step={ 0.01 }
                        min={ 0 }
                        max={ 1 }
                        valueLabelDisplay="auto"
                        onChangeCommitted={ this.setOpacity }
                    />
                    <label>Points:</label>
                    <Slider
                        defaultValue={ 3 }
                        step={ 1 }
                        min={ 0 }
                        max={ 5 }
                        valueLabelFormat={( value ) => ( 10 ** value )}
                        valueLabelDisplay="auto"
                        onChangeCommitted={ this.setData }
                    />
                </div>
            </div>
        );
    }
}

export default App;
