import {empty, rowsOnPage}  from '../constants'

function setStateValue(field, value, type){
  const { state } = this
  let newState = {
    ...state
  }
  !!type ? newState[field][type] = value :
  newState[field] = value
  this.setState({
    ...newState
  })
}


function openPage({ selected }){
  const { state } = this
  this.setState({
    ...state,
    paginated:    paginate(state.filtered, rowsOnPage, selected),
    pageSelected: selected  
  })
}


function formatDate(date) {
  const getMonthName = (month) => {
    const monthes = ['Янв.', 'Фев.', "Мар.", "Апр.", "Май", "Июнь", "Июль", "Авг.", "Сент.", 'Окт.',"Нояб.", "Дек."]
    return monthes[month]
  }  
  var mm = getMonthName(date.getMonth());
  var yy = date.getFullYear() % 100;
  if (yy < 10) yy = '0' + yy;
  return mm + ' ' + yy;
}

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
    
    const data = filteredData.sort(
      (a, b) => {
        const aDate = new Date(a["Дата изменения"])
        const bDate = new Date(b["Дата изменения"])
        if(aDate === bDate) return 0
        if(aDate < bDate) return -1
        return 1
      } 
    )

    let labelSet = {}
    data.forEach(
      (item) => {
        const key     = formatDate(new Date(item["Дата изменения"]))
        const value   = labelSet[key] !== undefined ? labelSet[key] +1 : 0
        labelSet[key] = value  
      }
    )

   let xAxisLabels = []
   let yAxisValues = []
   for(let key in labelSet){
     xAxisLabels.push(key)
     yAxisValues.push(labelSet[key])
   }
    
    window.labelSet = labelSet
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

function getFields(input, field) {
  var output = [];
  for (var i=0; i < input.length ; ++i)
  if(output.indexOf(input[i][field]) < 0){
        output.push(input[i][field]);
      }
  return output;
}


function paginate(array, page_size, page_number) {
  return array.slice(page_number * page_size, (page_number + 1) * page_size);
}


function filterData(){
  const { state } = this
  const { rowID, system, summary, status, foundAt, criticalness, deffectType, createDate, changeDate, closeDate, findMethod, reopens } = state
  const filtered = state.data.filter(
    (item) => {
      let filterArray = []
      let itemCreateDate  = item["Дата создания"]   ? new Date(item["Дата создания"])   : undefined
      let itemChangeDate  = item['Дата изменения']  ? new Date(item['Дата изменения'])  : undefined
      let itemCloseDate   = item['Дата закрытия']   ? new Date(item['Дата закрытия'])   : undefined

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
      if(closeDate.from && itemCloseDate)           filterArray.push(itemCloseDate >= changeDate.from)
      if(closeDate.to && itemCloseDate)             filterArray.push(itemCloseDate <= changeDate.to)
      if(findMethod && findMethod != empty)         filterArray.push(item['Метод обнаружения'] == findMethod)
      if(reopens || reopens === '0')                filterArray.push(item.reopens_amount == reopens)                                   
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

export {  
          filterChart,
          openPage,
          getFields,
          paginate,
          setStateValue,
          filterData
        }
