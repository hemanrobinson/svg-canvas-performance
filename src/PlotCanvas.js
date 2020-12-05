class PlotCanvas extends React.Component {
    
    var x = [],
        y = [],
        time = 0;
    
    var draw = function( x, y, size ) {

    };
    
    render() {
        return React.createElement( "canvas", { className: "PlotCanvas" });
    }
}

export default PlotCanvas;
export draw, time;
