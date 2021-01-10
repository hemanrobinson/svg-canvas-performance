# Scatter Plot Performance

This project is a simple performance test of scatter plot symbols in the SVG and CANVAS elements.  

Scatter plots have been used to display up to 1,000,000 data points (for example, [here](https://www.highcharts.com/demo/android/scatter-boost) and [here](https://blog.scottlogic.com/2020/05/01/rendering-one-million-points-with-d3.html).  WIth suitably adjusted point size and opacity, these plots are superior to contour plots because they show both the structure of the data and the individual points. 

Even in modern browsers, the SVG element cannot support such large data sets.  This type of plot requires a CANVAS element.  The performance difference becomes critical during user interactions such as brushing.

This project uses [d3](https://github.com/d3/d3) and [Material-UI](https://github.com/mui-org/material-ui), and was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
