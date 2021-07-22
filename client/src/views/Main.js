import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import PMNew from '../components/PMNew';
import axios from 'axios';
import Swal from 'sweetalert2';
import PMList from '../components/PMList';
import Login from '../components/Login';
import Register from '../components/Register';
const Main = () => {
    const [data, setData] = useState([]);
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        axios.get("/api/project")
            .then(response => setData(response.data.data))
            .catch(err => Swal.fire({
                icon: "error",
                title: "Project Error",
                text: "Error in loading the data from projects"
            }))
        axios.get("/api/users")
            .then(response => setData(response.data.data))
            .catch(err => Swal.fire({
                icon: "error",
                title: "Users Error",
                text: "Error in loading the data from users"
            }))
    }, [])
    return (
        <Container>
            <Router>
                <Switch>
                    <Route path={`/sign_in`}>
                        <Row>
                            <h1>Project Manager</h1>
                            <Col xs>
                                <Register users={users} setUsers={setUsers}/>
                            </Col>
                            <Col xs>
                                <Login/>
                            </Col>
                        </Row>
                    </Route>
                    <Route path={`/projects/new`}>
                        <Row>
                            <h1>Project Manager</h1>
                            <Col md={6}>
                                <PMNew data={data} setData={setData}/>
                            </Col>
                        </Row>
                    </Route>
                    <Route path={`/`}>
                        <PMList data={data} setData={setData}/>
                    </Route>
                </Switch>
            </Router>
            
        </Container>
    );
}

export default Main;
