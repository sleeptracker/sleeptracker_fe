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
        color: '#F7FA78',
        backgroundColor: '#1A185B',
        fontSize: '30px',
        boxShadow: '5px 5px 10px gray'
    },
    mainContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    clockContainer: {
        width: '450px',
        height: '200px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    box: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        borderBottom: '4px solid gray',
        marginRight: '25px',
        paddingRight: '15px',
        width: '100%',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif'
    }
})
function Clock(props) {
    const classes = useStyles();
    return (
        <div className={classes.center}>
            <div className={classes.mainContainer}>
                <h2 className={classes.header}>{props.which}</h2>
                <div className={classes.clockContainer}>

                    <div className={classes.box}>
                        <div onClick={() => props.handleTime('up', 'hour', props.day)}>
                            <KeyboardArrowUpIcon fontSize="large" />
                        </div>
                        <div className={classes.timeBox}>
                            <p value="upArrow">{props.hour}</p>
                        </div>
                        <div onClick={() => props.handleTime('down', 'hour', props.day)}>
                            <KeyboardArrowDownIcon fontSize="large" />
                        </div>
                    </div>

                    <div className={classes.box}>
                        <div onClick={() => props.handleTime('up', 'min', props.day)}>
                            <KeyboardArrowUpIcon fontSize="large" />
                        </div>
                        <div className={classes.timeBox}>
                            <p>{props.minute}</p>
                        </div>
                        <div onClick={() => props.handleTime('down', 'min', props.day)}>
                            <KeyboardArrowDownIcon fontSize="large" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Clock;