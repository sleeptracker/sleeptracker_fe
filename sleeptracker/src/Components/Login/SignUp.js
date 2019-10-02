import React, { useEffect } from 'react';
import { withFormik, Field, Form } from 'formik';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Card from '@material-ui/core/Card';

const useStyles = makeStyles({
    wrapper: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(rgba(24, 26, 91, 0.5), rgba(0, 0, 0, 0.6)),  url(${"https://images.unsplash.com/photo-1528353518104-dbd48bee7bc4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80"}) no-repeat center center fixed`,
        backgroundSize: 'cover',
    },
    form: {
        width: '50%',
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
        justifyContent: 'center',
        // border: '2px solid black',
    },  
    header: {
        color: '#F7FA78',
        background: '#1A185B',
        width: '100%',
        height: '15%',

    },
    inputs: {
        width: '50%',
        textAlign: 'center',
            margin: '20px',
            padding: '10px 0 10px 0',
        },
        button: {
            background: '#1A185B',
            color: 'white',
            marginBottom: '20px',
        },
    fields: {
        width: '100%',
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        maxWidth: 600,
        width: 600,
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    link: {
        color: 'black',
        
    },
    linkDiv: {
        display: 'flex',
        flexFlow:'row wrap',
        alignItems: 'center',
        justifyContent:'center',
    }
    
})


const SignUp = ({values, errors, touched, status, setUser, history}) => {
    const classes=useStyles();

    useEffect(() => {
        if (status) {
            setUser(status);
            history.push('/Home/Home');
        }
    }, [status])

    return (
        <div className={classes.wrapper}>
            <Card className={classes.card}>
            <div className={classes.header}>
                    <h1>SleepTracker</h1>
                </div>

                <Form className={classes.form} >               
                
                    <div className={classes.fields}>
                        {touched.username && errors.username && <p className={classes.warning}>Username required!</p>}
                        <Field  className={classes.inputs} type="text" name="username" placeholder="Username" />

                        {touched.password && errors.password && <p className={classes.warning}>Password required!</p>}
                        <Field  className={classes.inputs} type="password" name="password" placeholder="Password" />

                        {touched.birthdate && errors.birthdate && <p className={classes.warning}>Date of Birth required!</p>}
                        <Field className={classes.inputs} type="date" name="birthdate" />
                    </div>
                    
                    <div className={classes.bottom}>
                        <Button className={classes.button} variant="contained" type="submit">Sign Up</Button>
                    </div>
                </Form>
                <div className={classes.linkDiv}>
                    <ArrowBackIcon fontSize="small"/>
                    <Link to="/" className={classes.link}>Back to Login</Link>
                </div>
            </Card>
            
        </div>
    )
}

export default withFormik({
    mapPropsToValues: (props) => {
        return {
        username: props.username || "",
        password: props.password || "",
        birthdate: props.birthdate || ""

        }

    },
    validationSchema: Yup.object().shape({
        username: Yup.string().min(4).required(),
        password: Yup.string().min(6).required(),
        birthdate: Yup.date().required()
    }),
    handleSubmit: (values, { setStatus }) => {
        axios.post("https://sleeptrack.herokuapp.com/api/register", values) 
        .then(res => {
            let token = res.data.token
            let userId = res.data.id;
            localStorage.setItem("token", token)
            setStatus({
                userId: userId
            })
        })
        .catch(err => console.log(err))
        console.log(values)
    
    }
})(SignUp);