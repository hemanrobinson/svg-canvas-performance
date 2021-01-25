import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import PlotCanvas from "./PlotCanvas";

let container = null;

// Sets up a DOM element as a render target.
beforeEach(() => {
    container = document.createElement( "div" );
    document.body.appendChild( container );
});

// Cleans up on exit.
afterEach(() => {
    unmountComponentAtNode( container );
    container.remove();
    container = null;
});

it( "creates a canvas element", () => { 
    act(() => {
        render( <canvas width="400" height="400" />, container );
    });
    expect( container.childNodes.length ).toBe( 1 );
    let canvas = container.firstChild;
    expect( canvas.nodeName ).toBe( "CANVAS" );
});

it( "draws the Plot", () => {
    let ref = { current: document.createElement( "canvas" )},
        xScale = d3.scaleLinear().domain([ 0, 1 ]).range([ 0, 100 ]),
        yScale = d3.scaleLinear().domain([ 0, 1 ]).range([ 0, 100 ]);
    PlotCanvas.draw( 400, 400, ref, xScale, yScale, "circle", [[ 0, 1 ]], 4, 1.0 );
    PlotCanvas.draw( 400, 400, ref, xScale, yScale, "square", [[ 0, 1 ]], 4, 1.0 );
});
