/**
 * Creation Date: 15/01/2024
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

import React, { useEffect, useState } from "react";
import NavigationLeft from "../components/AdminPage/NavigationLeft";
import db, { getUserData } from "../lib/appwrite";
import { Query } from "appwrite";
import Loading from "../components/AdminPage/Loading";
import { getAllProducts, getUser, GetUserAtual } from "../lib/database";
import { auth, CheckIfUserIsLogged } from "../lib/firebase";

export default function AdminProductsAdd() {
    const [user, setUser] = useState(null);
    const [DatabaseAt, setDatabaseAtual] = useState(null);
    const [search, setSearch] = useState(null);
    const [ContentSearch, setContentSearch] = useState("");
    const [ProdutosCadastrados, setTodosProdutos] = useState([]);
    const [ProdutosLength, setProdutosLength] = useState(null);
    const [status, userStatus] = useState(null);
    const [userDB, setUserDBAccount] = useState([]);
    const [userAtual, setuserAtual] = useState([]);

    useEffect(() => {

        setProducts()
    }, []);
    
    async function setProducts() {
        const AllPdt = await getAllProducts();

        setProdutosLength(AllPdt.length)
        setTodosProdutos(AllPdt.map((product) => {
            const PHOTOURL = JSON.parse(product.photoURL);
            if(ContentSearch != "") {
                if(product.name_product.toLowerCase().includes(ContentSearch.toLowerCase())) {
                    return (
                        <tr
                            key={product.id}
                            onClick={() => {
                                window.location.href = window.location.origin + `/admin/products/${product.id}`
                            }}
                        >
                            <td>
                                <img
                                    title={product.name_product}
                                    src={PHOTOURL.length > 0 ? PHOTOURL[0] : PHOTOURL}
                                    alt="Product"
                                />
                            </td>
                            <td>
                                <p>{product.name_product}</p>
    
                            </td>
                            <td>
                                {product.tipo}
                            </td>
                            <td>
                                <p>R$ {product.desconto.toFixed(2)}</p>
                            </td>
                            <td>
                                <p>R$ {product.price.toFixed(2)}</p>
                            </td>
                            <td>{product.disponibilidade ? <p>Disponível</p> : <p style={{ color: 'red' }}>Sem estoque</p>}</td>
                            <td>{product.quantidade_disponivel}</td>
                            <td><i className="fa-solid fa-ellipsis"></i></td>
                        </tr>
                    )
                }
                else return null;
            }
            return (
                <tr
                    key={product.id}
                    onClick={() => {
                        window.location.href = window.location.origin + `/admin/products/${product.id}`
                    }}
                >
                    <td>
                        <img
                            title={product.name_product}
                            src={PHOTOURL.length > 0 ? PHOTOURL[0] : PHOTOURL}
                            alt="Product"
                        />
                    </td>
                    <td>
                        <p>{product.name_product}</p>

                    </td>
                    <td>
                        {product.tipo}
                    </td>
                    <td>
                        <p>R$ {product.desconto.toFixed(2)}</p>
                    </td>
                    <td>
                        <p>R$ {product.price.toFixed(2)}</p>
                    </td>
                    <td>{product.disponibilidade ? <p>Disponível</p> : <p style={{ color: 'red' }}>Sem estoque</p>}</td>
                    <td>{product.quantidade_disponivel}</td>
                    <td><i className="fa-solid fa-ellipsis"></i></td>
                </tr>
            )
        }))
    }


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
            <div className="Admin-ContentDashBoard">
                <div className="content-page-add-product">
                    <div className="products-add-principal">
                        <div className="products-add-principal">
                            <div className="right-card-principal">
                                <div className="toppage-products">
                                    <div className="top-top-product-header">
                                        <div>
                                            <h2>Produtos Cadastrados ({ProdutosLength})</h2>
                                            <p>Gerencie os produtos da sua loja.</p>

                                        </div>

                                        <button
                                            onClick={() => {
                                                window.location.href = '/admin/products/add'
                                            }}>
                                            <i className="fa-solid fa-plus"></i> ADICIONAR NOVO</button>
                                    </div>


                                </div>

                                <div className="search-box-table">
                                    <input type="text" placeholder="Procurar" onChange={(e) => {
                                        setContentSearch(e.target.value)
                                        setProducts()
                                    }} />
                                </div>

                                <table>
                                    <tr>
                                        <td>FOTO</td>
                                        <td>PRODUTO</td>
                                        <td>TIPO</td>
                                        <td>DESCONTO</td>
                                        <td>PREÇO</td>
                                        <td>DISPONIBILIDADE</td>
                                        <td>QUANTIDADE</td>
                                    </tr>
                                    {ProdutosCadastrados}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    );
}