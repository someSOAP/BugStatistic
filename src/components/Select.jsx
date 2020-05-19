import React from 'react'
import { SelectPicker } from "rsuite";
import { EMPTY } from "../store/constatns";
import WidgetWrapper from "./WidgetWrapper";


//компоненты выпадающий список. По умолчанию содержит значение "- не выбрано -" и остальные, которые в него подаём через props
const Select = ({ options = [], title, onSelect =f=>f }) => {
    const data = [{
            label: EMPTY,
            value: EMPTY,
        },
        ...options.map((option)=>({label: option, value: option}))
    ];
    return(
        <WidgetWrapper title={title}>
            <SelectPicker data={data} block/>
        </WidgetWrapper>
    )
};

export default Select
