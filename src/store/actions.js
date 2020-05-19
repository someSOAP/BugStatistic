import * as C from './constatns'


export const setFiltersValue = (value) => {
    return {
        type: C.SET_FILTERS_VALUE,
        value
    }
};

export const setFiltersOptions = () => {
    return {
        type: C.SET_FILTERS_OPTIONS,
    }
};

export const onChangePage = (value) => ({
    type: C.SET_PAGE_NUMBER,
    value
});

export const onChangeLength = (value) => ({
    type: C.SET_PAGE_LENGTH,
    value
});

export const filterData = () => ({
    type: C.FILTER_DATA,
});
