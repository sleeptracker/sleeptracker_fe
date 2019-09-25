import React, { useState, useEffect } from 'react';
import Clock from './Clock';
import Rating from './Rating';
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
        top: '30%',
        margin: '0 auto'
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
    const [morningMnt, setMorningMnt] = useState(moment());
    const [morningHour, setMorningHour] = useState(morningMnt.hour());
    const [morningMinute, setMorningMinute] = useState(morningMnt.minute());
    const [nightMnt, setNightMnt] = useState(moment())
    const [nightHour, setNightHour] = useState(morningMnt.hour());
    const [nightMinute, setNightMinute] = useState(morningMnt.minute());
    const [sleepData, setSleepData] = useState({
        userID: props.user.userId,
        start: "",
        end: "",
        hours: "",
        bed_t_rating: "",
        work_t_rating: "",
        average_rating: ""
    });

    const handleTime = (dir, time, day) => {
        if (day === 'morning') {
            if (dir === 'up') {
                time === 'hour' ? setMorningHour(morningMnt.add(1, 'hour').hour()) : setMorningMinute(morningMnt.add(1, 'minute').minute());
            } else if (dir === 'down') {
                time === 'hour' ? setMorningHour(morningMnt.subtract(1, 'hour').hour()) : setMorningMinute(morningMnt.subtract(1, 'minute').minute());
            }
        } else if (day === 'night') {
            if (dir === 'up') {
                time === 'hour' ? setNightHour(nightMnt.add(1, 'hour').hour()) : setNightMinute(nightMnt.add(1, 'minute').minute());
            } else if (dir === 'down') {
                time === 'hour' ? setNightHour(nightMnt.subtract(1, 'hour').hour()) : setNightMinute(nightMnt.subtract(1, 'minute').minute());
            }
        }
    }

    const handleSubmitTime = () => {
        const currentMormingMnt = morningMnt.format("YYYY-MM-DD HH:mm")
        const currentNightMnt = nightMnt.format("YYYY-MM-DD HH:mm")

        setSleepData({
            "userID": 118,
            "start": currentMormingMnt,
            "end": currentNightMnt,
            "hours": 11,
            "bed_t_rating": "4",
            "work_t_rating": "4",
            "average_rating": "5"
        })

        console.log(currentMormingMnt)
        axios.post('https://sleeptrack.herokuapp.com/api/sleepData', sleepData, {
            headers: {
                "authorize": props.user.token
            }})
            .then(res => {
                console.log(res)
                
            })
            .catch(err => {
                console.log(err)
                // window.alert("Form unable to submit, please try again.")
            })
        
        window.alert("Your time has been submitted!")
    }

    const setCurrentTime = () => {
        setMorningMnt(moment())
        setMorningHour(moment().hour())
        setMorningMinute(moment().minute())
        setNightMnt(moment())
        setNightHour(moment().hour())
        setNightMinute(moment().minute())
    }
    

    useEffect(() => {
        axios.get(`https://sleeptrack.herokuapp.com/api/user/${props.user.userId}`, {headers: {"authorize": props.user.token}})
            .then(res => {
                const sleepDataArray = res.data.sleepData;
                console.log(sleepDataArray);
            })
            .catch(err => {
                console.log(err);
                // window.alert("Ann error occured!")
            })
    }, [])

    return (
        <div className={classes.container}>
            <div className={classes.clock}>
                <div>
                    <Clock handleTime={handleTime} hour={nightHour} minute={nightMinute} day='night' which='Night' />
                    <Clock handleTime={handleTime} hour={morningHour} minute={morningMinute} day='morning' which='Morning' />
                </div>
                <div>
                    <Rating />
                </div>
                <div className={classes.formButtons}>
                    <button className={classes.button} onClick={handleSubmitTime} >Submit</button>
                    <button className={classes.button} onClick={setCurrentTime}>Current Time</button>
                </div>
            </div>
        </div>
    )
}
export default Tracker