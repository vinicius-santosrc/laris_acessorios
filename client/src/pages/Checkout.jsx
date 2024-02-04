import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Ring } from "@uiball/loaders";
import Swal from "sweetalert2";
import * as emailjs from "@emailjs/browser"
import db from "../lib/appwrite";
import { ID } from "appwrite";
import { CheckIfUserIsLogged, auth } from "../lib/firebase";
import { GetUserAtual } from "../lib/database";

export default function Checkout() {

    const [sacolaAt, setSacolaAtual] = useState([]);
    const [exportSacola, setExportSacola] = useState([]);
    const [exportSacolaMobile, setExportSacolaMobile] = useState([]);
    let [precototal, setprecototal] = useState(null)
    let [subtotal, setsubtotal] = useState(null)
    let [desconto, setdescontos] = useState(null)

    const [usuarioAtual, setusuarioAtual] = useState(null);

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [telefone, setTelefone] = useState(null);

    const [cep, setCEP] = useState(null);
    const [estado, setEstado] = useState(null);
    const [cidade, setcidade] = useState(null);
    const [bairro, setbairro] = useState(null);
    const [endereco, setendereco] = useState(null);
    const [numero, setnumero] = useState(null);
    const [referencia, setreferencia] = useState(null);

    const endpoint = process.env.REACT_APP_API_ENDPOINT;
    //const endpoint = process.env.REACT_APP_API_ENDPOINT_TEST;
    const secretKey = process.env.REACT_APP_API_SECRET_KEY;

    useEffect(() => {
        document.querySelector("title").innerText = "Finalizar compra";

    }, [])

    useEffect(() => {
        searchByUserAtual()

    }, [auth.currentUser])

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (CheckIfUserIsLogged()) {
                return
            } else {
                return window.location.href = window.location.origin + "/accounts/login?=afterRedirectCheckout";
            }
        });

        return () => unsubscribe();
    }, []);



    useEffect(() => {

        setSacolaAtual(JSON.parse(localStorage.getItem("sacola")));
        if (Array.isArray(sacolaAt)) {
            setExportSacola(
                sacolaAt.map((item, index) => {
                    if (index == 0) {
                        return (
                            <>
                                <tr class="top-list-cart">
                                    <td><label>PRODUTO</label></td>
                                    <td><label>PREÇO</label></td>
                                    <td><label>DESCONTO</label></td>
                                    <td><label>QUANTIDADE</label></td>
                                    <td><label>TOTAL</label></td>
                                </tr>
                                <tr className="product-item" key={index}>
                                    <td className="product-card">
                                        <img src={item.photoURL} alt={item.name} />
                                        <a href={item.onclick}>{item.name} {item.personalizacao ? <>({item.personalizacao})</> : ""}</a>
                                    </td>
                                    <td>
                                        <p>R$ {item.preco.toFixed(2)}</p>
                                    </td>
                                    <td>
                                        <p>R$ {item.desconto.toFixed(2)}</p>
                                    </td>
                                    <td>
                                        <select disabled>
                                            <option selected value={item.preco.toFixed(2)}>
                                                {item.qtd}
                                            </option>
                                        </select>
                                    </td>
                                    <td>
                                        <p>R$ {(item.preco - item.desconto).toFixed(2)}</p>
                                    </td>
                                </tr>
                            </>
                        );
                    }
                    return (
                        <tr className="product-item" key={index}>
                            <td className="product-card">
                                <img src={item.photoURL} alt={item.name} />
                                <a href={item.onclick}>{item.name}</a>
                            </td>
                            <td>
                                <p>R$ {item.preco.toFixed(2)}</p>
                            </td>
                            <td>
                                <p>R$ {item.desconto.toFixed(2)}</p>
                            </td>
                            <td>
                                <select disabled>
                                    <option selected value={item.preco.toFixed(2)}>
                                        {item.qtd}
                                    </option>
                                </select>
                            </td>

                            <td>
                                <p>R$ {(item.preco - item.desconto).toFixed(2)}</p>
                            </td>
                        </tr>
                    );
                })
            )
            setExportSacolaMobile(
                sacolaAt.map((item, index) => {
                    function removeTarefaCart() {
                        const sacola = JSON.parse(localStorage.getItem('sacola')) || []
                        sacola.splice(index, 1)
                        localStorage.setItem('sacola', JSON.stringify(sacola))

                    }
                    return (
                        <div class="product-item-card">
                            <div class="product-item-image">
                                <img src={item.photoURL} />
                            </div>
                            <div class="product-item-info">
                                <div class="product-item-info-title">
                                    <div>
                                        <a style={{ color: 'black' }} onclick="window.location.href='${item.onclick}'">{item.name} {item.personalizacao ? <>({item.personalizacao})</> : ""}</a>
                                        <p style={{ color: 'gray', fontSize: '2.9vw' }}>Produto fornecido e entregue pela LARI'S</p>
                                    </div>
                                    <a class="material-icons" onClick={removeTarefaCart}>
                                        <i class="fa-solid fa-trash-can"></i>
                                    </a>
                                </div>
                                <div class="product-item-info-qtd">
                                    <div>
                                        <select disabled>
                                            <option value="${item.qtd}" selected>{item.qtd}</option>
                                        </select>
                                    </div>
                                    <div>
                                        {item.desconto > 0
                                            ?
                                            <h2><s style={{ color: "gray" }}>R$ {item.preco.toFixed(2)}</s> R$ {(item.preco - desconto).toFixed(2)}</h2>
                                            :
                                            <h2>R$ {item.preco}</h2>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            )
        }
    });

    useEffect(() => {
        if (Array.isArray(sacolaAt)) {
            let preco = 0
            let sub = 0
            let desc = 0
            sacolaAt.map((item, index) => {
                preco += item.preco - item.desconto
                sub += item.preco
                desc += item.desconto
            })
            setprecototal(preco)
            setsubtotal(sub)
            setdescontos(desc)
        }
    })

    async function searchByUserAtual() {

        try {
            if (auth.currentUser) {
                const res = await GetUserAtual(auth.currentUser.uid);
                setusuarioAtual(res);

            }

        }
        catch (error) {
            console.log("ERRO AO BUSCAR USUARIO ATUAL")

        }
    }

    async function finalizartudo() {

        if(!usuarioAtual || !endereco || !cidade || !bairro || !estado || !cep || !referencia || !numero || !telefone) {
            return
        }

        try {
            //VERIFICAÇÃO DE DADOS

            const dadosPedido = {
                "usuario": usuarioAtual,
                "produtos": sacolaAt,

            };

            const enderecoPedido = {
                "endereço:": endereco,
                "bairro": bairro,
                "cidade": cidade,
                "estado": estado,
                "cep": cep,
                "referencia": referencia,
                "numero": numero
            }

            //FORMAS DE PAGAMENTO



            //CRIAR PEDIDO NO BANCO DE DADOS

            await fetch(`${endpoint}/api/v1/${secretKey}/orders/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    address: JSON.stringify(enderecoPedido),
                    items: JSON.stringify(dadosPedido.produtos),
                    user: JSON.stringify(dadosPedido.usuario),
                    totalprice: precototal,
                    paymentOption: 'PIX',
                    situation: 'PAGO',
                    desconto: desconto,
                    subtotal: subtotal
                }),
            })

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `Pedido realizado com sucesso.`,
                showConfirmButton: false,
                timer: 2500
            })
        }
        catch (error) { //MENSAGEM DE SUCESSO OU ERRO.
            console.error("Erro ao criar pedido:", error)
        }
    }



    if (localStorage.getItem("sacola") != '[]') {

        return (
            <section className="laris-checkout-page">
                <span class="loader"><span class="loader-inner"></span></span>
                <div class='background-load'></div>
                <Header />
                <div class='itensresumo'>

                    <div class='seu-carrinho'>
                        <h1>Resumo do pedido </h1>
                        <table class='itens-cart'>
                            {exportSacola != '' ?
                                <>{exportSacola}</>
                                :
                                <Ring
                                    size={40}
                                    lineWeight={5}
                                    speed={2}
                                    color="#EF59A0"
                                />
                            }
                        </table>

                    </div>
                    <div class='seu-carrinho-mobile'>
                        <h1><i class="fa-solid fa-bag-shopping"></i> Seus produtos </h1>

                        <table class='itens-cart'>


                            <>
                                {exportSacolaMobile != '' ?
                                    <>{exportSacolaMobile}</>
                                    :
                                    <Ring
                                        size={40}
                                        lineWeight={5}
                                        speed={2}
                                        color="#EF59A0"
                                    />
                                }
                            </>

                        </table>

                    </div>

                    {usuarioAtual &&
                        <React.Fragment>
                            <div class='dados-pessoais'>
                                <h1><i class="fa-solid fa-person-dress"></i> Dados pessoais</h1>
                                <div class="inputbox">
                                    <p>Email:</p><input type="email" id='Email' placeholder="" required disabled value={usuarioAtual.email ? usuarioAtual.email : null} />
                                    <p>Nome:</p><input type="text" id='primeironome' placeholder="" required disabled value={usuarioAtual.nome_completo ? usuarioAtual.nome_completo : null} />
                                    <p>CPF:</p><input type="number" min="0" id="cpf" placeholder="" required disabled value={usuarioAtual.cpf ? usuarioAtual.cpf : null} />
                                    <p>Telefone (para contato):</p><input type="tel" id='Numerocont' placeholder="" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
                                </div>
                                <p>Seu telefone será utilizado para qualquer contato sobre o pedido.</p>

                            </div>


                            <div class='seu-endereco'>
                                <h1><i class="fa-solid fa-bag-shopping"></i> Entrega</h1>
                                <div class="inputbox">

                                    <p>CEP</p>
                                    <a href="https://buscacepinter.correios.com.br/app/endereco/index.php?t" target="_blank">Não sei meu CEP</a>
                                    <input type="text" id="cep" placeholder="" value={cep} onChange={(e) => setCEP(e.target.value)} required />
                                    <p>Estado</p><input type="text" id="estado" placeholder="" value={estado} onChange={(e) => setEstado(e.target.value)} required />
                                    <p>Cidade</p><input type="text" id="cidade" placeholder="" value={cidade} onChange={(e) => setcidade(e.target.value)} required />
                                    <p>Bairro</p><input type="text" id="bairro" placeholder="" value={bairro} onChange={(e) => setbairro(e.target.value)} required />
                                    <p>Endereço</p><input type="text" id="endereco" placeholder="" value={endereco} onChange={(e) => setendereco(e.target.value)} required />
                                    <p>Número</p><input type="text" id="numero" placeholder="" value={numero} onChange={(e) => setnumero(e.target.value)} required />
                                    <p>Referência</p><input type="text" id="referencia" placeholder="" value={referencia} onChange={(e) => setreferencia(e.target.value)} required />
                                </div>

                            </div>

                            <div class='pay--'>
                                <h1><i class="fa-solid fa-money-bill"></i> Pagamento</h1>
                                <div class='pay-inside'>
                                    <div class="paymenttotal">
                                        <div class="monetarycard">
                                            <div class="monetary">
                                                <div>
                                                    <p class="leftsidemonetary">Subtotal:</p>
                                                </div>
                                                <p class="valuemonetary">R$ {subtotal}</p>
                                            </div>
                                            <div class="monetary">
                                                <div>
                                                    <p class="leftsidemonetary">Descontos:</p>
                                                </div>
                                                <p class="valuemonetary">R$ {desconto}</p>
                                            </div>
                                            <div class="monetary">
                                                <div>
                                                    <p class="leftsidemonetary">Entrega:</p>
                                                </div>
                                                <p class="valuemonetary ">A COMBINAR</p>
                                            </div>
                                            <div class="monetarytotal monetary">
                                                <div>
                                                    <p class="leftsidemonetary">Total:</p>
                                                </div>
                                                <p>R$ {precototal}</p>
                                            </div>
                                        </div>

                                    </div>
                                    <select name="method" id="method">
                                        <option value="Dinheiro" selected>Dinheiro</option>
                                        <option value="Pix">Pix</option>
                                    </select>
                                    <p><strong>Obs: </strong>Pagamentos via dinheiro são realizados no momento da entrega</p>
                                    <p>Pagamentos via Pix são realizados antes da entrega</p>

                                    <React.Fragment>
                                        <button disabled={isLoading} id="submit" onClick={finalizartudo}>
                                            <span id="button-text">
                                                {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                                            </span>
                                        </button>
                                        {message && <div id="payment-message">{message}</div>}

                                    </React.Fragment>

                                </div>
                            </div>
                        </React.Fragment>
                    }


                </div>
            </section>
        )
    }
    else {
        return (
            <section className="laris-checkout-page">
                <Header />
                <div className="itensresumo">
                    <div class="empty-cart">
                        <h1>
                            <i class="fa-solid fa-bag-shopping"></i>
                        </h1>
                        <h2>Sua sacola de compras está vazia.</h2>
                        <p>Para adicionar uma joia a sacola, navegue pelo nosso website e clique no botão "ADICIONAR A SACOLA" </p>
                        <button onClick={() => { window.location.href = window.location.origin }}>CONTINUAR COMPRANDO</button>
                    </div>
                </div>
            </section>
        )
    }


}