import React, { Component } from 'react';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import "./TanService.css"

class TanServiceSMS extends Component {

    constructor(props) {
        super(props);
        this.state = {sms: ''};

        if(this.props.match != null) {
            this.appointmentOverView = this.props.match.params.appointmentOverView;
            this.hospital = this.props.match.params.hospital;
            this.address = this.props.match.params.address;
            this.date = this.props.match.params.date;
            this.time = this.props.match.params.time;
            this.parent = this.props.match.params.parent;
        } else {
            this.appointmentOverView = "appointmentView";
            this.hospital = "hospital";
            this.address = "address";
            this.date = "date";
            this.time = "time";
            this.parent = "parent";
        }

        this.changeSMS = this.changeSMS.bind(this);
        this.sendSMS = this.sendSMS.bind(this);
    }

    changeSMS(event) {
        this.setState({sms: event.target.value});
    }

    sendSMS(event) {
        event.preventDefault();

        //console.log('clicked sendSMS: ' + this.state.sms);

        fetch("http://localhost:3000/api/sendSms?to=" + this.state.sms)
        .then(response => response.json())
        .then((jsonData) => {
            //console.log(jsonData);

            if(jsonData.returnCode == "ok") {
                this.props.history.push('/TanCheck/' + this.appointmentOverView + '/' + this.hospital + '/' + this.address + '/' + this.date + '/' + this.time + '/' + this.parent + "/sms/" + this.state.sms);
                this.props.history.go();
            } else {
                this.props.history.push('/TanError/' + this.appointmentOverView + '/' + this.hospital + '/' + this.address + '/' + this.date + '/' + this.time + '/' + this.parent);
                this.props.history.go();
            }
        })
        .catch((error) => {
            console.error(error);
            this.props.history.push('/TanError/' + this.appointmentOverView + '/' + this.hospital + '/' + this.address + '/' + this.date + '/' + this.time + '/' + this.parent);
            this.props.history.go();
        })
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col xs="3"></Col>
                    <Col>
                        <br></br>
                        <Form onSubmit={this.sendSMS}>
                            <Form.Group>
                                <Form.Label className="d-flex justify-content-center"><h4>Bitte geben Sie Ihre Telefonnummer an</h4></Form.Label>
                                <Form.Control value={this.state.sms} onChange={this.changeSMS} type="sms" placeholder="Telefonnummer (+431234567)" id="to" name="to" required autoFocus/>
                            </Form.Group>
                            <div className="d-flex justify-content-center">
                                <Button size="lg" variant="dark" type="submit">Senden</Button>
                            </div>
                            <br></br>
                            <div className="d-flex justify-content-center">
                                <a href={"/TanServiceEmail/" + this.appointmentOverView + '/' + this.hospital + '/' + this.address + '/' + this.date + '/' + this.time + '/' + this.parent}>Tan per Email senden</a>
                            </div>
                        </Form>
                    </Col>
                    <Col xs="3"></Col>
                </Row>
            </Container>
        );
    }
}

export default TanServiceSMS;

/*
    render() {
        return (
            <Container>
                <Row>
                    <Col></Col>
                    <Col>
                        <br></br>
                        <div className="d-flex justify-content-center">
                            <h1>Tan per SMS</h1>
                        </div>
                        <Form onSubmit={this.sendSMS} method='POST'>
                            <div className="d-flex justify-content-center">
                                <input value={this.state.sms} onChange={this.changeSMS} type="tel" id="to" name="to" className="form-control" placeholder="Telefonnummer (+431234567)" required autoFocus></input>
                            </div>
                            <br></br>
                            <div className="d-flex justify-content-center">
                                <Button size="lg" variant="dark" type="submit">Senden</Button>
                            </div>
                        </Form>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        );
    }
}
 */

