import React from "react";
import { Table } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;
const tabs = [
    {
        title: "ИД",
        key: "ID"
    }, {
        title: "Система",
        key: "System"
    }, {
        title: "Описание",
        key: "Summary"
    }, {
        title: "Состояние",
        key: "Состояние"
    }, {
        title: "Найдено при",
        key: "Найдено при"
    }, {
        title: "Критичность",
        key: "Критичность"
    }, {
        title: "Тип Дефекта",
        key: "Тип Дефекта"
    }, {
        title: "Дата создания",
        key: "Дата создания"
    }, {
        title: "Дата изменения",
        key:  "Дата изменения"
    }, {
        title: "Дата закрытия",
        key: "Дата закрытия"
    }, {
        title: "Метод обнаружения",
        key: "Метод обнаружения"
    }, {
        title: "Количество переоткрытий",
        key: "reopens_amount"
    }
];


const DataTable = ({data}) => {
    const mappedData = data.map((row)=>{
        return {
            ...row,
            "Дата закрытия":  new Date(row["Дата закрытия"]).toLocaleDateString(),
            "Дата изменения": new Date(row["Дата изменения"]).toLocaleDateString(),
            "Дата создания":  new Date(row["Дата создания"]).toLocaleDateString(),
        }
    });
    return(
        <Table data={mappedData} autoHeight>
            {
                tabs.map(({title, key}) => (
                        <Column width={150} key={key}>
                            <HeaderCell>{title}</HeaderCell>
                            <Cell dataKey={key} />
                        </Column>
                    )
                )
            }
        </Table>
    )
};

export default DataTable