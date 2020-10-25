// @ts-ignore
import data from './bugs_for_test'
import { State } from './model'

const initialState: State = {
    originalData: data,
    data,
    activeTab: "data",
    table: {
        rowsOnPage: 15,
        currentPage: 1,
    },
    chart: {

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
