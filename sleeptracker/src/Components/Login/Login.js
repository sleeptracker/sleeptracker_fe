import React, { useState, useEffect } from 'react';
import { Form, Field, withFormik} from 'formik';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';


const useStyles = makeStyles({
    wrapper: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    form: {
        width: '50%',
        height: '50%',
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
        border: '2px solid black',
    },  
    header: {
        color: '#F7FA78',
        background: '#1A185B',
        width: '100%',
        marginBottom: '40px'
    },
    inputs: {
        width: '35%',
        textAlign: 'center',
        margin: '20px',
        padding: '10px 0 10px 0',
    },
    button: {
        background: '#1A185B',
        color: 'white',
    },
    link: {
        textDecoration: 'none',
        color: '#1A185B',

    }
})

const Login = ({values, errors, touched, status, setUser}) => {
    const classes= useStyles();

    useEffect(() => {
        if (status) {
            setUser(status);
             
        }
    }, [status])
    return (
        <div className={classes.wrapper}>
            <Form className={classes.form}>
                <div className={classes.header}>
                    <h1>SleepTracker</h1>
                </div>
                {touched.username && errors.username && <p>Username required!</p>}
                <Field className={classes.inputs} type="text" name="username" placeholder="Username"/>

                {touched.password && errors.password && <p>Password required!</p>}
                <Field className={classes.inputs} type="password" name="password" placeholder="Password" />
                <Button variant="contained" className={classes.button} type="submit">Log In</Button>

                <p>Don't have an account ? <Link to="/SignUp" className={classes.link}>Sign Up!</Link></p>
            </Form>
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
handleSubmit: (values, { setStatus }) => {
    axios.post('https://get-sleeptracker.herokuapp.com/api/auth/login', values)
    .then(res => {
        let token = res.data.token;
        const userName = res.data.user.username;
        // console.log(userName)
        // console.log(token);
        localStorage.setItem("token", token)
        setStatus({
            token: token,
            user: userName
        });
    })
    .catch(err => console.log(err))
}
})(Login);