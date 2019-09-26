import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    emoji: {
        margin: '15px',
        width: '50px',
        height: '50px'
    },
    ratingBox: {
        padding: '12px 18px',
        border: '2px solid black',
        borderRadius: '4px'
    }
})

function Rating(props) {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <img className={classes.emoji} src={require('./Images/sad.png')} alt="Sad Emoji (Rating 1)" onClick={() => props.handleRating(1)} />
            <img className={classes.emoji} src={require('./Images/neutral.png')} alt="Nutral Emoji (Rating 2)" onClick={() => props.handleRating(2)} />
            <img className={classes.emoji} src={require('./Images/happy.png')} alt="Happy Emoji (Rating 3)" onClick={() => props.handleRating(3)} />
            <img className={classes.emoji} src={require('./Images/very_happy.png')} alt="Very Happy Emoji (Rating 4)" onClick={() => props.handleRating(4)} />
            <div className={classes.ratingBox} >{props.rating}</div>
        </div>
    )
}

export default Rating