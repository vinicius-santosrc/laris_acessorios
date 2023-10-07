import { useEffect, useState } from "react";
import NavigationLeft from "../components/AdminPage/NavigationLeft";
import db from "../lib/appwrite";
import { Query } from "appwrite";

export default function AdminProductsAdd() {

    const [search, setSearch] = useState(null);
    const [ContentSearch, setContentSearch] = useState([])
    const [ProdutosCadastrados, setTodosProdutos] = useState([])

    const DBUID = '651ca99af19b7afad3f1';
    const PRODUTOSUID = '651ca9adf3de7aad17d9';


    useEffect(() => {
        db.listDocuments(
            DBUID,
            PRODUTOSUID,
            [
                Query.limit(250),
                Query.orderDesc("$createdAt")
            ]
        )
            .then(res => {
                setTodosProdutos(res.documents.map((product) => {
                    return (
                        <tr onClick={() => {
                            window.location.href= window.location.origin + `/admin/products/${product.$id}`
                        }}>
                            <td>
                                <img src={product.PHOTOURL.length > 0 ? window.location.origin + product.PHOTOURL[0] : window.location.origin + product.PHOTOURL} />
                            </td>
                            <td>
                                <h2>{product.NAME_PRODUCT}</h2>
                            </td>
                            <td>
                                <p>{product.TYPE}</p>
                            </td>
                            <td>
                                <p style={{color: 'gray'}}>R$ {product.DESCONTO}</p>
                            </td>
                            <td>
                                <p style={{color: 'red'}}>R$ {product.PRICE}</p>
                            </td>
                            <td>{product.AVALIABLE == true ? <p>Disponível</p> : <p>Sem estoque</p>}</td>
                            <td>{product.QUANT_DISPONIVEL}</td>
                        </tr>
                    )
                }))
            })
        if (search != null && search.length > 3) {
            db.listDocuments(
                DBUID,
                PRODUTOSUID,
                [
                    Query.search("NAME_PRODUCT", search.toString()),
                    Query.orderDesc("$createdAt"),
                    Query.limit(10)
                ]
            )
                .then((res) => {
                    setContentSearch(res.documents.map((r, i) => {
                        if (i == 0) {
                            return (
                                <>
                                    <h2>Produtos encontrados: </h2>
                                    <li>
                                        <a href={window.location.origin + "/admin/products/" + r.$id}>
                                            <img src={r.PHOTOURL.length > 0 ? window.location.origin + r.PHOTOURL[0] : window.location.origin + r.PHOTOURL}></img>
                                            <div className="right-side-busca">
                                                <p id="type">{r.TYPE}</p>
                                                <h2>{r.NAME_PRODUCT}</h2>
                                                {r.DESCONTO > 0 ?
                                                    <p id="valor"><s style={{ color: 'gray' }}>R${r.PRICE}</s> <span style={{ color: 'red' }}>R$ {r.PRICE - r.DESCONTO}</span></p>
                                                    :
                                                    <p id="valor" style={{ color: 'red' }}>R$ {r.PRICE}</p>
                                                }
                                            </div>
                                        </a>
                                    </li>
                                </>
                            )
                        }
                        else {
                            return (
                                <li>
                                    <a href={window.location.origin + "/admin/products/" + r.$id}>
                                        <img src={r.PHOTOURL.length > 0 ? window.location.origin + r.PHOTOURL[0] : window.location.origin + r.PHOTOURL}></img>
                                        <div className="right-side-busca">
                                            <p id="type">{r.TYPE}</p>
                                            <h2>{r.NAME_PRODUCT}</h2>
                                            {r.DESCONTO > 0 ?
                                                <p id="valor"><s style={{ color: 'gray' }}>R${r.PRICE}</s> <span style={{ color: 'red' }}>R$ {r.PRICE - r.DESCONTO}</span></p>
                                                :
                                                <p id="valor" style={{ color: 'red' }}>R$ {r.PRICE}</p>
                                            }
                                        </div>
                                    </a>
                                </li>
                            )
                        }
                    }))
                })
        }
    });

    return (
        <div className="AdminPage-DashBoard">
            <NavigationLeft />
            <div className="Admin-ContentDashBoard">
                <header>
                    <div>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input placeholder="Buscar" onChange={
                            (e) => {
                                setSearch(e.target.value)
                            }
                        } />
                    </div>

                </header>
                {search
                    ?
                    <div className="search-products-box">
                        <ul>
                            {ContentSearch}
                        </ul>
                    </div>
                    :
                    <>
                    </>
                }
                <div className="content-page-add-products">
                    <div className="products-add-btns-top">
                        <button></button>
                        <button></button>
                        <button></button>
                        <button></button>
                        <button></button>
                    </div>
                    <div className="products-add-principal">
                        <div className="products-add-principal-left">
                            <div className="left-card-principal">
                                <h2>Bancos de dados</h2>
                                <a>PRODUTOS</a>
                            </div>
                        </div>
                        <div className="products-add-principal-right">
                            <div className="right-card-principal">
                                <p>Id: $id</p>
                                <h2>Produtos Cadastrados</h2>
                                <table>
                                    <tr>
                                        <td>FOTO</td>
                                        <td>NOME</td>
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
        </div>
    );
}