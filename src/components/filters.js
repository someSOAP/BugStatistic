import React        from 'react'
import Select       from './prescomponents/select'
import DatePicker   from './prescomponents/datepic'
import { Row, Col, Button } from 'react-bootstrap'

//компонента с фильтрами для построения графика
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

export default Filters