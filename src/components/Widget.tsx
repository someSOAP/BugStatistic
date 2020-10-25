import React from "react";
import { FormGroup, ControlLabel, FormControl } from 'rsuite'

type WidgetProps = {
    name: string,
    label: string,
    accepter: React.ComponentType<any>,
    [propName: string]: any
}


const Widget : React.FC<WidgetProps> = ({ name, label, accepter, ...props }) => {

    return (
        <FormGroup>
            <ControlLabel>{label} </ControlLabel>
            <FormControl name={name} accepter={accepter} {...props} />
        </FormGroup>
    )
};

export default Widget;
