import React, { useState, useEffect } from 'react';
import Clock from './Clock';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';
import moment from 'moment';
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
        top: '55%'
    },
    formButtons: {
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
        width: '150px'
    },
    button: {
        margin: '10px 0'
    }
})

function Tracker(props) {
    const classes = useStyles();
    const [mnt, setMnt] = useState(moment());
    const [hour, setHour] = useState(mnt.hour());
    const [minute, setMinute] = useState(mnt.minute());
    const handleTime = (dir, time) => {
        if (dir === 'up') {
            time === 'hour' ? setHour(mnt.add(1, 'hour').hour()) : setMinute(mnt.add(1, 'minute').minute());
        } else if (dir === 'down') {
            time === 'hour' ? setHour(mnt.subtract(1, 'hour').hour()) : setMinute(mnt.subtract(1, 'minute').minute());
        }
    }

    const handleSubmitTime = () => {
        console.log(hour, minute)
    }

    const setCurrentTime = () => {
        setMnt(moment())
        setHour(moment().hour())
        setMinute(moment().minute())
    }
    

    useEffect(() => {
        axios.get(`https://sleeptrack.herokuapp.com/api/user/${props.user.userId}`)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
                // window.alert("Ann error occured!")
            })
    }, [])

    // useEffect(() => {
    //     axios.post('https://sleeptrack.herokuapp.com/api/sleepData')
    //         .then(res => {
    //             console.log(res)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //             // window.alert("Form unable to submit, please try again.")
    //         })
    // }, [handleSubmitTime])

    return (
        <div className={classes.container}>
            <div className={classes.clock}>
                <Clock handleTime={handleTime} hour={hour} minute={minute} />
                <div className={classes.formButtons}>
                    <button className={classes.button} onClick={handleSubmitTime} >Submit</button>
                    <button className={classes.button} onClick={setCurrentTime}>Current Time</button>
                </div>
            </div>
        </div>
    )
}
export default Tracker