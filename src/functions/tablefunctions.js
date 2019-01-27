import React    from 'react'
import Select   from '../components/prescomponents/select'
import DatePic  from '../components/prescomponents/datepic'
import moment   from 'moment'

function valuesToArray(obj){
	let values = []
	for(let key in obj ){
        moment(obj[key], moment.ISO_8601, true).isValid() ? 
        values.push(new Date(obj[key]).toLocaleDateString()) :
        values.push(obj[key])  
    }
	return values
}

function attrsToArray(obj){
    let values = []
    for(let key in obj)
    values.push(key)
    return values
}

function formatStr(string){
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return capitalizeFirstLetter(string.replace('_', " "))
}

const  dateRange = (attr, setter, dateValue) => 
    <span>
        <DatePic placeholder = "Дата от:" selected = {dateValue.from}  onChange = {(value) => setter(attr, value, 'from')}/> 
        <DatePic placeholder = "Дата до:" selected = {dateValue.to}    onChange = {(value) => setter(attr, value, 'to')}/>
    </span> 


function createFilterField(attr, options, filters, dateValues){
    const { systems, statuses, foundAt, deffectType, criticalnesses, findMethod } = options
    const { setStateValue } = filters
    const { createDate, changeDate, closeDate } = dateValues
    switch(attr){
        case 'ID':
            return <input className = 'form-control' type = 'number' min = '0' onBlur = {({target}) => setStateValue('rowID', target.value)}/>
        case "reopens_amount": 
            return <input className = 'form-control' type = 'number' min = '0' onBlur = {({target}) => setStateValue('reopens', target.value)}/>
        case 'System':
            return <Select options = {systems} onSelect = {({target}) => setStateValue('system', target.value)}/>
        case 'Состояние': 
            return <Select options = {statuses} onSelect = {({target}) => setStateValue('status', target.value)}/>
        case "Найдено при":
            return <Select options = {foundAt} onSelect = {({target}) => setStateValue('foundAt', target.value)}/>
        case "Критичность": 
            return <Select options = {criticalnesses} onSelect = {({target}) => setStateValue('criticalness', target.value)}/>
        case "Тип Дефекта":
            return <Select options = {deffectType} onSelect = {({target}) => setStateValue('deffectType', target.value)}/>
        case "Дата создания" :
            return dateRange('createDate', setStateValue, createDate) 
        case "Дата изменения":
            return dateRange('changeDate', setStateValue, changeDate)
        case "Дата закрытия" : 
            return dateRange('closeDate', setStateValue, closeDate)
        case "Метод обнаружения": 
            return <Select options = {findMethod} onSelect = {({target}) => setStateValue('findMethod', target.value)}/>
        case 'Summary':
            return <input className = 'form-control' type = 'text' onBlur = {({target}) => setStateValue('summary', target.value)}/>
        default :
            return <input className = 'form-control' type = 'text' />

    }
}


export {valuesToArray, attrsToArray, formatStr, createFilterField}