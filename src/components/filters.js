import React        from 'react'
import Select       from './prescomponents/select'
import DatePic      from './prescomponents/datepic'

class Filters extends React.Component{
    render(){
        const { options, setter, dateValues, filterChart =f=>f } = this.props
        const { systems, criticalnesses } = options
        return(
            <div>
                <h2>Фильтр данных для графика</h2>
                <Select 
                    options = { systems } 
                    onSelect = {({target}) => setter('chartData', target.value, 'system')}
                />
                <Select 
                    options = { criticalnesses }
                    onSelect = {({target}) => setter('chartData', target.value, 'criticalness')}
                />
                <DatePic
                    placeholder = "Дата от:"
                    onChange = {(value) => setter('chartData', value, 'startDate')}
                    selected = {dateValues.startDate}
                />
                <DatePic
                    placeholder = "Дата до:"
                    onChange = {(value) => setter('chartData', value, 'endDate')}
                    selected = {dateValues.endDate}
                />
                <button onClick = {filterChart}> Поиск </button>
            </div>
        )
    }
}

export default Filters