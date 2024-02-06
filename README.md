# SVG versus CANVAS Performance

[This project demonstrates scatter plot drawing performance in SVG and CANVAS elements.](https://hemanrobinson.github.io/svg-canvas-performance/)

Scatter plots have been used to display up to 1,000,000 data points (for example, [here](https://www.highcharts.com/demo/android/scatter-boost) and [here](https://blog.scottlogic.com/2020/05/01/rendering-one-million-points-with-d3.html)).  

The SVG element cannot support such large data sets.  The performance difference between SVG and CANVAS becomes critical during user interactions such as brushing.

[![SVG versus CANVAS](src/svg-canvas-performance.png "SVG versus CANVAS Performance")](https://hemanrobinson.github.io/svg-canvas-performance/)

This project uses [React](https://react.dev), [Material-UI](https://github.com/mui-org/material-ui), and [d3](https://github.com/d3/d3).
