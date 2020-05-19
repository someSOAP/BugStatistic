import data from './bugs_for_test'

const initialState = {
    data,
    filteredData: [],
    table: {
        rowsOnPage: 15,
        currentPage: 0,
        pageData: []
    },
    filters: {
        system: [],
        severity: [],
        dates: []
    }
};

export default initialState;
