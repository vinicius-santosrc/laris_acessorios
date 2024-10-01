/**
 * Creation Date: 14/01/2024
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

import React, { useEffect, useState } from "react"
import Header from "../../../components/Header"
import { CheckIfUserIsLogged, auth } from "../../../lib/firebase";
import { GetUserAtual, getPedidos } from "../../../lib/database";
import { Link } from 'react-router-dom'
import NavigationBarLeft from "../../../components/AuthPage/NavigationBarLeft";

const Orders = () => {

    const [userAtual, setuserAtual] = useState([]);
    const [allOrders, setAllOrders] = useState([]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const res = await GetUserAtual(user.uid);
                    setuserAtual(res);
                } catch (error) {
                    console.warn("Erro ao pegar usuário: ", error);
                }
            } else {
                setuserAtual(null);
            }
        });



        return () => unsubscribe(); 
    }, []);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (CheckIfUserIsLogged()) {
                async function fetchAllOrders() {
                    try {
                        const res = await getPedidos();

                        const filteredOrders = res.filter((item) => {
                            const user = JSON.parse(item.user);
                            return user.uid == auth.currentUser.uid;
                        });

                        console.log(filteredOrders)
                        setAllOrders(filteredOrders.reverse());
                    } catch (error) {
                        console.error("Erro ao buscar os pedidos:", error);
                    }
                }

                fetchAllOrders();
            } else {
                return window.location.href = window.location.origin;
            }
        });

        return () => unsubscribe();
    }, []);


    window.document.title = "LARIS-ACESSORIOS: Minha conta"

    return (
        <React.Fragment>
            <Header />
            <div className="myaccount--page">
                <NavigationBarLeft />
                <div className="myaccount--section-content">
                    <h1>Pedidos</h1>
                    <p>Veja todos os seus pedidos realizados.</p>
                    <div className="orders-show-block">
                        <h1>Todos os pedidos:</h1>
                        <div className="orders-show-content">
                            {allOrders.map((order) => {

                                const orderADDRESS = JSON.parse(order.address)
                                const orderITEMS = JSON.parse(order.items)
                                const orderUSER = JSON.parse(order.user)

                                return (
                                    <Link to={window.location.origin + "/accounts/myaccount/orders/" + order.id}>
                                        <div className="order-content-item-box">
                                            <div className="order-left-side-item">
                                                <img src={orderITEMS[0].photoURL} />
                                            </div>
                                            <div className="order-right-side-item">
                                                <h5>{orderITEMS.length} produtos</h5>
                                                <h3>Pedido N#{order.id}</h3>
                                                <p>{orderUSER.nome_completo}</p>
                                                <p>Total: R${(order.order_totalprice).toFixed(2)}</p>
                                            </div>
                                            <div className="orders-buttons-interact">
                                                <button><span>AJUDA</span></button>
                                                <button><span>DETALHES</span></button>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Orders