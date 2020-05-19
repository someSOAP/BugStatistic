import React, { useReducer, useEffect } from 'react';
import { Container, Header, Content, Grid, Row } from "rsuite";

import Filters from './components/Filters'
import Table from './components/Table'

import { initialState, reducer } from "./store/";
import { setFiltersOptions, onChangePage, setFiltersValue, onChangeLength } from "./store/actions";
import 'rsuite/dist/styles/rsuite-default.css'


const Application = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(()=>{
        dispatch(setFiltersOptions());
    }, []);

    return (
        <Container>
            <Header>
            </Header>
            <Content>
                <Grid fluid>
                    <Filters
                        filters={state.filters}
                        onChage={(filterVal)=>dispatch(setFiltersValue(filterVal))}
                    />
                    <Row>
                        <Table
                            data={state.data}
                            onChangePage={(pageNum) => dispatch(onChangePage(pageNum))}
                            onChangeLength = {(pageLength) => dispatch(onChangeLength(pageLength))}

                            {...state.table}
                        />
                    </Row>
                </Grid>
            </Content>
        </Container>
    );
};

export default Application;

