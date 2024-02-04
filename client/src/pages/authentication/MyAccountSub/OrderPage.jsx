import { useParams } from "react-router-dom";
import NavigationBarLeft from "../../../components/AuthPage/NavigationBarLeft"
import Header from "../../../components/Header"
import { GetUserAtual, getPedidos } from "../../../lib/database";
import { auth } from "../../../lib/firebase";
import React, { useEffect, useState } from "react";
import OrderStatus from "../../../components/MyAccount/OrderStatus";

const OrderPage = () => {

    const [userAtual, setuserAtual] = useState([]);
    const { pedidoID } = useParams();
    const [pedidoAtual, setPedidoAtual] = useState(null);

    const [usuarioPedido, setUsuarioPedido] = useState(null);
    const [addressPedido, setaddressPedido] = useState(null);
    const [itemsPedido, setitemsPedido] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const res = await GetUserAtual(user.uid);
                    setuserAtual(res);

                    const pedidos = await getPedidos();
                    const pedidoSelecionado = pedidos.find((pedido) => pedido.id == pedidoID);
                    setPedidoAtual(pedidoSelecionado);

                    setUsuarioPedido(JSON.parse(pedidoSelecionado.user));
                    setaddressPedido(JSON.parse(pedidoSelecionado.address));
                    setitemsPedido(JSON.parse(pedidoSelecionado.items));

                    const userOd = JSON.parse(pedidoSelecionado.user);
                    const emailUserOrder = userOd.email;

                    if (res.email != emailUserOrder) {
                        window.location.href = window.location.origin
                    }


                } catch (error) {
                    console.warn("Erro ao pegar usuário: ", error);
                }
            } else {
                setuserAtual(null); // No user is logged in
            }
        });

        return () => unsubscribe(); // Cleanup the subscription when the component unmounts
    }, []);

    return (
        <React.Fragment>
            <Header />
            <div className="myaccount--page">
                <NavigationBarLeft />
                <div className="myaccount--section-content">
                    <h1>Pedido: N#{pedidoID}</h1>
                    <p>Veja o status do seu pedido</p>
                    <div className="orders-show-block">
                        <div className="orders-show-content">
                            {usuarioPedido && addressPedido &&
                                <React.Fragment>
                                    <OrderStatus
                                        state={pedidoAtual.state}
                                    />
                                    <div className="spacer-title">
                                        <h2></h2>
                                    </div>
                                    <div classname="user-order">
                                        <h2>{usuarioPedido.nome_completo}</h2>
                                        <p>{usuarioPedido.email}</p>
                                    </div>
                                    <div className="spacer-title">
                                        <h2>Endereço De Entrega</h2>
                                    </div>
                                    <div className="address-order">
                                        <p>{addressPedido.endereço} {addressPedido.numero}</p>
                                        <p>{addressPedido.bairro}</p>
                                        <p>{addressPedido.cidade} - {addressPedido.estado}</p>
                                    </div>
                                    <div className="spacer-title">
                                        <h2>Resumo do pedido</h2>
                                    </div>
                                    <div className="items-order">
                                        <div className="spacer-title">
                                            <h3>Subtotal: R${pedidoAtual.subtotal.toFixed(2)}</h3>
                                            <h3>Descontos: R${pedidoAtual.desconto.toFixed(2)}</h3>
                                            <h2>Total: R${pedidoAtual.order_totalprice.toFixed(2)}</h2>
                                            <h4>Número de items: {itemsPedido.length}</h4>
                                        </div>
                                        <div className="list-items">
                                            {itemsPedido.map((item) => {
                                                return (
                                                    <div className="item-wrapper-order">
                                                        <div className="item-wrapper-left-side">
                                                            <img src={item.photoURL} />
                                                        </div>
                                                        <div className="item-wrapper-right-side">
                                                            <h2>{item.name}</h2>
                                                            <p>Código: {item.id}</p>
                                                            <p>Tamanho: {item.tamanho}</p>
                                                            <h5>Quantidade: {item.qtd}</h5>
                                                            {item.desconto > 0 &&
                                                                <h5>Descontos: R$ {item.desconto.toFixed(2)}</h5>
                                                            }
                                                            <h5>Subtotal: R$: {(item.preco).toFixed(2)}</h5>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </React.Fragment>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default OrderPage