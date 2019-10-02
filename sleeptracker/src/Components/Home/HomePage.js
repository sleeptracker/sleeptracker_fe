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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

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
    },
    edit: {
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
        justifyContent: 'center'
    },
    field: {
        marginBottom: '20px',

    }

})


const HomePage = (props) => {
    const classes = useStyles();
    const [graphData, setGraphData] = useState([]);
    const [itemId, setId] = useState()
    const [deleted, setDeleted] = useState(false)

    const [editOpen, setEditOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false);

    const [form, setForm] = useState({
        userID: props.user.userId,
        start: "",
        end: "",
        hours: "",
        bed_t_rating: "4",
        work_t_rating: "4",
        average_rating: "1"

    })

    const [start, setStart] = useState();
    const [end, setEnd] = useState();

    
    const handleChange = (e) => {
        if (start && end) {
        let startTime = start.split(" ")   
        let endTime= end.split(" ");
        
        if (e.target.name != 'start' && e.target.name != 'end' && e.target.name != 'hours'){
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        } else if (e.target.name === 'start') {
            setForm({
                ...form,
                start: `${startTime[0]} ${e.target.value}`
            })
        } else if (e.target.name === 'end') {
            setForm({
                ...form,
                end: `${endTime[0]} ${e.target.value}`
            })
        } else {
            setForm({
                ...form,
                hours: parseInt(e.target.value)
            })
        }
        }
    }

    const handleClickOpen = (id) => {
      setDeleteOpen(true);
      setId(id)
    };
  
    const handleClose = (type) => {
      if (type === 'edit') {
         setEditOpen(false) 
         setForm({
            id: itemId,
            userID: props.user.userId,
            start: "",
            end: "",
            hours: "",
            bed_t_rating: "4",
            work_t_rating: "4",
            average_rating: ""
            
        }) 
        setId("");
         } else {
            setDeleteOpen(false)
         }
    };

    const deleteItem = (id) => {
        axios.delete(`https://sleeptrack.herokuapp.com/api/sleepData/${id}`, {
            headers: {
                "authorize": localStorage.getItem('token')
            }
        })
        .then(res => {
            console.log(res)
            setDeleted(!deleted)
            setId("")
            handleClose();
        })
        .catch(err => console.log(err))
    }
    const handleEdit = (item) => {
        setStart(item.start)
        setEnd(item.end)
        setId(item.id)
        setEditOpen(true);
    }
    const handleSubmit = (id) => {
        if (id) {
        setForm({
            ...form,
            id: id
        })
        console.log(form)
            axios.put(`https://sleeptrack.herokuapp.com/api/sleepData/${id}`, form, {
                headers: {
                    "authorize": localStorage.getItem('token')
                }
            })
            .then(res => {
                console.log(res)
                setDeleted(!deleted)
                handleClose('edit')
            })
            .catch(err => console.log(err))



        } else {
            console.log('no id')
        }
        
        // axios.put(`https://sleeptrack.herokuapp.com/api/sleepData/${id}`, {
        //     headers: {
        //         "authorize": props.user.token
        //     }
        // })
        // .then(res => console.log(res))
        // .catch(err => console.log(err))
    }
    useEffect(() => {
        if(props.user.userId) {
            axios.get(`https://sleeptrack.herokuapp.com/api/user/${props.user.userId}`, {
                headers: {
                    "authorize": localStorage.getItem('token')
                }
            })
            .then(res => {
                setGraphData(res.data.sleepData);
            })
            .catch(err => console.log(err))
        }
    }, [props.user.userId, deleted])

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
                                Rating: {cur.average_rating} <br />
                                End Time: {moment(cur.end, "YYYY-MM-D HH:mm:ss ZZ").format('MMM/DD/YYYY H:mm')} <br />
                                Hours of Sleep: {cur.hours}
                            </Typography>
                        </CardContent>
                        </CardActionArea>
                        <CardActions className={classes.buttons}>
                        <Button size="small" color="primary"  onClick={() => handleEdit(cur)}>
                            Edit
                        </Button>
                        <Button size="small" className={classes.delete} onClick={() => handleClickOpen(cur.id)}>
                            Delete
                        </Button>
                        </CardActions>
                  </Card>

                )
            })}
                <Dialog
                    open={deleteOpen}
                    onClose={() => handleClose('delete')}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Delete selected item?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to Delete? 
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleClose('delete')} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => deleteItem(itemId)} className={classes.delete} autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={editOpen} onClose={() => handleClose('edit')} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Edit</DialogTitle>
                    <DialogContent className={classes.edit}>
                    <Typography variant="h6" component="h3">Rating</Typography>
                    <TextField
                        id="average_rating"
                        select
                        name="average_rating"
                        className={classes.textField}
                        // value={values}
                        onChange={handleChange}
                        SelectProps={{
                        native: true,
                        }}
                        // margin="normal"
                        >
                        {[1, 2, 3, 4].map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                        ))}
                    </TextField>
                     <Typography variant="h6" component="h3">Start Time</Typography>
                    <TextField
                        id="start"
                        name="start"
                        type="time"
                        onChange={handleChange}
                        className={classes.field}
                    />
                     <Typography variant="h6" component="h3">End Time</Typography>
                    <TextField
                        id="end"
                        name="end"
                        type="time"
                        onChange={handleChange}
                        className={classes.field}
                    />
                     <Typography variant="h6" component="h3">Hours</Typography>
                    <TextField
                        id="hours"
                        label="Hours"
                        name="hours"
                        type="number"
                        onChange={handleChange}
                        className={classes.field}
                    />
                    {/* maybe add this to a formik component ??? may help with submitting... */}

                    </DialogContent>
                    <DialogActions>
                    <Button onClick={() => handleClose('edit')} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleSubmit(itemId)} color="primary">
                        Submit
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default HomePage;