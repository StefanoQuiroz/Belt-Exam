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
        <Container  style={{border:'2px solid black', marginTop:'1.5rem'}}>
                <Form onSubmit={onSubmit} >
                    <Row style={{backgroundColor: '#DCDCDC', fontSize: '1.5rem'}}>
                        <h1>Login</h1>
                    </Row>
                        <FormGroup row style={{padding: '1rem'}}>
                                <Label for="email" sm={4}>Email</Label>
                                <Col sm={8}>
                                    <Input type="text" id="email" name="email" value={login.email} onChange={onChange} required style={{border: '2px solid black'}}/>
                                </Col>
                        </FormGroup>
                        <FormGroup row style={{padding: '1rem'}}>
                                <Label for="password" sm={4}>Password</Label>
                                <Col sm={8}>
                                    <Input type="password" id="password" name="password" value={login.password} onChange={onChange} required style={{border: '2px solid black'}}/>
                                </Col>
                        </FormGroup>
                        <FormGroup row style={{padding: '1rem'}}>
                    <Col xs>
                        <Button size='lg' style={{backgroundColor: '#6495ED', width:'100%', color:'#000' , fontWeight:'bold', border:'2px solid black'}} type="submit">Login</Button>
                    </Col>
                </FormGroup>  
                </Form>
          {/*   </Col>  */}    
        </Container>
    );
}

export default Login;
