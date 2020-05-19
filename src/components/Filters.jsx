import React        from 'react'
import { CheckPicker, DateRangePicker, FlexboxGrid, Form, Schema, Button } from 'rsuite'
import WidgetWrapper from "./WidgetWrapper";
import Widget from "./Widget";

const { Item } = FlexboxGrid;

const { ArrayType } = Schema.Types;
const model = Schema.Model({
    system: ArrayType(),
    severity: ArrayType(),
    dates: ArrayType()
});


const Filters = ({filters, onChage = console.log}) => {
    return (
        <Form model={model} formValue={filters} onChange={onChage}>
            <FlexboxGrid justify="space-between">
                <Item colspan={6}>
                    <Widget
                        name     = "system"
                        label    = "Система"
                        accepter = {CheckPicker}
                        data = {[]}
                    />
                </Item>
                <Item colspan={6}>
                    <Widget
                        name     = "severity"
                        label    = "Критичность"
                        accepter = {CheckPicker}
                        data = {[]}

                    />
                </Item>
                <Item colspan={6}>
                    <Widget
                        name     = "dates"
                        label    = "Период"
                        accepter = {DateRangePicker}
                    />
                </Item>
                <Item colspan={6}>
                    <WidgetWrapper title={"_"}>
                        <Button block onClick = {console.log}>
                            Поиск
                        </Button>
                    </WidgetWrapper>
                </Item>
            </FlexboxGrid>
        </Form>
    )
};

/*
class Filters extends React.Component{
    render(){
        const { options, setter, dateValues, filterChart =f=>f } = this.props
        const { systems, criticalnesses } = options
        const { startDate, endDate } = dateValues
        // функция по обновлению графика, в случае когда график уже построен,
        // но некоторые параметры фильтрации изменены
        const renewChart = () => {
            if(systems && criticalnesses && startDate && endDate){
                filterChart()
            }
        }
        return(
            <Row>
                <Col>
                    <Select
                        options = { systems }
                        title   = "Система"
                        onSelect = {({target}) => {
                            setter('chartData', target.value, 'system')
                            renewChart()
                        }
                        }
                    />
                </Col>
                <Col>
                    <Select
                        options  = { criticalnesses }
                        title    = "Критичность"
                        onSelect = {({target}) => {
                            setter('chartData', target.value, 'criticalness')
                            renewChart()
                        }}
                    />
                </Col>
                <Col>
                    <DatePicker
                        placeholder = "Дата от:"
                        title = "Дата от"
                        onChange = {(value) => {
                            setter('chartData', value, 'startDate')
                            renewChart()
                        }}
                        selected = {startDate}
                    />
                </Col>
                <Col>
                    <DatePicker
                        placeholder = "Дата до:"
                        title = "Дата до"
                        onChange = {(value) => {
                            setter('chartData', value, 'endDate')
                            renewChart()
                        }}
                        selected = {endDate}
                    />
                </Col>
                <Col>
                    <br/>
                    <Button onClick = {filterChart}>
                        Поиск
                    </Button>
                </Col>
            </Row>
        )
    }
}
*/

export default Filters
