import React, { useReducer, useEffect } from 'react';
import { Container, Header, Content, Grid, Row } from "rsuite";

import Filters from './components/Filters'
import Table from './components/Table'
import Tabs from './components/Tabs'
import Chart from './components/Chart'

import { initialState, reducer } from "./store";
import { setFiltersOptions, onChangePage, setFiltersValue, onChangeLength, setActiveTab } from "./store/actions";

import { State } from './store/model'

const Application: React.FC = () => {
    const [state, dispatch] : [State, (action: any) => void] = useReducer(reducer, initialState);

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
                        onChange={(filterVal)=>dispatch(setFiltersValue(filterVal))}
                    />

                    <Tabs
                        activeTab={state.activeTab}
                        onSelect={(tab)=>dispatch(setActiveTab(tab))}
                    >
                        {
                            state.activeTab === "data" ?
                            <Table
                                data={state.data}
                                onChangePage={(pageNum) => dispatch(onChangePage(pageNum))}
                                onChangeLength = {(pageLength) => dispatch(onChangeLength(pageLength))}

                                {...state.table}
                            /> :
                            <Chart data={state.data}/>
                        }
                    </Tabs>
                </Grid>
            </Content>
        </Container>
    );
};

export default Application;

