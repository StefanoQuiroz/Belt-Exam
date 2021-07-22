import axios from 'axios';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Swal from 'sweetalert2';

const PMNew = (props) => {
    const history = useHistory()
    const {data, setData} = props
    const [input, setInput] = useState({
        project: "",
        dueDate: new Date()
    })

    const onChange = (event) => {
        const {name, value} = event.target;
        setInput({
            ...input,
            [name]:value
        })
    }

    const home = (event) => {
        history.push("/")
    }

    const createProject = (event) => {
        axios.post("/api/project/new", input)
            .then(response => {
                if(response.data&&response.data.data){
                    home(event);
                    setData(data.concat([response.data.data]));
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Create Project Error - 1",
                        text: response.data.message.error
                    })
                }
            })
            .catch(err => Swal.fire({
                icon: "error",
                title: "Create Project Error - 2",
                text: "An error occurred while creating a project"
            }))
    }

    const onSubmit = (event) => {
        event.preventDefault();
        createProject(event);
    }

    const {project, dueDate} = input;

    return (
        <Container style={{padding:'1.5rem'}}>
            <Link style={{float:'right'}} to="/">Back to Dashboard</Link>
            <Form onSubmit={onSubmit}  style={{border:'2px solid black', marginTop:'1.5rem', padding:'0.5rem'}}>
                <Row>
                    <h2 style={{textAlign: 'left'}}>Plan a new project</h2>
                </Row>
                <FormGroup row style={{padding: '1rem'}}>
                    <Label for="proy" sm={4} style={{fontWeight:'600'}}>Project</Label>
                    <Col sm={8}>
                        <Input type="text" name="project" id="proy" value={project} onChange={onChange} style={{border: '2px solid black'}}/>
                        {(project.length > 0 && project.length<3)&&<p style={{color:'red', fontSize:'1.3rem'}}>The project name must be 3 character or longer</p>}              
                    </Col>
                </FormGroup>    
                <FormGroup row style={{padding: '1rem'}}>
                    <Label for="date" sm={4} style={{fontWeight:'600'}}>Due Date</Label>
                    <Col sm={8}>
                        <Input type="datetime-local" name="dueDate" id="date" value={dueDate} onChange={onChange} style={{border: '2px solid black'}}/>
                        {dueDate && <p style={{color:'red', fontSize:'1.3rem'}}>Enter a date please</p>}              
                    </Col>
                </FormGroup>
                <FormGroup row style={{padding: '1rem'}}>
                    <Col xs>
                        <Button size='lg' style={{backgroundColor: '#6495ED', width:'100%', color:'#000' , fontWeight:'bold', border:'2px solid black'}} type="submit" >Register</Button>
                    </Col>
                </FormGroup>        
            </Form>
        </Container>
    );
}

export default PMNew;
