import React from 'react';

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
    return (
        <div className={classes.wrapper} > 
            <div className={classes.graph} >
            <Graph />
            </div>

            <div>

            </div>
        </div>
    )
}

export default HomePage;