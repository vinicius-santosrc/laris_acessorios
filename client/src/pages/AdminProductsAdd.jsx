import React, { useEffect, useState } from "react";
import NavigationLeft from "../components/AdminPage/NavigationLeft";
import db, { getUserData } from "../lib/appwrite";
import { Query } from "appwrite";
import Loading from "../components/AdminPage/Loading";
import { getAllProducts, getUser } from "../lib/database";

export default function AdminProductsAdd() {
    const [user, setUser] = useState(null);
    const [DatabaseAt, setDatabaseAtual] = useState(null);
    const [search, setSearch] = useState(null);
    const [ContentSearch, setContentSearch] = useState([]);
    const [ProdutosCadastrados, setTodosProdutos] = useState([]);
    const [ProdutosLength, setProdutosLength] = useState(null);
    const [status, userStatus] = useState(null);
    const [userDB, setUserDBAccount] = useState([]);

    useEffect(() => {


        getUserData()
            .then(async (account) => {
                setUser(account)
                userStatus(account.status ? 'Online' : 'Offline')
                const user = await getUser(account.email)
                setUserDBAccount(user)
                if (!account) {
                    window.location.href = window.location.origin + "/admin/login"
                }


            }, [])

        async function setProducts() {
            const AllPdt = await getAllProducts();

            setProdutosLength(AllPdt.length)
            setTodosProdutos(AllPdt.map((product) => {

                const PHOTOURL = JSON.parse(product.photoURL)

                return (
                    <tr onClick={() => {
                        window.location.href = window.location.origin + `/admin/products/${product.id}`
                    }}>
                        <td>
                            <img src={PHOTOURL.length > 0 ? PHOTOURL[0] : PHOTOURL} />
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
                        <td>{product.disponibilidade == true ? <p >Disponível</p> : <p style={{ color: 'red' }}>Sem estoque</p>}</td>
                        <td>{product.quantidade_disponivel}</td>
                        <td><i className="fa-solid fa-ellipsis"></i></td>
                    </tr>
                )
            }))
        }
        setProducts()
    }, []);

    if (!user) {
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

                                <>
                                    <div className="toppage-products">
                                        <div className="top-top-product-header">
                                            <div>
                                                <h2>Produtos Cadastrados ({ProdutosLength})</h2>
                                                <p>Gerencie os produtos da sua loja.</p>

                                            </div>

                                            <button onClick={() => {
                                                window.location.href = '/admin/products/add'
                                            }}><i className="fa-solid fa-plus"></i> ADICIONAR NOVO</button>
                                        </div>


                                    </div>

                                    <div className="search-box-table">
                                        <input type="text" placeholder="Procurar" />
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
                                </>


                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    );
}