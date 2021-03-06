import React, { Component } from 'react';
import { Button, Table, Container, Row, Col, Dropdown } from 'react-bootstrap';
import history from "../history";

class ServiceUnit extends Component{

    constructor(props) {
            super(props);
            this.state = {data: []};

            if(this.props.match != null) {
                this.department = this.props.match.params.department;
            } else {
                this.department = "department";
            }
        }

    async componentWillMount() {
        const url = "http://localhost:8080/api/device/GetAll";
        const response = await fetch(url).then(response => response.json()).then(recievedData => this.setState({data: recievedData}));
    }

    render() {
        return (
            <center>
                <div style={{ padding: 10 }}>
                    <h1>Ausgewählte Abteilung: {this.department}</h1>
                    <div style={{ padding: 30 }}>
                        <h5>Bitte wählen Sie eine Art aus!</h5>
                    </div>
                    <div style={{ padding: 30 }}>
                        <Dropdown id="drop">
                            <Dropdown.Toggle variant="info" id="dropdown-basic">
                                Fachbereich auswählen
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {this.state.data.length > 0 &&
                                this.state.data.filter((e) => e.owner.type === this.department).map(el => <Dropdown.Item href={"/AppointmentOverview/"+ this.department + "/" + el.deviceName.id}>{el.deviceName.name}</Dropdown.Item>)}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </center>
        );
    }
}
export default ServiceUnit;