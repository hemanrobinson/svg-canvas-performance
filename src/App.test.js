import { act, render, screen } from '@testing-library/react';
import ReactDOM from 'react-dom';
import App from './App';

let container;

beforeEach(() => {
    container = document.createElement( "div" );
    document.body.appendChild( container );
});

afterEach(() => {
    document.body.removeChild( container );
    container = null;
});

it( "renders App with childnodes", () => {
    
    // Test first render and componentDidMount
    act(() => {
        ReactDOM.render(<App />, container );
    });
    
    // Test structure.
    const div = container.querySelector( "div" );
    expect( div.className ).toBe( "Column" );
    expect( div.childNodes.length ).toBe( 4 );
    expect( div.childNodes[ 0 ].className ).toBe( "Description" );
    expect( div.childNodes[ 1 ].className ).toBe( "GridPlots" );
    expect( div.childNodes[ 2 ].className ).toBe( "GridControls" );
    expect( div.childNodes[ 3 ].className ).toBe( "Description" );
    
    let controls = div.childNodes[ 2 ];
    expect( controls.childNodes.length ).toBe( 8 );
    for( let i = 0; ( i < 3 ); i++ ) {
        let label = controls.childNodes[ 2 * i ];
        expect( label.nodeName ).toBe( "LABEL" );
        let slider = controls.childNodes[ 2 * i + 1 ];
        expect( slider.className ).toMatch( /Slider/ ); 
    }
});

it( "generates bivariate random normal data", () => {
    expect( App.getData(  0 ).length ).toBe(  0 );
    expect( App.getData(  1 ).length ).toBe(  1 );
    expect( App.getData(  2 ).length ).toBe(  2 );
    expect( App.getData(  5 ).length ).toBe(  5 );
    expect( App.getData( 10 ).length ).toBe( 10 );
});

it( "returns 'nice' power of ten", () => {
    expect( App.getPower(  0 )).toBe(    1 );
    expect( App.getPower(  1 )).toBe(    2 );
    expect( App.getPower(  2 )).toBe(    5 );
    expect( App.getPower(  5 )).toBe(   50 );
    expect( App.getPower( 10 )).toBe( 2000 );
});
