import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/ExpandLess';
import KeyboardArrowDownIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles({
    timeBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '200px',
        height: '100px',
        color: '#F7FA78',
        backgroundColor: '#1A185B',
        fontSize: '30px'
    },
    clockContainer: {
        width: '500px',
        height: '300px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
        }
})

function Clock(props) {
    const classes = useStyles();

    console.log(props);

    return(
        <div className={classes.clockContainer}>
            <KeyboardArrowUpIcon fontSize="large" />
                <div className={classes.timeBox}>
                    <p>{props.hour}</p>
                </div>
            <KeyboardArrowDownIcon fontSize="large" />

            <KeyboardArrowUpIcon fontSize="large" />
                <div className={classes.timeBox}>
                    <p>{props.minute}</p>
                </div>
            <KeyboardArrowDownIcon fontSize="large" />
        </div>
    )
}

export default Clock;