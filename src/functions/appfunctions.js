import {empty, rowsOnPage,  filtersInitialState}  from '../constants'

// Модуль, который содержит функции, необходимые для фильтрации данных, 
// пагинации данных, форматирования полей с датами.
// Все функции импортируются в App и привязываются к компоненте App.
// Имело место вынести функции в отдельный модуль, чтобы не засорят App

// функция для установки значения атрибута состояния
function setStateValue(field, value, subValue){ 
  const { state } = this
  let newState = {
    ...state
  }
  !!subValue ? newState[field][subValue] = value :
  newState[field] = value
  this.setState({
    ...newState
  })
}

// фнукция отображает в таблице страницу,
// по номеру, который мы выбрали в пагинации
function openPage({ selected }){
  const { state } = this
  this.setState({
    ...state,
    paginated:    paginate(state.filtered, rowsOnPage, selected),
    pageSelected: selected  
  })
}

// форматируем даты для отображения месяц + год на оси Х графика
function formatDate(date) {
  const getMonthName = (month) => {
    const monthes = ['Январь', 'Февраль', "Март", "Апрель", "Май", "Июнь",
                     "Июль", "Август", "Сентябрь", 'Октябрь',"Ноябрь", "Декабрь"] 
    return monthes[month]
  }  
  var mm = getMonthName(date.getMonth());
  var yy = date.getFullYear() % 100;
  if (yy < 10) yy = '0' + yy;
  return mm + ' ' + yy;
}

//фильтруем данные для посторения графика на их основе
function filterChart(){
    const { state } = this
    const { system, criticalness, startDate, endDate } = state.chartData
    const filteredData = state.data.filter(
      (item) => {
        let changeDate = new Date(item["Дата изменения"])
        if(item.System !== system) return false
        if(item.Критичность !== criticalness) return false
        if(!(changeDate >= startDate && changeDate <= endDate)) return false
        
        return true
    })
    
    //сортируем данные, чтобы даты отображались в порядке по возрастанию на оси Х
    const data = filteredData.sort(
      (a, b) => {
        const aDate = new Date(a["Дата изменения"])
        const bDate = new Date(b["Дата изменения"])
        if(aDate === bDate) return 0
        if(aDate < bDate) return -1
        return 1
      } 
    )

    //создаём ХЭШ-ТБЛИЦУ (объек, хотя, в данном случае, он, скорее как Set выстиупает) 
    // в которой будет храниться ключ (месяц.год) + значение (количество деффектов)
    let labelSet = {}
    data.forEach(
      (item) => {
        const key     = formatDate(new Date(item["Дата изменения"]))
        const value   = labelSet[key] !== undefined ? labelSet[key] +1 : 0
        labelSet[key] = value  
      }
    )
  
    //роазделяем ключи и их значения в раздельные массивы (нежно для построения графика)
   let xAxisLabels = []
   let yAxisValues = []
   for(let key in labelSet){
     xAxisLabels.push(key)
     yAxisValues.push(labelSet[key])
   }
    
   //собираем данные для построения графика в состояние App
    const chartData = {
      ...state.chartData,
      data,
      xAxisLabels,
      yAxisValues
    }

    this.setState({
      ...state,
      chartData
    })
}

// функция используется для получения всех возможных значений поля в массиве объектов 
// с помощью этой функции мы определяем справочник типов деффектов, названия систем и т.д.
function getFields(input, field) {
  var output = [];
  for (var i=0; i < input.length ; ++i)
  if(output.indexOf(input[i][field]) < 0){
        output.push(input[i][field]);
      }
  return output;
}

//пагинация данных по размеру страницы и номеру
function paginate(array, page_size, page_number) {
  return array.slice(page_number * page_size, (page_number + 1) * page_size);
}

// фильтрация таблицы исходных данных
function filterData(){
  const { state } = this
  const { rowID, system, summary, status, foundAt, criticalness, deffectType, createDate, changeDate, closeDate, findMethod, reopens, nullReopens } = state
  const filtered = state.data.filter(
    (item) => {
      let filterArray = []
      let itemCreateDate  = item["Дата создания"]   ? new Date(item["Дата создания"])   : undefined
      let itemChangeDate  = item['Дата изменения']  ? new Date(item['Дата изменения'])  : undefined
      let itemCloseDate   = item["Дата закрытия"]   ? new Date(item['Дата закрытия'])   : undefined

      // Да тут можно было просто вернуть false если какое-тоусловие не подходит, но я решил 
      // применить reduce просто для красоты
      if(rowID)                                     filterArray.push(item.ID == rowID)
      if(system && system != empty)                 filterArray.push(item.System == system)
      if(summary)                                   filterArray.push(item.Summary.includes(summary))
      if(status && status != empty)                 filterArray.push(item.Состояние == status)
      if(foundAt && foundAt != empty)               filterArray.push(item["Найдено при"] == foundAt)
      if(criticalness && criticalness != empty)     filterArray.push(item.Критичность == criticalness)
      if(deffectType && deffectType != empty)       filterArray.push(item["Тип Дефекта"] == deffectType)
      if(createDate.from && itemCreateDate)         filterArray.push(itemCreateDate >= createDate.from)
      if(createDate.to && itemCreateDate)           filterArray.push(itemCreateDate <= createDate.to)
      if(changeDate.from && itemChangeDate)         filterArray.push(itemChangeDate >= changeDate.from)
      if(changeDate.to && itemChangeDate)           filterArray.push(itemChangeDate <= changeDate.to)
      //есси дата закрытия включает строки с пустым значением
      if(!closeDate.includeNull && !itemCloseDate){
                                                    filterArray.push(false)
      }else{
        if(!!itemCloseDate && closeDate.from)       filterArray.push(itemCloseDate >= closeDate.from)
        if(!!itemCloseDate && closeDate.to)         filterArray.push(itemCloseDate <= closeDate.to)
      }                               

      if(findMethod && findMethod != empty)         filterArray.push(item['Метод обнаружения'] == findMethod)
     // если reopens_amount включает строки с пустым значением
      if(nullReopens && !item.reopens_amount){
                                                    filterArray.push(true)
      }else{
        if(reopens || reopens === '0')              filterArray.push(item.reopens_amount == reopens)         
      }

      return filterArray.reduce((a, b) => a&b, true);
    } 
  ) 
  this.setState({
    ...state,
    filtered,
    paginated: paginate(filtered, rowsOnPage, 0),
    pageSelected: 0
  })
}

// очищаем фильтры таблицы исходных данных
function clearFilters(){
  this.setState({
    ...this.state,
    ...filtersInitialState,
    closeDate:  {includeNull: true},
    changeDate: {},
    createDate: {},
    nullReopens: true
  })
}

export {  
          filterChart,
          openPage,
          getFields,
          paginate,
          setStateValue,
          filterData,
          clearFilters
        }
