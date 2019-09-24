import React from 'react';
import { makeStyles } from '@material-ui/core';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries, VerticalGridLines, HorizontalBarSeries} from 'react-vis';


const useStyles = makeStyles({
    wrapper: {

    }
})


const Graph = (props) => {

    const classes = useStyles();

    return (
        <div className={classes.wrapper} > 
        <XYPlot
            width={300}
            height={300}>
            <HorizontalGridLines />
            <VerticalGridLines />
            {/* <VerticalBarSeries
                color="red"
                data={[
                {x: 1, y: 10},
                {x: 2, y: 5},
                {x: 3, y: 15}
                ]}/> */}
            <HorizontalBarSeries data={[{y: 1, x: 1}, {y: 2, x: 2}, {y: 5, x: 4}]} />
          {/* <HorizontalBarSeries data={[{y: 2, x: 12}, {y: 4, x: 2}, {y: 5, x: 11}]} /> */}
                {/* dummy data ^ */}
            <XAxis title="Average Rating" />
            <YAxis title="Hours of Sleep"/>
        </XYPlot>
    </div>

    )
}

export default Graph;