import React, { useEffect, useState } from "react";
import NavigationLeft from "../components/AdminPage/NavigationLeft";
import db, { getUserData } from "../lib/appwrite";
import { Query } from "appwrite";

export default function AdminPedidos() {
    const [user, setUser] = useState(null)
    const [status, userStatus] = useState(null)
    const [userDB, setUserDBAccount] = useState([])

    const [Orders, setOrders] = useState([])

    useEffect(() => {
        getUserData()
            .then((account) => {

                setUser(account)
                userStatus(account.status ? 'Online' : 'Offline')
                db.getDocument(
                    "651ca99af19b7afad3f1",
                    "652102213eeea3189590",
                    account.$id
                )
                    .then((r) => {
                        setUserDBAccount(r)
                    })

                if (!account) {
                    window.location.href = window.location.origin + "/admin/login"
                }
            })
        db.listDocuments(
            "651ca99af19b7afad3f1",
            "652a0331c1f7f4d327ff",
            [
                Query.orderDesc("$createdAt")
            ]
        )
            .then((r) => {
                setOrders(r.documents.map((response) => {
                    return (
                        <div className="order_card" id={response.$id} title={"Pedido " + response.order_number} key={response.$id}>
                            <a href={window.location.origin + "/admin/pedidos/" + response.$id}>
                                <div className="order_number">
                                    {response.Type == 'Pendente' ? <p id="pendente-id">Pendente</p> : <>{response.Type == 'Finalizado' ? <p id="finalizado-id">Finalizado</p> : null}</>}
                                    <h2><i className="fa-solid fa-box-archive"></i> Pedido: N{response.order_number}</h2>
                                </div>
                                <div className="order_middle">
                                    <p>Nome: {response.order_name}</p>
                                    <p>Email: {response.order_email}</p>
                                    <p>Telefone: {response.order_tel}</p>
                                </div>
                            </a>
                        </div>
                    )
                }))
            })
            .catch((e) => {
                console.log(e)
            })

    }, [])

    return (
        <div className="AdminPage-DashBoard">
            <NavigationLeft />
            <div className="Content-Orders-Page">
                <h2 className="title-section">
                    Pedidos Recentes
                </h2>
                <div className="list-pedidos">
                    {Orders}
                </div>
            </div>
        </div>
    )
}