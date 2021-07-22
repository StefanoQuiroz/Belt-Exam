import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button} from 'reactstrap';
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
                    Swal.fire({
                        icon: "success",
                        title: "Registered",
                        text: "Registered with success!!"
                    })
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
        crearUsuario(event);
    }

    return (
        <Container style={{border:'2px solid black', marginTop:'1.5rem'}}>
            <Form onSubmit={onSubmit}>
                <Row style={{backgroundColor: '#DCDCDC', fontSize: '1.5rem'}}>
                    <h1>Register</h1>
                </Row>
                <FormGroup row style={{padding: '1rem'}}>
                    <Label for="nombre" sm={4}>Username</Label>
                    <Col sm={8}>
                        <Input type="text" name="userName" id="userName" value={input.userName} onChange={onChange} style={{border: '2px solid black'}}/>
                    </Col>
                </FormGroup>
            
                <FormGroup row style={{padding: '1rem'}}>
                    <Label for="email" sm={4}>Email</Label>
                    <Col sm={8}>
                        <Input type="email" name="email" id="email" value={input.email} onChange={onChange} style={{border: '2px solid black'}}/>
                    </Col>
                </FormGroup>
            
                <FormGroup row style={{padding: '1rem'}}>
                    <Label for="passoword" sm={4}>Password</Label>
                    <Col sm={8}>
                        <Input type="password" name="password" id="password" value={input.password} onChange={onChange} style={{border: '2px solid black'}}/>
                    </Col>
                </FormGroup>
            
                <FormGroup row style={{padding: '1rem'}}>
                    <Label for="confPassword" sm={4}>Confirm Password</Label>
                    <Col sm={8}>
                        <Input type="password" name="confirmPassword" id="confPassword" value={input.confirmPassword} onChange={onChange} style={{border: '2px solid black'}}/>
                    </Col>
                </FormGroup>
                <FormGroup row style={{padding: '1rem'}}>
                    <Col xs>
                        <Button size='lg' style={{backgroundColor: '#6495ED', width:'100%', color:'#000' , fontWeight:'bold', border:'2px solid black'}} type="submit">Register</Button>
                    </Col>
                </FormGroup>  
            </Form>
        </Container>
    );
}

export default Register;
