export type Filter = {
    value: Array<any>,
    options?: Array<any>,
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
