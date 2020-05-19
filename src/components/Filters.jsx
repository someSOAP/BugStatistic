import React        from 'react'
import { CheckPicker, DateRangePicker, FlexboxGrid, Form, Col, Schema} from 'rsuite'
import Widget from "./Widget";

const { Item } = FlexboxGrid;

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
            <FlexboxGrid justify="start">
                <Item colspan={6} componentClass={Col}>
                    <Widget
                        name     = "system"
                        label    = "Система"
                        accepter = {CheckPicker}
                        data = {filters.system.options}
                        block
                    />
                </Item>
                <Item colspan={6} componentClass={Col}>
                    <Widget
                        name     = "severity"
                        label    = "Критичность"
                        accepter = {CheckPicker}
                        data = {filters.severity.options}
                        block
                    />
                </Item>
                <Item colspan={6} componentClass={Col}>
                    <Widget
                        name     = "dates"
                        label    = "Период"
                        accepter = {DateRangePicker}
                        block
                    />
                </Item>
            </FlexboxGrid>
        </Form>
    )
};


export default Filters
