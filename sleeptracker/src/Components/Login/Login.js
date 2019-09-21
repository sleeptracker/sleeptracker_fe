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
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center',
        border: '2px solid black',
    },  
    header: {
        color: '#F7FA78',
        background: '#1A185B',
        width: '100%',

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
        width: '20%',
        height: '15%'
    },
    link: {
        textDecoration: 'none',
        color: '#1A185B',

    },
    error: {
        color: 'red',

    },
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
            if (Object.keys(status).includes('token')) { 
            setUser(status);
            history.push('/Home/Home');
            } else {
                setError("Incorrect username or password");
                
            }
        
        } 
    }, [status])
    
    return (
        <div className={classes.wrapper}>
            <Form className={classes.form}>
                <div className={classes.header}>
                    <h1>SleepTracker</h1>
                </div>
                <p className={classes.error}>{error}</p>
                {/* <div className={classes.fields}> */}
                {touched.username && errors.username && <span>Username required!</span>}
                <Field className={classes.inputs} type="text" name="username" placeholder="Username"/>

                {touched.password && errors.password && <span>Password required!</span>}
                <Field className={classes.inputs} type="password" name="password" placeholder="Password" />
                <Button variant="contained" className={classes.button} type="submit">Log In</Button>

                <p>Don't have an account ? <Link to="/SignUp" className={classes.link}>Sign Up!</Link></p>
                {/* </div> */}
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
handleSubmit: (values, { setStatus } ) => {
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
    .catch(err => {
        setStatus('Error')
    })
}
})(Login);