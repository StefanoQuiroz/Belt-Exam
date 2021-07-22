import React, { useState } from 'react';
import axios from 'axios';
import { Row, Col, Form, FormGroup, Label, Input, Button} from 'reactstrap';
import Swal from 'sweetalert2';

const Register = (props) => {
    const {users, setUsers} = props
    const [input, setInput] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })


    const onChange = (event) => {
        const {name, value} = event.target;
        setInput({
            ...input,
            [name]:value
        })
    }

    const crearUsuario = (event) => {
        axios.post(`http://localhost:8000/api/users/new`, input)
            .then(response => {
                if(response.data && response.data.data){
                    setUsers(users.concat([response.data.data]));
                    //datos.concat([response.data.data])
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error on Register",
                        text: response.data.error.message
                    })
                }
            })

            .catch (err => Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ha ocurrido un problema al crear un nuevo usuario'
            }) )
    }

    const onSubmit = (event) => {
        event.preventDefault();
        crearUsuario(event)
    }

    return (
        <Col md={6}>
            <Form onSubmit={onSubmit}>
            <Row form>
                <Col md={6}>
                    <FormGroup>
                        <Label for="nombre">Nombre del Usuario</Label>
                        <Input type="text" name="nombre" id="userName" value={input.userName} onChange={onChange}/>
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="email">Email del Usuario</Label>
                        <Input type="email" name="email" id="email" value={input.email} onChange={onChange}/>
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="passoword">Password</Label>
                        <Input type="password" name="password" id="password" value={input.password} onChange={onChange}/>
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="confPassword">Confirm Password</Label>
                        <Input type="password" name="confirmPassword" id="confPassword" value={input.confirmPassword} onChange={onChange}/>
                    </FormGroup>
                </Col>
                </Row>             
                <Row form>
                    <Col>
                        <Button style={{margin:'2px'}} type="submit">Register</Button>
                    </Col>
                </Row>             
            </Form>
        </Col>
    );
}

export default Register;
