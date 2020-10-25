import Constant from './constatns'

export class Action {
    public type: Constant;
    public value?: any;


    constructor (
        type: Constant,
        value?: any
    ){
        this.type = type;
        this.value = value;
    };
}


export const setFiltersValue = (value: any) => new Action(Constant.SET_FILTERS_VALUE, value);

export const setFiltersOptions = () => new Action(Constant.SET_FILTERS_OPTIONS);

export const onChangePage = (value: number) => new Action(Constant.SET_PAGE_NUMBER, value);

export const onChangeLength = (value: number) => new Action(Constant.SET_PAGE_LENGTH, value);

export const setActiveTab = (value: string) => new Action(Constant.SET_ACTIVE_TAB, value);


