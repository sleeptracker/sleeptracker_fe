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


const SignUp = ({values, errors, touched, status}) => {
    const classes=useStyles();
    return (
        <div classname={classes.wrapper}>
            <Form className={classes.form} >
                <div className={classes.header}>
                    <h1>SleepTracker</h1>
                </div>
                {touched.email && errors.email && <p>Email required!</p>}
                <Field  className={classes.inputs} type="text" name="email" placeholder="Email" />

                {touched.firstName && errors.firstName && <p>First Name required!</p>}
                <Field  className={classes.inputs} type="text" name="firstName" placeholder="First Name" />

                {touched.lastName && errors.lastName && <p>Last Name required!</p>}
                <Field  className={classes.inputs} type="text" name="lastName" placeholder="Last Name" />

                {touched.password && errors.password && <p>Password required!</p>}
                <Field  className={classes.inputs} type="password" name="password" placeholder="Password" />

                <Button className={classes.button} variant="contained" type="submit">Sign Up</Button>
            </Form>
        </div>
    )
}

export default withFormik({
    mapPropsToValues: (props) => {
        return {
        email: props.email || "",
        firstName: props.firstName || "",
        lastName: props.lastName || "",
        password: props.password || "",

        }

    },
    validationSchema: Yup.object().shape({
        email: Yup.string().email().required(),
        firstName: Yup.string().required(),
        lastName: Yup.string().required(),
        password: Yup.string().min(6).required()
    }),
    handleSubmit: (values, { setStatus }) => {
        // axios.post('', values) 
        // .then(res => {
        //     console.log(res)
        //     setStatus(res.data)
        // })
        // .catch(err => console.log(err))
    }
})(SignUp);