import React, { Component } from 'react';
import Table                from './components/prescomponents/table'
import Filters              from './components/filters'
import * as AppF            from "./functions/appfunctions"; 
import * as C               from './constants/'
import LineChart            from './components/chart'

const data = require('./data/bugs_for_test.json')
window.sber_data = data     //для отладки данных через браузерную консоль

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
      createDate:   { value:  undefined,
                      from:   undefined,
                      to:     undefined
                    },
      changeDate:   { value:  undefined,
                      from:   undefined,
                      to:     undefined
                    },
      closeDate:    { value:  undefined,
                      from:   undefined,
                      to:     undefined
                    },
      findMethod:   C.empty,
      reopens:      undefined
    }

    this.openPage         = AppF.openPage.bind(this)
    this.setStateValue    = AppF.setStateValue.bind(this)
    this.filterData       = AppF.filterData.bind(this)
    this.filterChart      = AppF.filterChart.bind(this)
    this.clearFilters     = AppF.clearFilters.bind(this)
  }


  render() {
    const { state, openPage, setStateValue, filterData, filterChart, clearFilters } = this
    const { createDate, changeDate, closeDate, paginated, pageSelected} = state
    const { xAxisLabels, yAxisValues, system, criticalness } = state.chartData
    return (
      <div className="wrapper bg-light">
      {/* <input 
          type="file"
          class="form-control-file"
          id="exampleFormControlFile1"
          onChange = {(event) => console.log(event)}
      /> */}
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

