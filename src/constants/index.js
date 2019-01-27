const empty         = "- не выбрано -"
const rowsOnPage    = 10

const chartDataInitalState = {
    system:       empty,
    criticalness: empty,
    data:         [],
    startDate:    undefined,
    endDate:      undefined,
    xAxisLabels:  [],
    yAxisValues:  []
}
const filtersInitialState = {
    //атрибуты поиска по таблице основных данных
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