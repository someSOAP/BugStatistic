import React      from 'react'
import Select     from '../components/prescomponents/select'
import DatePicker from '../components/prescomponents/datepic'
import moment   from 'moment'
// функции, используемые в компоненте таблица или для её посторения,
// вынесены в этот модуль


//преобразуем значения объектов в массив
// на основе этих значений строим строки таблицы
function valuesToArray(obj){
    return Object.values(obj)
}

// преобразуем строку заголовка (перевод на русский некоторых значений)
// и убираем "_", если есть. 
function formatStr(string){
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    switch (string) {
        case "System":
            return "Система"
            break;
        case "Summary":
            return "Описание"
        case "reopens_amount":
            return "Количество переоткрытий"
        default:
            return capitalizeFirstLetter(string)
    }
}

//компонента - галочка "Кключая пустые"
// наличие этой галочки определяет влючение в результаты поиска 
// значений == null 
const includeNull = (onChange) =>
    <small>Включая пустые: {" "}
        <input type="checkbox" name="Включая пустые" onChange ={onChange}/>
    </small>
// компонента промежуток дат (от-> до)
const  dateRange = (attr, setter, dateValue) => 
    <span>
        <DatePicker placeholder = "Дата от:" selected = {dateValue.from}  onChange = {(value) => setter(attr, value, 'from')}/>
        <DatePicker placeholder = "Дата до:" selected = {dateValue.to}    onChange = {(value) => setter(attr, value, 'to')}/>
        {   
            (attr === 'closeDate') ?  
            includeNull(({target}) => setter(attr, target.checked, 'includeNull')) : ''
        }
    </span> 

// в зависимости от названия поля, добавляем к нему подходящий фильтр
function createFilterField(attr, options, filters, dateValues){
    const { systems, statuses, foundAt, deffectType, criticalnesses, findMethod } = options
    const { setStateValue } = filters
    const { createDate, changeDate, closeDate } = dateValues
    switch(attr){
        case 'ID':
            return <input style = {{float: "left"}} className = 'form-control form-control-sm' type = 'number' min = '0' onBlur = {({target}) => setStateValue('rowID', target.value)}/>
        case "reopens_amount": 
            return <div>
                        <input className = 'form-control form-control-sm' type = 'number' min = '0' onBlur = {({target}) => setStateValue('reopens', target.value)}/>
                        {includeNull(({target})=> setStateValue('nullReopens', target.checked))}
                    </div>
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
            return <input className = 'form-control form-control-sm' type = 'text' onBlur = {({target}) => setStateValue('summary', target.value)}/>
        default :
            return <input className = 'form-control form-control-sm' type = 'text' />

    }
}


export {valuesToArray, formatStr, createFilterField}