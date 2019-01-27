//Константные значения, которые переиспользуются в разных модулях
const empty         = "- не выбрано -" // значение - не выбрано - используется в компоненте Select и для сравнения при фильтрации
const rowsOnPage    = 10 //константа отвечает за количество строк отображаемых на странице

const chartDataInitalState = {
    system:       empty,
    criticalness: empty,
    data:         [],
    startDate:    undefined,
    endDate:      undefined,
    xAxisLabels:  [],
    yAxisValues:  []
}

//атрибуты поиска по таблице основных данных
const filtersInitialState = {
    rowID:        undefined,
    system:       empty,
    summary:      undefined,
    status:       empty,
    foundAt:      empty,
    criticalness: empty,
    deffectType:  empty,
    createDate:   { 
                    from:   undefined,
                    to:     undefined
                  },
    changeDate:   { 
                    from:   undefined,
                    to:     undefined
                  },
    closeDate:    { 
                    from:   undefined,
                    to:     undefined
                  },
    findMethod:   empty,
    reopens:      undefined
  }


export { empty, rowsOnPage, filtersInitialState, chartDataInitalState }