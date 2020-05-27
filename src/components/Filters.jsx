import React        from 'react'
import {CheckPicker, DateRangePicker, Form, Col, Schema, Row} from 'rsuite'
import Widget from "./Widget";


const { ArrayType } = Schema.Types;
const model = Schema.Model({
    system: ArrayType(),
    severity: ArrayType(),
    dates: ArrayType()
});


const Filters = ({filters, onChage}) => {

    const formValue = Object.keys(filters).reduce(
        (formVal, key)=>{
            formVal[key] = filters[key].value;
            return formVal;
        },
        {}
    );

    return (
        <Form model={model} formValue={formValue} onChange={onChage}>
            <Row>
                <Col xs={24} sm={12} md={8} lg={3}>
                    <Widget
                        name     = "system"
                        label    = "Система"
                        accepter = {CheckPicker}
                        data = {filters.system.options}
                        block
                    />
                </Col>
                <Col xs={24} sm={12} md={8} lg={3}>
                    <Widget
                        name     = "severity"
                        label    = "Критичность"
                        accepter = {CheckPicker}
                        data = {filters.severity.options}
                        block
                    />
                </Col>
                <Col xs={24} sm={12} md={8} lg={3}>
                    <Widget
                        name     = "discovered"
                        label    = "Метод обнаружения"
                        accepter = {CheckPicker}
                        data = {filters.discovered.options}
                        block
                    />
                </Col>
                <Col xs={24} sm={12} md={8} lg={3}>
                    <Widget
                        name     = "foundAt"
                        label    = "Найдено при"
                        accepter = {CheckPicker}
                        data = {filters.foundAt.options}
                        block
                    />
                </Col>
                <Col xs={24} sm={12} md={8} lg={3}>
                    <Widget
                        name     = "defectType"
                        label    = "Тип дефекта"
                        accepter = {CheckPicker}
                        data = {filters.defectType.options}
                        block
                    />
                </Col>
                <Col xs={24} sm={12} md={8} lg={3}>
                    <Widget
                        name     = "status"
                        label    = "Состояние"
                        accepter = {CheckPicker}
                        data = {filters.status.options}
                        block
                    />
                </Col>
                <Col xs={24} sm={12} md={8} lg={3}>
                    <Widget
                        name     = "dates"
                        label    = "Период"
                        accepter = {DateRangePicker}
                        block
                    />
                </Col>
            </Row>
        </Form>
    )
};


export default Filters
