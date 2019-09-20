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
        color: '#00ff00',
        backgroundColor: 'black',
        fontSize: '30px',
        boxShadow: '5px 5px 10px gray'
    },
    clockContainer: {
        width: '650px',
        height: '300px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    box: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
})

function Clock(props) {
    const classes = useStyles();

    console.log(props);

    return(
        <div className={classes.clockContainer}>
            <div className={classes.box}>
                <KeyboardArrowUpIcon fontSize="large" />
                    <div className={classes.timeBox}>
                        <p>{props.hour}</p>
                    </div>
                <KeyboardArrowDownIcon fontSize="large" />
            </div>

            <div className={classes.box}>
                <KeyboardArrowUpIcon fontSize="large" />
                    <div className={classes.timeBox}>
                        <p>{props.minute}</p>
                    </div>
                <KeyboardArrowDownIcon fontSize="large" />
            </div>

            <div className={classes.box}>
                <KeyboardArrowUpIcon fontSize="large" />
                    <div className={classes.timeBox}>
                        <p>{props.hemisphere}</p>
                    </div>
                <KeyboardArrowDownIcon fontSize="large" />
            </div>
        </div>
    )
}

export default Clock;