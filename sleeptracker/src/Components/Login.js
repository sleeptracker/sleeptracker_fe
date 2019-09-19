import React, { useState, useEffect } from 'react';
import { Form, Field, withFormik} from 'formik';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core';
import * as Yup from 'yup';
import axios from 'axios';
import { textAlign } from '@material-ui/system';

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
    }
})

const Login = ({values, errors, touched, status}) => {
    const classes= useStyles();
    const [user, setUser] = useState({})

    useEffect(() => {
        if (status) {
            setUser(status)
        }
    }, [status])
    return (
        <div className={classes.wrapper}>
            <Form className={classes.form}>
                <div className={classes.header}>
                    <h1>SleepTracker</h1>
                </div>
                {touched.email && errors.email && <p>Email required!</p>}
                <Field className={classes.inputs} type="text" name="email" placeholder="Email"/>

                {touched.password && errors.password && <p>Password required!</p>}
                <Field className={classes.inputs} type="password" name="password" placeholder="Password" />
                <Button variant="contained" className={classes.button} type="submit">Log In</Button>
            </Form>
        </div>
    )
}

export default withFormik({
mapPropsToValues: (props) => {
    return {
        email: props.email || "",
        password: props.password || ""
    }
},
validationSchema: Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required()
}),
handleSubmit: (values, { setStatus }) => {
    // axios.post('', values)
    // .then(res => {
    //     console.log(res.data);
    //     setStatus(res.data);
    // })
    // .catch(err => console.log(err))
    console.log(values);
}
})(Login);