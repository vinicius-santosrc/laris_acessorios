import { useEffect, useState } from "react";
import NavigationLeft from "../components/AdminPage/NavigationLeft";
import db, { getUserData } from "../lib/appwrite";
import { Query } from "appwrite";
import Loading from "../components/AdminPage/Loading";

export default function AdminProductsAdd() {
    const [user, setUser] = useState(null)
    const [DatabaseAt, setDatabaseAtual] = useState(null)
    const [search, setSearch] = useState(null);
    const [ContentSearch, setContentSearch] = useState([])
    const [ProdutosCadastrados, setTodosProdutos] = useState([])
    const [status, userStatus] = useState(null)
    const [userDB, setUserDBAccount] = useState([])

    const DBUID = '651ca99af19b7afad3f1';
    const PRODUTOSUID = '651ca9adf3de7aad17d9';


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

    }, [])

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
                            window.location.href = window.location.origin + `/admin/products/${product.$id}`
                        }}>
                            <td>
                                <img src={product.PHOTOURL.length > 0 ? product.PHOTOURL[0] : product.PHOTOURL} />
                            </td>
                            <td>
                                <h2>{product.NAME_PRODUCT}</h2>
                                <p style={{ color: "gray" }}>{product.TYPE}</p>
                            </td>
                            <td>
                                {product.STYLE}
                            </td>
                            <td>
                                <p style={{ color: 'gray' }}>R$ {product.DESCONTO}</p>
                            </td>
                            <td>
                                <p style={{ color: 'red' }}>R$ {product.PRICE}</p>
                            </td>
                            <td>{product.AVALIABLE == true ? <p style={{ color: '#EF59A0' }}>Disponível</p> : <p style={{ color: 'gray' }}>Sem estoque</p>}</td>
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
                                            <img src={r.PHOTOURL.length > 0 ? r.PHOTOURL[0] : r.PHOTOURL}></img>
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
                                        <img src={r.PHOTOURL.length > 0 ? r.PHOTOURL[0] : r.PHOTOURL}></img>
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
    }, []);

    if (!user) {
        return <Loading />

    }

    return (
        <div className="AdminPage-DashBoard">
            <NavigationLeft />
            <div className="Admin-ContentDashBoard">
                <header>

                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input placeholder="Buscar" onChange={
                        (e) => {
                            setSearch(e.target.value)
                        }
                    } />


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

                <div className="AdicionarProducts"></div>
                <div className="content-page-add-products">
                    <div className="Add-Procuts-Laris">

                    </div>
                    <div className="products-add-principal">
                        <div className="products-add-principal-left">
                            <div className="left-card-principal">
                                <h2><i className="fa-solid fa-database"></i> Bancos de dados</h2>
                                <div className="dbs">
                                    {DatabaseAt == "Products"
                                        ?
                                        <a onClick={() => {
                                            setDatabaseAtual(null)
                                        }}><i className="fa-regular fa-gem"></i> PRODUTOS <i className="fa-solid fa-chevron-right"></i></a>
                                        :
                                        <a style={{ color: "gray" }} onClick={() => {
                                            setDatabaseAtual('Products')
                                        }}><i className="fa-regular fa-gem"></i> PRODUTOS <i className="fa-solid fa-chevron-right"></i></a>
                                    }

                                </div>
                            </div>
                        </div>
                        <div className="products-add-principal-right">

                            <div className="right-card-principal">
                                {DatabaseAt == "Products"
                                    ?
                                    <>
                                        <h2><i className="fa-regular fa-gem"></i> Produtos Cadastrados</h2>
                                        <div className="products-add-btns-top">
                                            <button onClick={() => {
                                                window.location.href = '/admin/products/add'
                                            }}><i style={{ color: 'green' }} className="fa-solid fa-plus"></i> ADICIONAR PRODUTO</button>
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
                                    :
                                    <div className="nodatabases">
                                        <img src={window.location.origin + "/static/media/admin-images/undraw_folder_files_re_2cbm.svg"} />
                                        <h2>Nada por aqui..</h2>
                                        <p>Selecione um banco de dados.</p>
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    );
}