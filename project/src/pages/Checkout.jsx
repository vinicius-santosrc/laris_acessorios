import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Ring } from "@uiball/loaders";


export default function Checkout() {


    const [sacolaAt, setSacolaAtual] = useState([]);
    const [exportSacola, setExportSacola] = useState([]);
    const [exportSacolaMobile, setExportSacolaMobile] = useState([]);
    let [precototal, setprecototal] = useState(null)
    let [subtotal, setsubtotal] = useState(null)
    let [desconto, setdescontos] = useState(null)

    useEffect(() => {
        document.querySelector("title").innerText = "Finalizar compra"
        
    }, [])



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
                                        <a href={item.onclick}>{item.name}</a>
                                    </td>
                                    <td>
                                        <p>R$ {item.preco}</p>
                                    </td>
                                    <td>
                                        <p>R$ {item.desconto}</p>
                                    </td>
                                    <td>
                                        <select disabled>
                                            <option selected value={item.preco}>
                                                {item.qtd}
                                            </option>
                                        </select>
                                    </td>
                                    <td>
                                        <p>R$ {item.preco - item.desconto}</p>
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
                                <p>R$ {item.preco}</p>
                            </td>
                            <td>
                                <p>R$ {item.desconto}</p>
                            </td>
                            <td>
                                <select disabled>
                                    <option selected value={item.preco}>
                                        {item.qtd}
                                    </option>
                                </select>
                            </td>

                            <td>
                                <p>R$ {item.preco - item.desconto}</p>
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
                                        <a style={{ color: 'black' }} onclick="window.location.href='${item.onclick}'">{item.name}</a>
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
                                        <h2>R$ {item.preco}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            )
        }
    });

    useEffect(() =>{
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


    if (localStorage.getItem("sacola") != '[]') {
        return (
            <section className="laris-checkout-page">
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

                    <div class='dados-pessoais'>
                        <h1><i class="fa-solid fa-person-dress"></i> Dados pessoais</h1>
                        <div class="inputbox">
                            <p>Email:</p><input type="email" id='Email' placeholder="" required />
                            <p>Primeiro nome</p><input type="text" id='primeironome' placeholder="" required />
                            <p>Último nome</p><input type="text" id='ultimonome' placeholder="" required />
                            <p>CPF</p><input type="number" min="0" id="cpf" placeholder="" required />
                            <p>Telefone</p><input type="tel" id='Numerocont' placeholder="" required />
                        </div>
                        <p>Seu telefone será utilizada para qualquer contato sobre o pedido.</p>

                    </div>


                    <div class='seu-endereco'>
                        <h1><i class="fa-solid fa-bag-shopping"></i> Entrega</h1>
                        <div class="inputbox">

                            <p>CEP</p>
                            <a href="https://buscacepinter.correios.com.br/app/endereco/index.php?t" target="_blank">Não sei meu CEP</a>
                            <input type="text" id="cep" placeholder="" required />
                            <p>Estado</p><input type="text" id="estado" placeholder="" required />
                            <p>Cidade</p><input type="text" id="cidade" placeholder="" required />
                            <p>Bairro</p><input type="text" id="bairro" placeholder="" required />
                            <p>Endereço</p><input type="text" id="endereco" placeholder="" required />
                            <p>Número</p><input type="text" id="numero" placeholder="" required />
                            <p>Referência</p><input type="text" id="referencia" placeholder="" required />
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
                        </div>
                        <div class='botoesseucart'>
                            <button onclick="finalizartudo()"><i class="fa-solid fa-lock"></i> FINALIZAR COMPRA</button>
                        </div>
                    </div>


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