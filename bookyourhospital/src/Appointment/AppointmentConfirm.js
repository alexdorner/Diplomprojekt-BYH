import React, { Component } from 'react';
import {Button, Col, Container, ListGroup, Row} from "react-bootstrap";

class AppointmentConfirm extends Component {
    state = {data: []}
    appointmentView = this.props.match.params.appointmentView
    async componentWillMount() {
        const url = "http://localhost:8080/api/appointment/vormerken";
        const response = await fetch(url).then(response => response.json()).then(recievedData => this.setState({data: recievedData}));
        // console.log(this.state.data);
    }

    render() {
        return (
            <center>
                <h1>Individueller Termincode: {this.appointmentView}</h1>
                <h2>Ihr Termin wurde erfolgreich vorgemerkt</h2>
                <Button size="lg" variant="dark" type="submit" action href={'/'}>Beenden</Button>
            </center>
        );
    }
}
export default AppointmentConfirm;