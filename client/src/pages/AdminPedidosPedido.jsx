/**
 * Creation Date: 13/01/2024
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

import { useParams } from "react-router-dom";
import NavigationLeft from "../components/AdminPage/NavigationLeft";
import React, { useEffect, useState } from "react";
import db from "../lib/appwrite";
import { Query } from "appwrite";

export default function AdminPedidosPedido() {

    const [OrderData, setOrderData] = useState([])
    const { pedido } = useParams();
    const DBUID = '651ca99af19b7afad3f1';
    const ORDERUID = "652a0331c1f7f4d327ff"

    useEffect(() => {

        db.getDocument(
            DBUID,
            ORDERUID,
            pedido
        )
            .then((res) => {
                setOrderData(res)
            })

    }, [])

    useEffect(() => {
        db.listDocuments(
            DBUID,
            "651ca9adf3de7aad17d9"
        )
    }, [OrderData])
    

    return (
        <div className="AdminPage-DashBoard">
            <NavigationLeft />
            <div className="Content-Pedido-Edit-Page">
                <div className="header-orders">
                    <button onClick={() => {
                        window.location.href = '../pedidos'
                    }}><i className="fa-solid fa-chevron-left"></i></button>
                    <h2>Status da compra</h2>
                </div>
                {OrderData?.Type === 'Pendente' ?
                    <div className="stats-order-pendente">
                        {/* STATUS PENDENTE */}
                        <h1>Em andamento</h1>
                        <p>O pedido está selecionado para pendente.</p>

                    </div> :
                    <div className="stats-order-finalizado">
                        {/* STATUS FINALIZADO*/}
                        <h1>Finalizado</h1>
                        <p>O pedido foi finalizado.</p>
                    </div>
                }
                <div className="pedido-card">
                    
                </div>


            </div>
        </div>
    )
}