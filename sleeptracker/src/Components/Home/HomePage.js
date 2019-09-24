import React, { useState, useEffect }  from 'react';
import axios from 'axios';

import Graph from './Graph';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '100px',
        justifyContent: 'center',

    },
    graph: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '2px solid black',
        width: '100%',

    }
})


const HomePage = (props) => {
    const classes = useStyles();
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        if(props.user.userId) {
            axios.get(`https://sleeptrack.herokuapp.com/api/user/${props.user.userId}`, {
                headers: {
                    "authorize": props.user.token
                }
            })
            .then(res => {
                setUserData(res.data.sleepData)
            })
            .catch(err => console.log(err))
        }
    }, [props.user.userId])
    return (
        <div className={classes.wrapper} > 
            <div className={classes.graph} >
            <Graph data={userData} />
            </div>

            <div>

            </div>
        </div>
    )
}

export default HomePage;