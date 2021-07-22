import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const Login = () => {
    const [login, setLogin] = useState({
        email: "",
        password: ""
    })

    const history = useHistory();

    const onChange = (event) => {
        const {name, value} = event.target;
        setLogin({
            ...login,
            [name]:value
        })
    }

    const home = (event) => {
        history.push("/projects/new")
    }

    const onSubmit = (event) => {
        event.preventDefault();
        axios.post("/api/login", login)
            .then(response => {
                if(response.data && !response.data.error){
                    home(event);
                } else {
                    Swal.fire({
                        icon:"error",
                        title: "Error - Login",
                        text: response.data.message
                    })
                }
            });
    }

    return (
        <Container>
            <Row>
                <h1>Login</h1>
            </Row>
            <Col md={6}>
                <Form onSubmit={onSubmit}>
                    <Row>
                        <Col xs={12}>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="text" id="email" name="email" value={login.email} onChange={onChange} required/>
                            </FormGroup>
                        </Col>
                        <Col xs={12}>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="password" id="password" name="password" value={login.password} onChange={onChange} required/>
                            </FormGroup>
                        </Col>
                        <Col xs={12}>
                            <Button type="submit">Login</Button>
                        </Col>
                    </Row>       
                </Form>
            </Col>     
        </Container>
    );
}

export default Login;
