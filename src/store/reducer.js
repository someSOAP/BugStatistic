import { PAGINATE, SET_FILTERS_VALUE } from "./constatns";


const paginate = (state, value) => {
    const { rowsOnPage } = state.table;
    return {
        ...state,
        table: {
            ...state.table,
            pageData: state.data.slice(value * rowsOnPage, (value + 1) * rowsOnPage)
        },
    }
};

const reducer = (state, {type, value}) => {
    switch (type) {

        case PAGINATE:
            return paginate(state, value);

        case SET_FILTERS_VALUE:
            return {
                ...state,
                filters: value
            };

        default:
            return state;
    }
};

export default reducer;
