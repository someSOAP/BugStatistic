import * as C from "./constatns";

const tableReducerMapper = [
    {
        table: "System",
        reducer: "system"
    }, {
        table: "Критичность",
        reducer: "severity"
    }, {
        table: "Метод обнаружения",
        reducer: "discovered"
    }, {
        table: "Найдено при",
        reducer: "foundAt"
    }, {
        table: "Тип Дефекта",
        reducer: "defectType"
    }, {
        table: "Состояние",
        reducer: "status"
    }
];


const filterData = (originalData, filters) => {

    const { dates } = filters;

    debugger;
    return originalData.filter((row) => {
        const inFiltersValues = tableReducerMapper.reduce((result, {table, reducer})=>{
            return result && (filters[reducer].value.length ? filters[reducer].value.includes(row[table]) : true);
        }, true);

        const createDate = new Date(row["Дата создания"]);
        const inDates = (dates.value && dates.value.length) ? (createDate >= dates.value[0] && createDate <= dates.value[1]) : true;

        return inFiltersValues && inDates;
    });

};



const setFiltersValue = (state, filters) => {
    const newFilters = {...state.filters};
    Object.keys(filters).forEach((key)=>{
        newFilters[key].value = filters[key]
    });

    return {
        ...state,
        filters: newFilters,
        data: filterData(state.originalData, newFilters)
    }
};

const setFiltersOptions = (state) => {
    const options = state.data.reduce((values, row)=>{
        tableReducerMapper.forEach(({table, reducer})=>{
            if(!values[reducer].includes(row[table])) values[reducer].push(row[table]);
        });
        return values
    }, {
        system: [],
        severity: [],
        discovered:[],
        foundAt: [],
        defectType: [],
        status: []
    });

    const newFilters = Object.keys(options).reduce((filters, key)=>{
        filters[key].options = options[key].map(it => ({label: it, value: it}));
        return filters;
    }, {...state.filters});

    return {...state, filters: newFilters}
};

const reducer = (state, {type, value}) => {
    switch (type) {

        case C.SET_FILTERS_VALUE:
            return setFiltersValue(state, value);

        case C.SET_FILTERS_OPTIONS:
            return setFiltersOptions(state);

        case C.SET_PAGE_NUMBER:
            return {
                ...state,
                table: {
                    ...state.table,
                    currentPage: value,
                },
            };

        case C.SET_PAGE_LENGTH:
            return {
                ...state,
                table: {
                    ...state.table,
                    rowsOnPage: value,
                },
            };

        case C.SET_ACTIVE_TAB:
            return {
                ...state,
                activeTab: value
            };

        default:
            return state;
    }
};

export default reducer;
