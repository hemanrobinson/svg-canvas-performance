# Scatter Plot Performance

Scatter plots have been used to display up to 1,000,000 data points (for example, [here](https://www.highcharts.com/demo/android/scatter-boost) and [here](https://blog.scottlogic.com/2020/05/01/rendering-one-million-points-with-d3.html)).  

The SVG element cannot support such large data sets.  The performance difference between SVG and CANVAS becomes critical during user interactions such as brushing.

[This project demonstrates scatter plot drawing performance in SVG and CANVAS elements.](https://hemanrobinson.github.io/svg-canvas/)

This project uses [d3](https://github.com/d3/d3) and [Material-UI](https://github.com/mui-org/material-ui), and was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
