import React from "react";
import { FormGroup, ControlLabel, FormControl } from 'rsuite'


const Widget = ({ name, label, accepter, ...props }) => {

    return (
        <FormGroup>
            <ControlLabel>{label} </ControlLabel>
            <FormControl name={name} accepter={accepter} {...props} />
        </FormGroup>
    )
};

export default Widget
