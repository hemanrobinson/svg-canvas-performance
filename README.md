# Scatter Plot Performance

A simple performance test of scatter plot symbols.  

[Wegman](https://cos.gmu.edu/cds/faculty-profile-edward-wegman/) and others made scatter plots of up to [1,000,000 points](https://www.highcharts.com/demo/android/scatter-boost).  Adjusting the symbol size and the alpha channel ("Opacity") shows the structure of the data.  These plots are better than contour plots because they show the individual points.

Even in modern browsers, the SVG element cannot support such large data sets.  This type of plot requires a CANVAS element.  The performance difference becomes critical during user interactions such as brushing.

This project uses [d3](https://github.com/d3/d3) and [Material-UI](https://github.com/mui-org/material-ui), and was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
