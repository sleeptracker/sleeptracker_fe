import React, { useState, useEffect } from 'react';
import { Form, Field, withFormik} from 'formik';
import Button from '@material-ui/core/Button'
import * as Yup from 'yup';
import axios from 'axios';

const Login = ({values, errors, touched, status}) => {
    const [user, setUser] = useState({})

    useEffect(() => {
        if (status) {
            setUser(status)
        }
    }, [status])
    return (
        <Form>
            <Field type="text" name="username" placeholder="Username"/>
            <Field type="password" name="password" placeholder="Password" />
            <Button variant="contained" color="primary" type="submit">Log In</Button>
        </Form>
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
    username: Yup.string().required("Username required!"),
    password: Yup.string().min(6, "Password must be at least 6 characters!").required("Password is required!")
}),
handleSubmit: (values, { setStatus }) => {
    axios.post('', values)
    .then(res => {
        console.log(res.data);
        setStatus(res.data);
    })
    .catch(err => console.log(err))
}
})(Login);