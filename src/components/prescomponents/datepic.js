import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";


const DatePic = ({selected, onChange = f=>f, placeholder = ''}) => {
    return <DatePicker 
                onChange    = {onChange}
                selected    = {selected}
                dateFormat  ="dd.MM.yyyy"
                showMonthDropdown
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={5}
                placeholderText = {placeholder}
            />
        
} 
export default DatePic