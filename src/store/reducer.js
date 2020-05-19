import { SET_FILTERS_VALUE, SET_FILTERS_OPTIONS, SET_PAGE_NUMBER } from "./constatns";

const setFiltersValue = (state, filters) => {
    const newFilters = {...state.filters};
    Object.keys(filters).forEach((key)=>{
        newFilters[key].value = filters[key]
    });

    return {...state, filters: newFilters}
};

const setFiltersOptions = (state) => {
    const options = state.data.reduce((values, row)=>{
        if(!values.system.includes(row["System"])) values.system.push(row["System"]);
        if(!values.severity.includes(row["Критичность"])) values.severity.push(row["Критичность"]);
        if(!values.discovered.includes(row["Метод обнаружения"])) values.discovered.push(row["Метод обнаружения"]);
        if(!values.foundAt.includes(row["Найдено при"])) values.foundAt.push(row["Найдено при"]);
        if(!values.defectType.includes(row["Тип Дефекта"])) values.defectType.push(row["Тип Дефекта"]);
        if(!values.defectType.includes(row["Состояние"])) values.status.push(row["Состояние"]);
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

        default:
            return state;
    }
};

export default reducer;
