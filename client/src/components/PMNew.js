import axios from 'axios';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
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
        <Row>
            <Row>
            </Row>
            <Form onSubmit={onSubmit}>
                <Row form>
                    <Col md={6}>
                        <h1>Project Manager</h1>
                        <Link style={{float:'right'}} to="/">Back to Dashboard</Link>
                        <p style={{float:'left'}}>Plan a new project</p>
                        <FormGroup>
                            <Label for="proy">Project</Label>
                            <Input type="text" name="project" id="proy" value={project} onChange={onChange}/>
                            {(project.length > 0 && project.length<3)&&<p>The project Name must be 3 character or longer</p>}              
                        </FormGroup>    
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="date">Due Date</Label>
                            <Input type="datetime-local" name="dueDate" id="date" value={dueDate} onChange={onChange}/>
                            {dueDate && <p>Enter a date please</p>}              
                        </FormGroup>    
                    </Col>
                </Row>
                <Row form>
                    <Col md={6}>
                        <Button type="submit">Plan Project</Button>
                    </Col>
                </Row>   
            </Form>
            
        </Row>
    );
}

export default PMNew;
