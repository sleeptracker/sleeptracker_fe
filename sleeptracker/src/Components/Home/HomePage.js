import React, { useState, useEffect }  from 'react';
import axios from 'axios';

import Graph from './Graph';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import moment from 'moment';


const useStyles = makeStyles({
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '100px',
        justifyContent: 'center',
        flexFlow: 'column wrap',

    },
    graph: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '2px solid black',
        width: '100%',

    },
    cards: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-around',
    },
    card: {
        width: 345,
        margin: '20px',
    },
    delete: {
        color: 'red'
    },
    buttons: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bodyCard: {
        textAlign: 'left',
        display: 'flex',
        flexFlow: 'column warp',
        alignItems: 'center',
        justifyContent: 'center',
    }

})


const HomePage = (props) => {
    const classes = useStyles();
    const [graphData, setGraphData] = useState([]);
    useEffect(() => {
        if(props.user.userId) {
            axios.get(`https://sleeptrack.herokuapp.com/api/user/${props.user.userId}`, {
                headers: {
                    "authorize": props.user.token
                }
            })
            .then(res => {
                setGraphData(res.data.sleepData);
            })
            .catch(err => console.log(err))
        }
    }, [props.user.userId])

    return (
        <div className={classes.wrapper} > 
            <div className={classes.graph} >
            <Graph data={graphData} />
            </div>

            <div className={classes.cards}>
            {graphData.map((cur) => {
                return (
                    <Card key={cur.id} className={classes.card}>
                        <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {moment(cur.start, "YYYY-MM-D HH:mm:ss ZZ").format('MMM/DD/YYYY')}
                            </Typography>
                            <Typography variant="body1"  component="p" className={classes.bodyCard}>
                                Average Rating: {cur.average_rating} <br />
                                End Time: {moment(cur.end, "YYYY-MM-D HH:mm:ss ZZ").format('MMM/DD/YYYY H:mm')} <br />
                                Hours of Sleep: {cur.hours}
                            </Typography>
                        </CardContent>
                        </CardActionArea>
                        <CardActions className={classes.buttons}>
                        <Button size="small" color="primary">
                            Edit
                        </Button>
                        <Button size="small" className={classes.delete}>
                            Delete
                        </Button>
                        </CardActions>
                  </Card>
                )
            })}
            </div>
        </div>
    )
}

export default HomePage;