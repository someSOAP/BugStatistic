import data from './bugs_for_test'

const initialState = {
    originalData: data,
    data,
    table: {
        rowsOnPage: 15,
        currentPage: 1,
    },
    filters: {
        system: {
            value: [],
            options: [],
        },
        severity: {
            value: [],
            options: [],
        },
        discovered: {
            value: [],
            options: [],
        },
        foundAt: {
            value: [],
            options: [],
        },
        defectType: {
            value: [],
            options: [],
        },
        status: {
            value: [],
            options: [],
        },
        dates: {
            value: []
        }
    }
};

export default initialState;
