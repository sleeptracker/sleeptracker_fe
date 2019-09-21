import React from 'react';
import { makeStyles } from '@material-ui/core';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries} from 'react-vis';


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
            <VerticalBarSeries
                color="red"
                data={[
                {x: 1, y: 10},
                {x: 2, y: 5},
                {x: 3, y: 15}
                ]}/>
                {/* dummy data ^ */}
            <XAxis title="X" />
            <YAxis />
        </XYPlot>
    </div>

    )
}

export default Graph;