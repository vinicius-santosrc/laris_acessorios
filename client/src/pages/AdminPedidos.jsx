import React, { useEffect, useState } from "react";
import NavigationLeft from "../components/AdminPage/NavigationLeft";
import db, { getUserData } from "../lib/appwrite";
import { Query } from "appwrite";
import { getPedidos, getUser, GetUserAtual } from "../lib/database";
import Loading from "../components/AdminPage/Loading";
import { auth, CheckIfUserIsLogged } from "../lib/firebase";

export default function AdminPedidos() {
    const [user, setUser] = useState(null)
    const [status, userStatus] = useState(null)
    const [userDB, setUserDBAccount] = useState([])

    const [Orders, setOrders] = useState([])

    const [Info, setInfoOn] = useState(false)
    const [infoPedido, setInfoPedido] = useState(null)

    const endpoint = process.env.REACT_APP_API_ENDPOINT;
    //const endpoint = process.env.REACT_APP_API_ENDPOINT_TEST;
    const secretKey = process.env.REACT_APP_API_SECRET_KEY

    

    useEffect(() => {
        setTimeout(() => {
            async function takeOrders() {
                try {
                    const res = await getPedidos();

                    setOrders(res.map((response) => {

                        const userOrder = JSON.parse(response.user);
                        const endereco = JSON.parse(response.address);
                        const items = JSON.parse(response.items);

                        async function handleAddress() {
                            setInfoOn(true)
                            setInfoPedido(endereco);
                        }

                        async function handleDelete() {
                            await fetch(`${endpoint}/api/v1/${secretKey}/orders/delete`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    id: response.id
                                })
                            }
                            )
                                .then((res) => {
                                    takeOrders()
                                })
                        }

                        async function handleEditState() {

                        }

                        return (
                            <tr className="order_card" id={response.$id} title={"Pedido " + response.id} key={response.id}>
                                <td>{response.id}</td>
                                <td>{userOrder.nome_completo}</td>
                                <td>{userOrder.email}</td>
                                <td>{userOrder.cpf}</td>
                                <td className="photos">
                                    {items.map((res) => {
                                        return <div title={res.name} className="item-content-table" key={res.item}>
                                            <img alt={res.name} src={res.photoURL} />
                                        </div>
                                    })}
                                </td>
                                <td>
                                    <React.Fragment>
                                        <button onClick={handleAddress}><span><i className="fa-solid fa-truck-fast"></i></span></button>
                                    </React.Fragment>
                                </td>
                                <td>{response.state}</td>
                                <td>{response.paymentOption}</td>
                                <td>R$ {response.desconto.toFixed(2)}</td>
                                <td>R$ {response.cupom_desconto.toFixed(2)}</td>
                                <td>R$ {response.subtotal.toFixed(2)}</td>
                                <td>R${response.order_totalprice.toFixed(2)}</td>
                                <td>
                                    <button onClick={handleEditState}><i className="fa-solid fa-pencil"></i></button>
                                    <button onClick={handleDelete}><i className="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                        )
                    }))
                }
                catch (error) {
                    console.error(error)
                }

            }

            takeOrders()
        }, 2000);

    })
    const [pageClosed, setPageClosed] = useState(false)

    const [userAtual, setuserAtual] = useState([]);

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
                return
            } else {
                return window.location.href = window.location.origin + "/admin/login";
            }
        });

        return () => unsubscribe();
    }, []);

    if (!userAtual) {
        return <Loading />

    }

    return (
        <div className="AdminPage-DashBoard">
            <NavigationLeft />
            <div className="Content-Orders-Page">
                <h2 className="title-section">
                    Pedidos Recentes
                </h2>
                <div className="list-pedidos">
                    {Info &&
                        <div className="fixed-information-addres-pedido">
                            <div className="information-address">
                                <div className="title-info-address">
                                    <h1><i className="fa-solid fa-truck-fast"></i> Endereço para entrega:</h1>
                                    <button onClick={() => { setInfoOn(false); setInfoPedido(null) }}><span><i class="fa-solid fa-xmark"></i></span></button>
                                </div>
                                <div className="table-address">
                                    <h3>Cidade: {infoPedido.cidade} - {infoPedido.estado}</h3>
                                    <h3>Endereço: {infoPedido.endereço} - {infoPedido.numero}</h3>
                                    <h3>Bairro: {infoPedido.bairro}</h3>
                                    <h4>Referência: {infoPedido.referencia}</h4>
                                </div>
                            </div>
                        </div>
                    }
                    <table>
                        <tr>
                            <td>ID</td>
                            <td>Nome Completo</td>
                            <td>E-mail</td>
                            <td>Cpf</td>
                            <td>Pedido: </td>
                            <td>Endereço: </td>
                            <td>Estado Atual: </td>
                            <td>Pagamento: </td>
                            <td>Desconto: </td>
                            <td>Cupons: </td>
                            <td>Subtotal: </td>
                            <td>Total: </td>
                            <td>Ações: </td>
                        </tr>
                        {Orders}
                    </table>
                </div>
            </div>
        </div>
    )
}