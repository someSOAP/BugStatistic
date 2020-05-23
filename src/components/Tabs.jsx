import React from 'react';

import { Nav } from 'rsuite'

const Tabs = ({activeTab, onSelect}) => {
    return (
        <Nav appearance="subtle" activeKey={activeTab} onSelect={onSelect}>
            <Nav.Item eventKey="data">Данные по багам</Nav.Item>
            <Nav.Item eventKey="chart">График</Nav.Item>
        </Nav>
    )
};

export default Tabs
