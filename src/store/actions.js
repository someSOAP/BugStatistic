import * as C from './constatns'


export const paginate = (pageNum) => {
    return {
        type: C.PAGINATE,
        value: pageNum
    }
};

export const setFiltersValue = (value) => {
    return {
        type: C.SET_FILTERS_VALUE,
        value
    }
};
