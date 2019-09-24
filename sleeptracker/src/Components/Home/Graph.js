import React from 'react';
import { makeStyles } from '@material-ui/core';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries, VerticalGridLines, HorizontalBarSeries} from 'react-vis';


const useStyles = makeStyles({
    wrapper: {

    }
})


const Graph = (props) => {

    const classes = useStyles();
   const graphData = props.data.map(cur => {
       return {
           x: parseInt(cur.average_rating),
           y: cur.hours
       }
   })
   const compare = (a, b) => {
       const numA = a.y
       const numB = b.y

       let comparison = 0;

       if (numA > numB) {
           comparison = 1;
       } else if (numB > numA) {
           comparison = -1;
       }
       return comparison;
   }
   console.log(graphData.sort(compare))

    // started charting data... need to visualize it better, maybe pick different graph ?
    return (
        <div className={classes.wrapper} > 
        <XYPlot
            width={500}
            height={500}>
            <HorizontalGridLines />
            <VerticalGridLines />
            
            {/* <VerticalBarSeries
                color="red"
                data={[
                {x: 1, y: 10},
                {x: 2, y: 5},
                {x: 3, y: 15}
                ]}/> */}
            <HorizontalBarSeries data={graphData.sort(compare)} />
          {/* <HorizontalBarSeries data={[{y: 2, x: 12}, {y: 4, x: 2}, {y: 5, x: 11}]} /> */}
                {/* dummy data ^ */}
            <XAxis title="Average Rating" />
            <YAxis title=" Hours of Sleep"/>
        </XYPlot>
    </div>

    )
}

export default Graph;