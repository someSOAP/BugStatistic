import React from 'react';

import { Nav, Row } from 'rsuite'

type TabsProps = {
    activeTab: string,
    onSelect: (tabName: string) => void,
}

const Tabs: React.FC<TabsProps> = ({activeTab, onSelect, children}) => {
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
                    children
                }
            </Row>
        </>
    )
};

export default Tabs;
