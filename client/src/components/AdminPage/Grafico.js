import React, { useEffect, useState } from "react";
import ApexChart from 'react-apexcharts';

const GraficoPrecos = ({ valores }) => {
    const [ultimoValor, setUltimoValor] = useState(0)
    const [dataValue, setDataValue] = useState([])

    useEffect(() => {
        setDataValue(valores.map((item, index) => {
            let newY;

            if (item.tipo === "Receita") {
                if (index === 0) {
                    newY = item.valor;
                } else {
                    newY = ultimoValor + item.valor;
                }
            } else {
                if (index === 0) {
                    newY = item.valor;
                } else {
                    newY = ultimoValor - item.valor;
                }
            }
            return { x: new Date(item.created_at).getTime(), y: newY };
        }))
    }, [])

    const options = {
        xaxis: {
            type: "datetime"
        },
        yaxis: {
            tooltip: {
                enabled: true
            }
        }
    };

    const series = [
        {
            data: dataValue
        }
    ];

    return (
        <ApexChart
            options={options}
            series={series}
            type="area"
            width={640}
            height={400}
        />
    );
};

export default GraficoPrecos;
