export type FilterOption = {
    label: string,
    value: string | number,
}

export type Filter = {
    value: Array<FilterOption | Date> ,
    options?: Array<FilterOption>,
}

export type Table = {
    rowsOnPage: number,
    currentPage: number,
}

export type Filters = {
    [filterName: string]: Filter
}

export type State = {
    originalData: Array<any>,
    data: Array<any>,
    activeTab: string,
    table: Table,
    chart: any,
    filters: Filters,
}
