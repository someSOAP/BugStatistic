import React        from 'react'
import Select       from './prescomponents/select'
import DatePic      from './prescomponents/datepic'

class Filters extends React.Component{
    render(){
        const { options, setter, dateValues, filterChart =f=>f } = this.props
        const { systems, criticalnesses } = options
        return(
            <div className = 'container-fluid'>
                <h2>Фильтр данных для графика</h2>
                <div className = 'd-inline-block'>
                    <strong>Система:</strong>
                    <Select 
                        options = { systems } 
                        onSelect = {({target}) => setter('chartData', target.value, 'system')}
                    />
                </div>
                <div className = 'd-inline-block'>
                    <strong>Критичность:</strong>
                    <Select 
                        options = { criticalnesses }
                        onSelect = {({target}) => setter('chartData', target.value, 'criticalness')}
                    />
                </div>
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