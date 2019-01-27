import React, { Component } from 'react';
import Table                from './components/prescomponents/table'
import Filters              from './components/filters'
import * as AppF            from "./functions/appfunctions"; 
import * as C               from './constants/'
import LineChart            from './components/chart'
import $                    from 'jquery'
const data = require('./data/bugs_for_test.json')

//получаем все возможные значения для указанных полей
const options         = {
  systems:        AppF.getFields(data, "System"),
  criticalnesses: AppF.getFields(data, "Критичность"),
  statuses:       AppF.getFields(data, "Состояние"),
  foundAt:        AppF.getFields(data, "Найдено при"), 
  deffectType:    AppF.getFields(data, "Тип Дефекта"),
  findMethod:     AppF.getFields(data, "Метод обнаружения"),  
}

class App extends Component {
  constructor(props){
    super(props)
    const filtered = data
    this.state = {
      data,
      filtered, 
      pageSelected: 0,
      paginated:    AppF.paginate(filtered, C.rowsOnPage, 1),
      //Данные для графика
      chartData: {
          system:       C.empty,
          criticalness: C.empty,
          data:         [],
          startDate:    undefined,
          endDate:      undefined,
          xAxisLabels:  [],
          yAxisValues:  []
      },
      //атрибуты поиска по таблице основных данных
      rowID:        undefined,
      system:       C.empty,
      summary:      undefined,
      status:       C.empty,
      foundAt:      C.empty,
      criticalness: C.empty,
      deffectType:  C.empty,
      createDate:   { 
                      from:   undefined,
                      to:     undefined
                    },
      changeDate:   { 
                      from:   undefined,
                      to:     undefined
                    },
      closeDate:    { 
                      includeNull: true,
                      from:   undefined,
                      to:     undefined
                    },
      findMethod:   C.empty,
      reopens:      undefined,
      nullReopens: true
    }

    this.openPage         = AppF.openPage.bind(this)
    this.setStateValue    = AppF.setStateValue.bind(this)
    this.filterData       = AppF.filterData.bind(this)
    this.filterChart      = AppF.filterChart.bind(this)
    this.clearFilters     = AppF.clearFilters.bind(this)
    this.loadFile         = this.loadFile.bind(this)
  }

  loadFile(){
    const receivedText = (e) => {
      let lines = e.target.result;
      var newArr = JSON.parse(lines); 
      this.setState({
        ...C.filtersInitialState,
        chartData: {...C.chartDataInitalState},
        data: newArr,
        filtered: newArr,
        paginated: AppF.paginate(newArr, C.rowsOnPage, 0)
      })
    }
  
    if (typeof window.FileReader !== 'function') {
      alert("Чтение файлов не поддерживается вашим браузером");
      return;
    }

    const input = $('#fileInput').get(0);
    const file = input.files[0];
    if(file.type !== 'application/json'){
      alert('Загружен файл неверного типа. Необходимо загрузить файл с расширением JSON')
      return
    }
    const fr = new FileReader();
    fr.onload = receivedText;
    fr.readAsText(file);
  }

  render() {
    const { state, openPage, setStateValue, filterData, filterChart, clearFilters } = this
    const { createDate, changeDate, closeDate, paginated, pageSelected} = state
    const { xAxisLabels, yAxisValues, system, criticalness } = state.chartData
    return (
      <div className="wrapper bg-light">
      <div className = "container-fluid bg-info">
        <h3 className = 'd-inline-block'>Загрузите кастомный JSON:  </h3>
        <input 
            className = 'd-inline form-control-fil'
            type="file"
            id="fileInput"
            onChange = {(event) => console.log(event)}
        />
        <button
          className = 'btn btn-secondary' 
          onClick = {this.loadFile}>Загрузить</button>
      </div>
        <Filters
          options = {options}
          setter  = {setStateValue}
          filterChart = {filterChart}
          dateValues = {{
            startDate:  state.chartData.startDate,
            endDate:    state.chartData.endDate 
          }}
        />
        <div>{
          xAxisLabels.length ? 
          <LineChart
            title       = {system}
            lineName    = {criticalness}
            xAxisLabels = {xAxisLabels}
            yAxisValues = {yAxisValues}
          /> :  <div className = "alert alert-info" role="alert">
                    <strong>Внимание!</strong> Задайте корректные параметры поиска данных для графика
                </div>
        }
        </div>
  
          <Table 
            title           = "Таблица исходных данных"
            options         = {options}
            headrows        = {state.data}
            rows            = {paginated}
            openPage        ={openPage}
            pageCount       = {Math.ceil(state.filtered.length/C.rowsOnPage)}
            pageSelected    = {pageSelected}
            filters         = {{
                                  setStateValue,
                                  clearFilters,
                                  filterData
                              }}
            dateValues      = {{
                                createDate,
                                changeDate,
                                closeDate
                              }}
          />
      </div>
    );
  }
}

export default App;

