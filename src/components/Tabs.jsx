import React from 'react';

import { Nav, Row } from 'rsuite'

const Tabs = ({activeTab, onSelect, children}) => {
    return (
        <>
            <Row>
                <Nav appearance="subtle" activeKey={activeTab} onSelect={onSelect}>
                    <Nav.Item eventKey="data">Данные по багам</Nav.Item>
                    <Nav.Item eventKey="chart">График</Nav.Item>
                </Nav>
            </Row>
            <Row>
                {
                    activeTab === "data" ?
                        children[0] : children[1]
                }
            </Row>
        </>
    )
};

export default Tabs
