import React, {useState, useEffect } from 'react';
import Clock from './Tracker-Components/Clock';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        width: '80%',
        height: '1000px',
        margin: '0 auto'
    },
    clock: {
        position: 'absolute',
        top: '60%'
    }
})

function Tracker(props) {
    const classes = useStyles();
    const [hour, setHour] = useState(10);
    const [minute, setMinute] = useState(22);
    const [hemisphere, setHemisphere] = useState('pm');

    return (
        <div className={classes.container}>
            <div className={classes.clock}>
                <Clock hour={hour} minute={minute} hemisphere={hemisphere} />
            </div>
        </div>
    )
}

export default Tracker