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
    clockContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    clock: {
        position: 'absolute',
        top: '10%',
        width: '60%',
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
    const [rating, setRating] = useState(0);
    const [morningMnt, setMorningMnt] = useState(moment());
    const [morningHour, setMorningHour] = useState(morningMnt.hour());
    const [morningMinute, setMorningMinute] = useState(morningMnt.minute());
    const [nightMnt, setNightMnt] = useState(moment())
    const [nightHour, setNightHour] = useState(morningMnt.hour());
    const [nightMinute, setNightMinute] = useState(morningMnt.minute());
    const [average, setAverage] = useState();
   

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


    const handleRating = (rate) => {
        setRating(rate)
    }
    

    const handleSubmitTime = () => {
        let hours = morningMnt.diff(nightMnt, 'hours')

        if (rating === 0) {
            window.alert('Please choose a rating!')
        } else if (rating >= 1) {
            axios.post('https://sleeptrack.herokuapp.com/api/sleepData', {
                "userID":` ${props.user.userId}`,
                "start": `${morningMnt.format("YYYY-MM-DD HH:mm")}`,
                "end": `${nightMnt.format("YYYY-MM-DD HH:mm")}`,
                "hours":  hours,
                "bed_t_rating": "4",
                "work_t_rating": "4",
                "average_rating": `${rating}`
            }, {
                headers: {
                    "authorize": localStorage.getItem('token')
                }})
                .then(res => {
                    console.log(res)
                    window.alert("Your time has been submitted!")
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }



    const setCurrentTime = () => {
        setMorningMnt(moment())
        setMorningHour(moment().hour())
        setMorningMinute(moment().minute())
    }
    

    useEffect(() => {
        axios.get(`https://sleeptrack.herokuapp.com/api/user/${props.user.userId}`, {headers: {"authorize": localStorage.getItem('token')}})
            .then(res => {
                const sleepDataArray = res.data.sleepData;

                let allRatingsObj = sleepDataArray.filter(rating => {
                    return rating.average_rating == 4
                })

                let n = allRatingsObj.reduce((total, cur) => {
                    return total.hours + cur.hours
                }) / allRatingsObj.length
                
                window.alert(`You feel best when you get ${n} hours of sleep!`)

            })
            .catch(err => {
                console.log(err);
            })
    }, [])


    return (
        <div className={classes.container}>
            <div className={classes.clock}>
                <div className={classes.clockContainer}>
                    <Clock handleTime={handleTime} hour={nightHour} minute={nightMinute} day='night' which='What time did you fall asleep?' />
                    <Clock handleTime={handleTime} hour={morningHour} minute={morningMinute} day='morning' which='What time did you wake up?' />
                    <button className={classes.button} onClick={setCurrentTime} >Current Time</button>
                    <Rating handleRating={handleRating} rating={rating} description='How did you feel when you woke up?' />
                </div>
                <div className={classes.formButtons}>
                    <button className={classes.button} onClick={handleSubmitTime} >Submit</button>
                </div>
            </div>
        </div>
    )
}
export default Tracker