import React from 'react';
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
        width: '450px',
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
    return (
        <div className={classes.clockContainer}>
            <div className={classes.box}>
                <div onClick={() => props.handleTime('up', 'hour')}>
                    <KeyboardArrowUpIcon fontSize="large" />
                </div>
                <div className={classes.timeBox}>
                    <p value="upArrow">{props.hour}</p>
                </div>
                <div onClick={() => props.handleTime('down', 'hour')}>
                    <KeyboardArrowDownIcon fontSize="large" />
                </div>
            </div>
            <div className={classes.box}>
                <div onClick={() => props.handleTime('up', 'min')}>
                    <KeyboardArrowUpIcon fontSize="large" />
                </div>
                <div className={classes.timeBox}>
                    <p>{props.minute}</p>
                </div>
                <div onClick={() => props.handleTime('down', 'min')}>
                    <KeyboardArrowDownIcon fontSize="large" />
                </div>
            </div>
        </div>
    )
}
export default Clock;