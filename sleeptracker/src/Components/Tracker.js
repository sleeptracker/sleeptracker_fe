import React, {useState, useEffect } from 'react';
import Clock from './Tracker/Clock';
import { makeStyles } from '@material-ui/core';
import moment from 'moment';

const mnt = moment();

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

let isAmPm = moment.updateLocale('en', {
    meridiemParse : RegExp,
    isPM : Function
});

let meridian = '';

if (isAmPm === 'true') {
    meridian = 'am'
} else {
    meridian = 'pm'
}

function Tracker(props) {
    const classes = useStyles();
    const [hour, setHour] = useState(mnt.hour());
    const [minute, setMinute] = useState(mnt.minute());
    const [hemisphere, setHemisphere] = useState(meridian);

    useEffect(() => {

    })

    return (
        <div className={classes.container}>
            <div className={classes.clock}>
                <Clock hour={hour} minute={minute} hemisphere={hemisphere} />
            </div>
        </div>
    )
}

export default Tracker