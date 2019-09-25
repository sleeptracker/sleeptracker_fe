import React from 'react';
import { makeStyles } from '@material-ui/core';
import moment from 'moment';
import { Bar } from 'react-chartjs-2';

const useStyles = makeStyles({
    wrapper: {

    }
})


const Graph = (props) => {
    const classes = useStyles();

const chartData = {
    labels: props.data.map(cur => moment(cur.start, "YYYY-MM-D HH:mm:ss ZZ").format("MMM/DD/YYYY")),
    datasets: [
        {
        label: 'Hours of Sleep',
        data: props.data.map(cur => cur.hours),
        backgroundColor: 
            '#1A185B'
        }
    ]
    
}

    return (
        <div className={classes.wrapper} > 


        <Bar 
        data={chartData} 
        width={500}
        height={500}
        options={{
            title: {
                display: true,
                text: 'Hours of Sleep Over Time'
            },
            scales : {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            maintainAspectRatio: false
            
            
            }} />

    </div>

    )
}

export default Graph;