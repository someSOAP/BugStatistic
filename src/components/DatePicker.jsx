import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import WidgetWrapper from "./WidgetWrapper";

const CustomDatePicker = ({selected, title, onChange = f=>f, placeholder = ''}) => {
    return (
        <WidgetWrapper title = {title}>
            <DatePicker
                onChange                = {onChange}
                selected                = {selected}
                dateFormat              = "dd.MM.yyyy"
                todayButton             = {"Сегодня"}
                dropdownMode            = "select"
                className               = "form-control"
                yearDropdownItemNumber  = {5}
                isClearable             = {true}
                placeholderText         = {placeholder}
                showMonthDropdown
                showYearDropdown
                scrollableYearDropdown
            />
        </WidgetWrapper>
    )
};
export default CustomDatePicker
