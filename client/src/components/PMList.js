import React, { useState } from 'react';
import { Table, Row, Col, Button } from 'reactstrap';
import { BsXCircleFill } from "react-icons/bs";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
const PMList = (props) => {

    const history = useHistory();
    const pmNew = (event) => {
        history.push("/projects/new")
    }


    const {data, setData} = props;
   
    //const [backLog, setBackLog] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [completed, setCompleted] = useState([]);

   
    console.log(data);
    const startProject = (event, id) => {
        axios.get(`/api/project/${id}`)
            .then(response => setInProgress(response.data.data))
            .catch(err => Swal.fire({
                icon: "error",
                title: "Loading error in one project - start",
                text: "An error occurred while find only a project - Progress"
            }))
    }

    const moveToCompleted = (event, id) => {
        axios.get(`/api/project/${id}`)
        .then(response => setCompleted(response.data.data))
        .catch(err => Swal.fire({
            icon: "error",
            title: "Loading error in one project - move",
            text: "An error occurred while find only a project - Completed"
        }))
    }

    const removeProject = (event, id) => {
        Swal.fire({
            title: 'Remove Project',
            text: 'Ae you sure to remove the project?',
            icon: 'warning',
            showCancelButton: true
        }).then(result => {
            if(result.value) {
                axios.delete(`/api/project/delete/${id}`)
                .then(resp => {
                    const project = props.datos.filter(a => a._id !== id);
                    setData(project); 
                }).catch(error => Swal.fire({
                    icon: "error",
                    title: "Remove Error",
                    text: "Error on Remove projects"
                }))
            }
        })
    }


    return (
        <Row>
            <h1>Project Manager</h1> 
            <Col xs>
                <Table>
                    <thead>
                        <tr>
                            <th>Backlog</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data&&data.map((items, index)=>(
                        <tr key={index}>
                            <td>
                                <h5>{items.project}</h5>
                                <p>{items.dueDate}</p>
                                <Button onClick={(event)=>startProject(event, items._id)}>Start Project</Button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
            </Col>
            <Col xs>
                <Table>
                    <thead>
                        <tr>
                            <th>In Progress</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inProgress&&inProgress.map((items, index)=>(
                        <tr key={index}>
                            <td>
                                <h5>{items.project}</h5>
                                <p>{items.dueDate}</p>
                                <Button onClick={(event)=>moveToCompleted(event, items._id)}>Move To Completed</Button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
            </Col>
            <Col xs>
                <Table>
                    <thead>
                        <tr>
                            <th>Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {completed&&completed.map((items, index)=>(
                        <tr key={index}>
                            <td>
                                <h5>{items.project}</h5>
                                <p>{items.dueDate}</p>
                                <Button onClick={(event)=>removeProject(event, items._id)}>Remove Project</Button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
            </Col>
            <Row>
                <Col md={4}>
                    <Button onClick={(event) => pmNew(event)}><BsXCircleFill style={{margin:'0.2rem'}}/>Add New Project</Button>           
                </Col>
            </Row>
        </Row>
    );
}

export default PMList;
