import React from "react";
import { Container, Row } from "rsuite";

const WidgetWrapper = ({title, children}) => {
    return (
        <Container>
            <Row>{title}</Row>
            <Row>{children}</Row>
        </Container>
    )
};

export default WidgetWrapper
