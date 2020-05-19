import React, { useReducer, useEffect } from 'react';
import { Container, Header, Content, Grid, Row, Col, Button, CheckPicker } from "rsuite";

import Filters from './components/Filters'
import Table from './components/Table'

import { initialState, reducer } from "./store/";
import { paginate } from "./store/actions";
import 'rsuite/dist/styles/rsuite-default.css'

const Application = () => {
    // const [state, dispatch] = useReducer(reducer, initialState);
    //
    // useEffect(()=>{
    //     dispatch(paginate(0))
    // }, []);

    return (
        <Container>
            <Header>
            </Header>
            <Content>
                <Grid>
                    <Filters filters={{}}/>
                    <Row>
                        <Table data={[]}/>
                    </Row>
                    <Row>
                        <CheckPicker data={[]}/>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <Button onClick={() => console.log()}>TST</Button>
                        </Col>
                    </Row>
                </Grid>
            </Content>
        </Container>
    );
};

export default Application;

