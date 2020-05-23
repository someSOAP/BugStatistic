import React from 'react';
import { Line } from 'react-chartjs-2'

const dataSetColors = [
    "rgb(255, 159, 64)",
    "rgb(255, 99, 132)",
    "rgb(75, 192, 192)",
    "rgb(54, 162, 235)",
    "rgb(255, 205, 86)",
    "rgb(153, 102, 255)"
];

const getRandomRgb = () => {
    const num = Math.round(0xffffff * Math.random());
    const r = num >> 16;
    const g = num >> 8 & 255;
    const b = num & 255;
    return `rgb(${r},${g},${b})`;
};

const Chart = ({data}) => {
    const chartData = data.reduce((data, row)=>{
        const createDate = new Date(row["Дата создания"]);
        const localCreateDate = createDate.toLocaleDateString();
        if(!data.labels.includes(localCreateDate)){
            data.labels.push(localCreateDate);
        }

        const system = row["System"];

        if(!data.datasets[system]){
            const datasetIndex = Object.keys(data.datasets).length;
            const color = dataSetColors[datasetIndex] ? dataSetColors[datasetIndex] : getRandomRgb();
            data.datasets[system] = {
                label: system,
                backgroundColor: color,
                borderColor: color,
                fill: false,
                data: {}
            }
        }

        if(!data.datasets[system].data[localCreateDate]){
            data.datasets[system].data[localCreateDate] = {x: createDate, y: 0}
        }

        data.datasets[system].data[localCreateDate].y+=1;

        return data;
    }, {
        labels: [],
        datasets: {}
    });
    chartData.datasets = Object.values(chartData.datasets);
    chartData.datasets.forEach((dataset)=>{
        dataset.data = Object.values(dataset.data);
    });

    return (
        <Line
            data = {chartData}
        />
    )
};

export default Chart;
