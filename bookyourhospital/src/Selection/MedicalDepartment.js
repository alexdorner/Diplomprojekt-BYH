import React, {Component} from 'react';
import {Dropdown} from 'react-bootstrap';
import "./Selection.css";

class MedicalDepartment extends Component {
    state = {data: []}

    async componentWillMount() {
        const url = "http://localhost:8080/api/organization/Get";
        const response = await fetch(url).then(response => response.json()).then(recievedData => this.setState({data: recievedData}));
    }

    render() {
        return (
            <center>
                <div className="MedicalDepartment" style={{padding: 30}}>
                    <h2>Bitte wählen Sie eine Abteilung aus!</h2>
                </div>
                <div>
                    <Dropdown id="drop" >
                        <Dropdown.Toggle variant="info" id="dropdown-basic" size="lg">
                            Abteilung auswählen
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {this.state.data.length > 0 &&
                                this.state.data.map(el => <Dropdown.Item href={"ServiceUnit/"+el.id}>{el.id}</Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </center>
        );
    }
}

export default MedicalDepartment;