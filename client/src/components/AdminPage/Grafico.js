/**
 * Creation Date: 09/01/2024
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

import React, { useEffect, useState } from "react";
import ApexChart from 'react-apexcharts';

const GraficoPrecos = ({ valores }) => {
    const [dataValue, setDataValue] = useState([]);

    useEffect(() => {
        let currentUltimoValor = 0;
    
        const newDataValue = valores.map((item, index) => {
            let newY;
    
            if (item.tipo === "Receita") {
                if (index === 0) {
                    newY = item.valor;
                } else {
                    newY = currentUltimoValor + item.valor;
                }
            } else {
                if (index === 0) {
                    newY = item.valor;
                } else {
                    newY = currentUltimoValor - item.valor;
                }
            }
    
            currentUltimoValor = newY;
    
            const adjustedTime = new Date(item.created_at).getTime() - 3 * 60 * 60 * 1000;
    
            return { x: adjustedTime, y: newY };
        });
    
        setDataValue(newDataValue);
    }, [valores]);
    


    const options = {
        xaxis: {
            type: "datetime",
        },
        yaxis: {
            tooltip: {
                enabled: true
            }
        },
        stroke: {
            width: 2
        },
        title: {
            text: "Saldo atual - LARIS ACESSÓRIOS",
            align: "left"
          },
        colors: ['#EC57B1', '#EC57B1', '#EC57B1'],
        fill: {
            colors: ['#EC57B1', '#EC57B1', '#EC57B1']
        },
        dataLabels: {
            style: {
                colors: ['#EC57B1', '#EC57B1', '#EC57B1']
            }
        }
    };

    const series = [
        {
            name: "Saldo (R$)",
            data: dataValue
        }
    ];

    return (
        <div className="graphic-Component">
            <ApexChart
                options={options}
                series={series}
                type="area"
                width={"100%"}
                height={400}
            />
        </div>
    );
};

export default GraficoPrecos;
