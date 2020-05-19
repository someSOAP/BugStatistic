import { SET_FILTERS_VALUE, SET_FILTERS_OPTIONS, SET_PAGE_NUMBER, SET_PAGE_LENGTH, FILTER_DATA } from "./constatns";

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

    return originalData.filter((row) => {
        return tableReducerMapper.reduce((result, {table, reducer})=>{
            return result && (filters[reducer].value.length ? filters[reducer].value.includes(row[table]) : true);
        }, true)
    })
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

        case SET_FILTERS_VALUE:
            debugger;
            return setFiltersValue(state, value);

        case SET_FILTERS_OPTIONS:
            return setFiltersOptions(state);

        case SET_PAGE_NUMBER:
            return {
                ...state,
                table: {
                    ...state.table,
                    currentPage: value,
                },
            };

        case SET_PAGE_LENGTH:
            debugger;
            return {
                ...state,
                table: {
                    ...state.table,
                    rowsOnPage: value,
                },
            };

        case FILTER_DATA:
            return filterData(state);

        default:
            return state;
    }
};

export default reducer;
