import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles({
    timeBox: {
        width: '15%',
        height: '100px',
        color: '#F7FA78',
        backgroundColor: '#1A185B'
    }
})

function Clock(props) {
    const classes = useStyles();

    console.log(props);

    return(
        <div>
            <ExpandLessIcon fontSize="large" />
                <div className={classes.timeBox}>
                    <p>{props.hour}</p>
                </div>
            <ExpandMoreIcon fontSize="large" />

            <ExpandLessIcon fontSize="large" />
                <div className={classes.timeBox}>
                    <p>{props.minute}</p>
                </div>
            <ExpandMoreIcon fontSize="large" />
        </div>
    )
}

export default Clock;