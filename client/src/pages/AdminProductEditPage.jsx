/**
 * Creation Date: 14/09/2023
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

import { useEffect, useState } from "react";
import NavigationLeft from "../components/AdminPage/NavigationLeft";
import db, { getUserData } from "../lib/appwrite";
import { Query } from "appwrite";
import { useParams } from "react-router-dom";
import Loading from "../components/AdminPage/Loading";
import Swal from "sweetalert2";
import { GetProductById, getUser, GetUserAtual } from "../lib/database";
import { auth, CheckIfUserIsLogged } from "../lib/firebase";

export default function AdminProductEditPage() {
    const { product } = useParams();
    const [ProdutoAtual, setProdutoAtual] = useState(null)

    const [nomeProduto, setNomeProduto] = useState('');
    const [typeProduto, setTypeProduto] = useState(null)
    const [priceProduto, setpriceProduto] = useState(null)
    const [descontoProduto, setdescontoProduto] = useState(null)
    const [avaliableProduto, setavaliableProduto] = useState(null)
    const [qtdDisProduto, setQntDisponivelProduto] = useState(null)
    const [URLPRODUTO, setURLProduto] = useState(null)
    const [EXTENSOR, setExtensor] = useState(null)

    const [status, userStatus] = useState(null)
    const [userDB, setUserDBAccount] = useState([])

    const endpoint = process.env.REACT_APP_API_ENDPOINT;
    const secretKey = process.env.REACT_APP_API_SECRET_KEY;
    const preEndpoint = process.env.REACT_APP_API_PREENDPOINT;
    
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

    useEffect(() => {
        getProdutoAtual()
    }, [product]);

    async function getProdutoAtual() {
        const response = await GetProductById(product)
        const pdt = response

        setProdutoAtual(pdt);
        setNomeProduto(pdt.name_product);
        setTypeProduto(pdt.categoria)
        setpriceProduto(pdt.price)
        setdescontoProduto(pdt.desconto)
        setavaliableProduto(pdt.disponibilidade == true ? 'true' : 'false')
        setQntDisponivelProduto(pdt.quantidade_disponivel)
        setURLProduto(pdt.url)
        setExtensor(pdt.extensor === true ? 'true' : 'false')
    }

    const handleNomeProdutoChange = (event) => {
        // Atualize o estado local com o novo valor do input
        setNomeProduto(event.target.value);
    };

    const handleChangeType = (event) => {
        // Atualize o estado local com o novo valor do select
        setTypeProduto(event.target.value);
    }

    const handleChangeAvaliable = (event) => {
        // Atualize o estado local com o novo valor do select
        setavaliableProduto(event.target.value);
    }

    const handleChangeExtensor = (event) => {
        setExtensor(event.target.value);
    }

    const handlePriceProdutoChange = (event) => {
        setpriceProduto(event.target.value);
    }

    const handleDescontoProdutoChange = (event) => {
        setdescontoProduto(event.target.value);
    }

    const handleQuantDisponivelChange = (event) => {
        setQntDisponivelProduto(event.target.value);
    }

    const handleURLChange = (event) => {
        setURLProduto(event.target.value)
    }



    const SalvarAlteracoes = async () => {
        Swal.fire({
            title: 'Você deseja continuar?',
            text: "Ao salvar, o produto será automáticamente alterado no site oficial.",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Salvar',
            denyButtonText: `Não`,
            cancelButtonText: `Cancelar`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                fetch(`${endpoint}${preEndpoint}${secretKey}/products/edit`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: ProdutoAtual.id,
                        name_product: nomeProduto,
                        price: priceProduto,
                        desconto: descontoProduto,
                        disponibilidade: avaliableProduto == 'true',
                        quantidade_disponivel: qtdDisProduto,
                        categoria: typeProduto,
                        url: URLPRODUTO,
                        extensor: EXTENSOR == true
                    }),
                })
                .then((res) => {
                    Swal.fire(ProdutoAtual.name_product + " foi salvo com sucesso.", '', 'success')
                    getProdutoAtual()
                })
                .catch((error) => {
                    Swal.fire('Error ao salvar: ' + error, '', 'info')
                })                    
            } else if (result.isDenied) {

            }
        })

    }

    const ExcluirProduto = () => {
        Swal.fire({
            title: 'Você tem certeza?',
            text: "Ao excluir, não será possível restaurar o produto.",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Salvar',
            denyButtonText: `Não`,
            cancelButtonText: `Cancelar`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                fetch(`${endpoint}${preEndpoint}${secretKey}/products/delete`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: ProdutoAtual.id,
                    }),
                })
                .then((res) => {
                    window.location.href = window.location.origin + "/admin/products"
                })
            } else if (result.isDenied) {

            }
        })
    }

    const isAvaliable = avaliableProduto == 'true' ? 'true' : 'false';
    const TypeProduct = typeProduto;

    if (!userAtual) {
        return <Loading />

    }

    return (
        <div className="AdminPage-DashBoard">
            <NavigationLeft />
            <div className="Admin-ContentDashBoard">
                {ProdutoAtual ? (
                    <>
                        <div className="titleeditproduto"><h1>Editar Produto</h1></div>
                        <div className="product-atual">

                            {ProdutoAtual.photoURL ?
                                <div className="leftside-product-atual">
                                    {JSON.parse(ProdutoAtual.photoURL).length > 0 ?
                                        <img src={JSON.parse(ProdutoAtual.photoURL).includes("/static/media") ? window.location.origin + JSON.parse(ProdutoAtual.photoURL)[0] : JSON.parse(ProdutoAtual.photoURL)[0]} />
                                        :
                                        <img src={JSON.parse(ProdutoAtual.photoURL).includes("/static/media") ? window.location.origin + JSON.parse(ProdutoAtual.photoURL) : JSON.parse(ProdutoAtual.photoURL)} />
                                    }
                                    <div className="images-product">
                                        {JSON.parse(ProdutoAtual.photoURL).length > 0 ?
                                            <>
                                                {JSON.parse(ProdutoAtual.photoURL).map((res) => {
                                                    return (
                                                        <img src={res.includes("/static/media") ? window.location.origin + res : res} />
                                                    )
                                                })}
                                            </>
                                            :
                                            <img src={JSON.parse(ProdutoAtual.photoURL).includes("/static/media") ? window.location.origin + JSON.parse(ProdutoAtual.photoURL) : JSON.parse(ProdutoAtual.photoURL)} />
                                        }
                                    </div>
                                </div>
                                :
                                <></>
                            }
                            <div className="rightside-product-atual">
                                <img id="imagelogo" src={window.location.origin + "/static/media/Logo.webp"} />
                                <h3>{nomeProduto}</h3>
                                <p>Referência ou ID: {ProdutoAtual.$id}</p>
                                <div className="optionsedit">
                                    <div className="typeproduct">
                                        <div className="inputbox-editp">
                                            <div><h3>TIPO: </h3></div>
                                            {typeProduto == "CETIM"
                                                ?
                                                <select
                                                    onChange={handleChangeType}
                                                >
                                                    <option value={typeProduto} selected>{typeProduto}</option>
                                                    <option value='MICANGAS'>MIÇANGAS</option>
                                                    <option value='PRATA'>PRATA</option>
                                                </select>
                                                :
                                                <>
                                                    {typeProduto == "MICANGAS" ?
                                                        <select
                                                            onChange={handleChangeType}
                                                        >
                                                            <option value={typeProduto} selected>{typeProduto}</option>
                                                        </select>
                                                        :
                                                        <>
                                                            {typeProduto == "PRATA"
                                                                ?
                                                                <select
                                                                    onChange={handleChangeType}
                                                                >
                                                                    <option value={typeProduto} selected>{typeProduto}</option>
                                                                </select>
                                                                :
                                                                <></>
                                                            }
                                                        </>
                                                    }
                                                </>
                                            }
                                        </div>
                                    </div>
                                    <div className="inputbox-editp">
                                        <div><h3>NOME: </h3></div>
                                        <input
                                            value={nomeProduto}
                                            onChange={handleNomeProdutoChange}
                                        />
                                    </div>

                                    <div className="inputbox-editp">
                                        <div><h3>PREÇO: </h3></div>
                                        <span>R$ </span> <input
                                            value={priceProduto}
                                            onChange={handlePriceProdutoChange}
                                        />
                                    </div>
                                    <div className="inputbox-editp">
                                        <div><h3>DESCONTO: </h3></div>
                                        <span>R$ </span> <input
                                            value={descontoProduto}
                                            onChange={handleDescontoProdutoChange}
                                        />
                                    </div>

                                    <div className="inputbox-editp">
                                        <div><h3>DISPONIBILIDADE: </h3></div>
                                        <select onChange={handleChangeAvaliable} value={avaliableProduto} name="" id="">
                                            <option value={true}>Disponível</option>
                                            <option value={false}>Indisponivel</option>
                                        </select>
                                    </div>
                                    <div className="inputbox-editp">
                                        <div><h3>QUANTIDADE: </h3></div>
                                        <span></span> <input
                                            value={qtdDisProduto}
                                            onChange={handleQuantDisponivelChange}
                                        />
                                    </div>
                                    {typeProduto == "PRATA" ?
                                        <div className="inputbox-editp">
                                            <div><h3>EXTENSOR: </h3></div>
                                            <span></span>
                                            <select onChange={handleChangeExtensor} value={EXTENSOR}>
                                                <option value={true}>Sim</option>
                                                <option value={false}>Não</option>
                                            </select>
                                        </div>
                                        :
                                        null
                                    }
                                    <div className="inputbox-editp">
                                        <div><h3>URL: </h3></div>
                                        <span>/produto/</span>
                                        <input
                                            value={URLPRODUTO}
                                            onChange={handleURLChange}
                                        />
                                    </div>
                                </div>
                                <div className="btns-bottom-save">
                                    <button onClick={SalvarAlteracoes}>SALVAR ALTERAÇÕES</button>
                                    <button onClick={ExcluirProduto}>EXCLUIR ESSE PRODUTO</button>
                                </div>
                            </div>
                        </div>
                        <div className="titleeditproduto">
                            <h1>Preview do Produto</h1>
                            <div className="capturestela">
                                <div className='estoque-prata-index-pc'>
                                    <a href="#">
                                        <div class='item-prata' id={ProdutoAtual.$id}>
                                            <img src={ProdutoAtual != "" && JSON.parse(ProdutoAtual.photoURL) && JSON.parse(ProdutoAtual.photoURL).length > 0 ? JSON.parse(ProdutoAtual.photoURL)[0] : ""} alt="" />
                                            <div class="text-prata">
                                                {ProdutoAtual.PERSONALIZAVEL == true ? <p class="personalizado-loja">PERSONALIZADO</p> :
                                                    <>
                                                        {isAvaliable === 'true' ?
                                                            <p class='novidade-loja'>Disponível</p>
                                                            :
                                                            <p class="esgotado-loja">ESGOTADO</p>
                                                        }
                                                    </>}
                                                <h1 class="nome-prata">{nomeProduto}</h1>
                                                <div class='estrelas'>
                                                    <img src={window.location.origin + "/static/media/product-images/Nenhuma estrela.png"} alt="" />
                                                </div>
                                                <div class="promocao">
                                                    {descontoProduto > 0 ?
                                                        <p class="preço-loja"><s style={{ color: 'darkgray' }}>R$ {priceProduto}</s> R$ {priceProduto - descontoProduto}</p>
                                                        :
                                                        <p class="preço-loja">R$ {priceProduto - descontoProduto}</p>
                                                    }
                                                    <p class="opcoesdepaga">Pague à vista ou Pix</p>
                                                </div>
                                                <div class="botaocomprarprata">
                                                    <span>VER DETALHES</span>
                                                </div>

                                            </div>
                                        </div>
                                    </a>

                                </div>
                                <div className='estoque-prata-index'>
                                    <a href="#">
                                        <div class='item-prata' id={ProdutoAtual.$id}>
                                            <img src={ProdutoAtual != "" && JSON.parse(ProdutoAtual.photoURL) && JSON.parse(ProdutoAtual.photoURL).length > 0 ? JSON.parse(ProdutoAtual.photoURL)[0] : ""} alt="" />
                                            <div class="text-prata">
                                                {ProdutoAtual.PERSONALIZAVEL == true ? <p class="personalizado-loja">PERSONALIZADO</p> :
                                                    <>
                                                        {isAvaliable === 'true' ?
                                                            <p class='novidade-loja'>Disponível</p>
                                                            :
                                                            <p class="esgotado-loja">ESGOTADO</p>
                                                        }
                                                    </>}
                                                <h1 class="nome-prata">{nomeProduto}</h1>
                                                <div class='estrelas'>
                                                    <img src={window.location.origin + "/static/media/product-images/Nenhuma estrela.png"} alt="" />
                                                </div>
                                                <div class="promocao">
                                                    {descontoProduto > 0 ?
                                                        <p class="preço-loja"><s style={{ color: 'darkgray' }}>R$ {priceProduto}</s> R$ {priceProduto - descontoProduto}</p>
                                                        :
                                                        <p class="preço-loja">R$ {priceProduto - descontoProduto}</p>
                                                    }
                                                    <p class="opcoesdepaga">Pague à vista ou Pix</p>
                                                </div>
                                                <div class="botaocomprarprata">
                                                    <span>VER DETALHES</span>
                                                </div>

                                            </div>
                                        </div>
                                    </a>

                                </div>
                            </div>
                        </div>

                    </>
                )
                    :
                    <Loading />
                }
            </div>
        </div>
    )
}