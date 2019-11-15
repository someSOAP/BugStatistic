import React from "react"
import { Accordion, Card, Button, Row, Col, InputGroup, FormControl } from "react-bootstrap";

const Info = ({loadFile}) => {
    return (
        <Accordion defaultActiveKey="1">
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        Инфо
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Row>
                            В данный дашборд можно загрузить другой набор данных
                        </Row>
                        <Row>
                            <Col lg={1}>
                            </Col>
                            <Col lg={2}>
                                Данные для обработки:
                            </Col>
                            <Col lg={1}>
                                <input
                                    className = 'input-group-append'
                                    type="file"
                                    id="fileInput"
                                    onChange = {(event) => console.log(event)}
                                />
                            </Col>
                            <Col lg={7}>
                            </Col>
                            <Col lg={1}>
                                <Button onClick = {loadFile}>
                                    Загрузить
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card></Card>
        </Accordion>
    )
};

export default Info


//
// <Accordion defaultActiveKey="0">
// <Card>
// <Card.Header>
// <Accordion.Toggle as={Button} variant="link" eventKey="1">
//     Инфо
//     </Accordion.Toggle>
// </Card.Header>
// <Accordion.Collapse eventKey="1">
// <Card.Body>
// <Row>
// <Col lg={1}>
// </Col>
// <Col lg={2}>
// Данные для обработки:
// </Col>
// <Col lg={1}>
// <input
// className = 'd-inline form-control-fil'
// type="file"
// id="fileInput"
// onChange = {(event) => console.log(event)}
// />
// </Col>
// <Col lg={7}>
// </Col>
// <Col lg={1}>
// <Button onClick = {loadFile}>
// Загрузить
// </Button>
// </Col>
// </Row>
// </Card.Body>
// </Accordion.Collapse>
// </Card>
// </Accordion>