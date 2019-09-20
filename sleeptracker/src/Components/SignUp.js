import React from 'react';
import { withFormik, Field, Form } from 'formik';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
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
        height: '60%',
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid black',
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
    },
    fields: {
        width: '50%',
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'center',
        justifyContent: 'center',
    }
})


const SignUp = ({values, errors, touched, status}) => {
    const classes=useStyles();
    return (
        <div className={classes.wrapper}>
            <Form className={classes.form} >
                <div className={classes.header}>
                    <h1>SleepTracker</h1>
                </div>
                <div className={classes.fields}>
                {touched.username && errors.username && <p className={classes.warning}>Username required!</p>}
                <Field  className={classes.inputs} type="text" name="username" placeholder="Username" />

                {touched.email && errors.email && <p className={classes.warning}>Email required!</p>}
                <Field  className={classes.inputs} type="text" name="email" placeholder="Email" />

                {touched.firstName && errors.firstName && <p className={classes.warning}>First Name required!</p>}
                <Field  className={classes.inputs} type="text" name="firstName" placeholder="First Name" />

                {touched.lastName && errors.lastName && <p className={classes.warning}>Last Name required!</p>}
                <Field  className={classes.inputs} type="text" name="lastName" placeholder="Last Name" />

                {touched.password && errors.password && <p className={classes.warning}>Password required!</p>}
                <Field  className={classes.inputs} type="password" name="password" placeholder="Password" />

                </div>
                
                <Button className={classes.button} variant="contained" type="submit">Sign Up</Button>
            </Form>
            
        </div>
    )
}

export default withFormik({
    mapPropsToValues: (props) => {
        return {
        username: props.username || "",
        password: props.password || "",
        firstName: props.firstName || "",
        lastName: props.lastName || "",
        email: props.email || ""

        }

    },
    validationSchema: Yup.object().shape({
        username: Yup.string().min(4).required(),
        password: Yup.string().min(6).required(),
        firstName: Yup.string().required(),
        lastName: Yup.string().required(),
        email: Yup.string().email().required()
    }),
    handleSubmit: (values, { setStatus }) => {
        axios.post("https://get-sleeptracker.herokuapp.com/api/auth/register", values) 
        .then(res => {
            let token = res.data.token
            console.log(token)
            localStorage.setItem("token", token)
        })
        .catch(err => console.log(err))
        console.log(values)
    }
})(SignUp);