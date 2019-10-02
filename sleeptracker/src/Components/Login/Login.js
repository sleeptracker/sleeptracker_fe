import React, { useState, useEffect } from 'react';
import { Form, Field, withFormik} from 'formik';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';

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
        flexFlow: 'column nowrap',
        alignItems: 'center',
        // border: '2px solid black',
    },  
    header: {
        color: '#F7FA78',
        background: '#1A185B',
        width: '100%',

    },
    inputs: {
        width: '50%',
        textAlign: 'center',
        margin: '20px',
        padding: '10px 0 10px 0',
    },
    button: {
        background: '#1A185B',
        color: '#F7FA78',
        padding: '5px 15px 5px 15px',
        height: '15%'
    },
    link: {
        textDecoration: 'none',
        color: '#1A185B',

    },
    error: {
        color: 'red',

    },
    card: {
        maxWidth: 600,
        width: 600,
        display: 'flex',
        flexFlow: 'column wrap',
        justifyContent: 'center',
        alignItems: 'center',
    }
    // fields: {
    //     width: '80%',
    //     display: 'flex',
    //     flexFlow: 'column wrap',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // }
})

const Login = ({ values, errors, touched, status, setUser, history }) => {
    const classes= useStyles();
    const [error, setError] = useState();

    useEffect(() => {
        if (status) {
            if (Object.keys(status).includes('userId')) { 
            setUser(status);
            history.push('/Home/Home');
            } else {
                setError("Incorrect username or password");
                
            }
        
        } 
    }, [status])
    
    return (
        <div className={classes.wrapper}>
        <Card className={classes.card}>
        <div className={classes.header}>
                    <h1>SleepTracker</h1>
                </div>
            <Form className={classes.form}>
                <p className={classes.error}>{error}</p>
                {/* <div className={classes.fields}> */}
                {touched.username && errors.username && <span>Username required!</span>}
                <Field className={classes.inputs} type="text" name="username" placeholder="Username"/>

                {touched.password && errors.password && <span>Password required!</span>}
                <Field className={classes.inputs} type="password" name="password" placeholder="Password" />
                <div className={classes.button}>
                <Button variant="contained" className={classes.button} type="submit">Log In</Button>
                </div>
                <p>Don't have an account ? <Link to="/SignUp" className={classes.link}>Sign Up!</Link></p>
                {/* </div> */}
            </Form>
            </Card>
        </div>
    )
}

export default withFormik({
mapPropsToValues: (props) => {
    return {
        username: props.username || "",
        password: props.password || ""
    }
},
validationSchema: Yup.object().shape({
    username: Yup.string().min(4).required(),
    password: Yup.string().min(6).required()
}),
handleSubmit: (values, { setStatus } ) => {
    axios.post('https://sleeptrack.herokuapp.com/api/login', values)
    .then(res => {
        let token = res.data.token;
        const userId = res.data.id;
        localStorage.setItem("token", token)
        setStatus({
            userId: userId
        });
    })
    .catch(err => {
        setStatus('Error')
    })
}
})(Login);