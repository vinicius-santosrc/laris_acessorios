/**
 * Creation Date: 06/09/2023
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Ring } from "@uiball/loaders";
import Swal from "sweetalert2";
import * as emailjs from "@emailjs/browser"
import db from "../lib/appwrite";
import { ID } from "appwrite";
import { CheckIfUserIsLogged, auth } from "../lib/firebase";
import { GetUserAtual, getCupons } from "../lib/database";
import QRCode from 'qrcode.react';

export default function Checkout() {

    const pixKey = '11794087648'

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

    const [Cupom, setCupom] = useState(null);
    const [CuponsDescontos, setCuponsDescontos] = useState(0);

    const [CuponsBox, setCuponsBox] = useState(false);

    const [paymentOption, setPayment] = useState('DINHEIRO');

    const [cuponsDisp, setcuponsDisp] = useState(null);

    const [CupomAtual, setCupomAtual] = useState(null);

    const endpoint = process.env.REACT_APP_API_ENDPOINT;
    //const endpoint = process.env.REACT_APP_API_ENDPOINT_TEST;
    const secretKey = process.env.REACT_APP_API_SECRET_KEY;
    const preEndpoint = process.env.REACT_APP_API_PREENDPOINT;

    useEffect(() => {
        document.querySelector("title").innerText = "Finalizar compra";

    }, [])

    useEffect(() => {
        searchByUserAtual()

    }, [auth.currentUser])

    async function getAllCupons() {
        const res = await getCupons();
        setcuponsDisp(res);
    }

    useEffect(() => {
        getAllCupons()
    }, [])

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

    const createPixPayload = () => {
        const payloadFormatIndicator = '000201'; // Fixo
        const pointOfInitiationMethod = '0101'; // Fixo
        const merchantAccountInformation = `2633${pixKey.length}${pixKey}`; // Chave PIX
        const merchantCategoryCode = '52040000'; // Fixo
        const transactionCurrency = '5303986'; // BRL
        const countryCode = '5802BR'; // Brasil
        const merchantName = '5924VINICIUS DA SILVA SANTOS'; // Nome do beneficiário
        const merchantCity = '6009Sao Paulo'; // Cidade do beneficiário
        const additionalDataFieldTemplate = '62070503***'; // Informações adicionais (pode ser ajustado conforme necessário)
        const crc16 = '6304'; // CRC16 (a ser calculado)

        const emvPayload = `${payloadFormatIndicator}${pointOfInitiationMethod}${merchantAccountInformation}${merchantCategoryCode}${transactionCurrency}${countryCode}${merchantName}${merchantCity}${additionalDataFieldTemplate}${crc16}`;

        return emvPayload;
    };

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
                                            <option value={item.qtd} selected>{item.qtd}</option>
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
            if (CupomAtual && CupomAtual.desconto) {
                if ((CupomAtual.desconto.toString()).length >= 2) {
                    setprecototal(preco * (1.00 - Number('0.' + CupomAtual.desconto)))
                    setCuponsDescontos((preco * ('1.' + CupomAtual.desconto)) - preco)
                }
                else {
                    setprecototal(preco * (1.00 - Number('0.0' + CupomAtual.desconto)))
                    setCuponsDescontos((preco * ('1.0' + CupomAtual.desconto)) - preco)
                }
            }

            else {
                setprecototal(preco)
            }
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

        if (!usuarioAtual || !endereco || !cidade || !bairro || !estado || !cep || !referencia || !numero || !telefone) {
            return
        }

        try {
            //VERIFICAÇÃO DE DADOS

            const dadosPedido = {
                "usuario": usuarioAtual,
                "produtos": sacolaAt,

            };

            const enderecoPedido = {
                "endereço": endereco,
                "bairro": bairro,
                "cidade": cidade,
                "estado": estado,
                "cep": cep,
                "referencia": referencia,
                "numero": numero
            }

            //FORMAS DE PAGAMENTO



            //CRIAR PEDIDO NO BANCO DE DADOS

            await fetch(`${endpoint}${preEndpoint}${secretKey}/orders/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    address: JSON.stringify(enderecoPedido),
                    items: JSON.stringify(dadosPedido.produtos),
                    user: JSON.stringify(dadosPedido.usuario),
                    totalprice: precototal,
                    paymentOption: paymentOption,
                    situation: 'PAGO',
                    desconto: desconto,
                    subtotal: subtotal,
                    cupom_desconto: CuponsDescontos || 0,
                    cupons: CupomAtual ? CupomAtual.name : ''
                }),
            })
                .then((res) => {

                    if (usuarioAtual && usuarioAtual.cupons && CupomAtual.uniqueKey) {
                        const CUPONS_USER = JSON.parse(usuarioAtual.cupons);
                        const cupons_usados = JSON.parse(usuarioAtual.cupons_usados);

                        // Filtra o array removendo o cupomusado
                        const novoArrayCupons = CUPONS_USER.filter(cupom => cupom !== CupomAtual.uniqueKey);

                        // Se você precisar convertê-lo de volta para uma string JSON
                        const novaStringCupons = JSON.stringify(novoArrayCupons);

                        cupons_usados.push(CupomAtual.uniqueKey)

                        async function setCupomUser() {
                            await fetch(`${endpoint}${preEndpoint}${secretKey}/cupons/myaccount/add`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    cupons: novaStringCupons,
                                    cupom_usado: JSON.stringify(cupons_usados),
                                    user_uid: usuarioAtual.uid
                                }),
                            })
                        }
                        setCupomUser()

                    }

                    localStorage.setItem('sacola', '[]')
                })

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `Pedido realizado com sucesso.`,
                showConfirmButton: false,
                timer: 2500
            })
            setTimeout(() => {
                window.location.href = window.location.origin + "/accounts/myaccount/orders"
            }, 1000);
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

                            {CuponsBox &&
                                <div className="fixed-cuppons-box-content">
                                    <div className="fixed-cuppons-box">
                                        <div className="title-cupons">
                                            <h1>Meus cupons</h1>
                                            <button onClick={() => setCuponsBox(false)}>
                                                <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.46967 5.46967C5.76256 5.17678 6.23744 5.17678 6.53033 5.46967L12 10.9393L17.4697 5.46967C17.7626 5.17678 18.2374 5.17678 18.5303 5.46967C18.8232 5.76256 18.8232 6.23744 18.5303 6.53033L13.0607 12L18.5303 17.4697C18.8232 17.7626 18.8232 18.2374 18.5303 18.5303C18.2374 18.8232 17.7626 18.8232 17.4697 18.5303L12 13.0607L6.53033 18.5303C6.23744 18.8232 5.76256 18.8232 5.46967 18.5303C5.17678 18.2374 5.17678 17.7626 5.46967 17.4697L10.9393 12L5.46967 6.53033C5.17678 6.23744 5.17678 5.76256 5.46967 5.46967Z" fill="#0F172A" />
                                                </svg>
                                                </span>
                                            </button>
                                        </div>
                                        <div className="cupons-list">
                                            <a href={window.location.origin + '/accounts/myaccount/cupons'}>Deseja mais cupons? Resgate agora!</a>
                                            <div className="cuppons-ul">
                                                {cuponsDisp && cuponsDisp.map((cupom) => {
                                                    const USER_CUPONS = JSON.parse(usuarioAtual.cupons) || ''

                                                    if (desconto > 0 && USER_CUPONS.includes(cupom.uniqueKey)) {
                                                        return (
                                                            <div className="cupom-box-wrapper" key={cupom.id}>
                                                                <div className="left-side-box-cupom">
                                                                    <img src={window.location.origin + "/static/media/cupons/" + cupom.imageURL} />
                                                                </div>
                                                                <div className="right-side-box-cupom">
                                                                    <div className="up-cupom">
                                                                        <p id="red-color">CUPOM INDISPONÍVEL PARA ESSA COMPRA</p>
                                                                        <h4>{cupom.name}</h4>
                                                                        <h5><s>{cupom.desconto}% de desconto.</s></h5>
                                                                    </div>
                                                                    <div className="validade">
                                                                        <p>Indisponível para compras que incluem produtos em promoção.</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }

                                                    if (USER_CUPONS.includes(cupom.uniqueKey)) {
                                                        return (
                                                            <div className="cupom-box-wrapper" onClick={(e) => { setCupomAtual(cupom); setCuponsBox(false) }} key={cupom.id}>
                                                                <div className="left-side-box-cupom">
                                                                    <img src={window.location.origin + "/static/media/cupons/" + cupom.imageURL} />
                                                                </div>
                                                                <div className="right-side-box-cupom">
                                                                    <div className="up-cupom">
                                                                        <p>Para você</p>
                                                                        <h4>{cupom.name}</h4>
                                                                        <h5>{cupom.desconto}% de desconto.</h5>
                                                                    </div>
                                                                    <div className="validade">
                                                                        <p>Sem validade</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                })}
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            }

                            <div class='pay--'>
                                <h1><i class="fa-solid fa-money-bill"></i> Pagamento</h1>
                                <div class='pay-inside'>
                                    <div className="discont-coupons">
                                        <div className="CupomBox" onClick={() => setCuponsBox(true)}>
                                            {CupomAtual && CupomAtual.name ?
                                                <React.Fragment>
                                                    <div className="leftside-cupom-selected">
                                                        <img src={window.location.origin + "/static/media/cupons/" + CupomAtual.imageURL} />
                                                    </div>
                                                    <div className="rightside-cupom-selected">
                                                        <h2>{CupomAtual.name}</h2>
                                                        <p>{CupomAtual.desconto}% off nos produtos.</p>
                                                    </div>

                                                </React.Fragment>
                                                :
                                                <React.Fragment>
                                                    {/*SE O DESCONTO FOR menor ou igual a 0 e SACOLA TIVER 1 OU MENOS ITENS */}
                                                    {desconto > 0
                                                        ?
                                                        <React.Fragment>
                                                            <div className="leftside-cupom-selected">
                                                                <img src={null} />
                                                            </div>
                                                            <div className="rightside-cupom-selected">
                                                                <h2 id="red-color">Cupons indisponíveis para esse tipo de compra</h2>
                                                                <p>Adicione mais um produto para poder usar cupons.</p>
                                                            </div>
                                                        </React.Fragment>
                                                        :

                                                        <React.Fragment>
                                                            <div className="leftside-cupom-selected">
                                                                <img src={null} />
                                                            </div>
                                                            <div className="rightside-cupom-selected">
                                                                <h2>Selecione um cupom</h2>
                                                                <p>Nenhum cupom selecionado.</p>
                                                            </div>
                                                        </React.Fragment>
                                                    }

                                                </React.Fragment>
                                            }
                                        </div>
                                    </div>
                                    <div class="paymenttotal">
                                        <div class="monetarycard">
                                            <div class="monetary">
                                                <div>
                                                    <p class="leftsidemonetary">Subtotal:</p>
                                                </div>
                                                <p class="valuemonetary">R$ {subtotal.toFixed(2)}</p>
                                            </div>
                                            <div class="monetary">
                                                <div>
                                                    <p class="leftsidemonetary">Descontos:</p>
                                                </div>
                                                <p class="valuemonetary">R$ {desconto.toFixed(2)}</p>
                                            </div>
                                            <div class="monetary">
                                                <div>
                                                    <p class="leftsidemonetary">Cupons:</p>
                                                </div>
                                                <p class="valuemonetary">R$ {CuponsDescontos.toFixed(2)}</p>
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
                                                <p>R$ {precototal.toFixed(2)}</p>
                                            </div>
                                        </div>

                                    </div>
                                    <select value={paymentOption} onChange={(e) => setPayment(e.target.value)} name="method" id="method">
                                        <option value="DINHEIRO" selected>Dinheiro</option>
                                        <option value="PIX">Pix</option>
                                    </select>
                                    <p><strong>Obs: </strong>Pagamentos via dinheiro são realizados no momento da entrega</p>
                                    <p>Pagamentos via Pix são realizados antes da entrega</p>

                                    <React.Fragment>
                                        <button disabled={isLoading} id="submit" onClick={finalizartudo}>
                                            <span id="button-text">
                                                {isLoading ? <div className="spinner" id="spinner"></div> : "FINALIZAR COMPRA"}
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