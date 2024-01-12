import { useEffect, useState } from "react";
import NavigationLeft from "../components/AdminPage/NavigationLeft";
import db, { getUserData } from "../lib/appwrite";
import { Query } from "appwrite";
import Loading from "../components/AdminPage/Loading";

export default function AdminProductsAdd() {
    const [user, setUser] = useState(null);
    const [DatabaseAt, setDatabaseAtual] = useState(null);
    const [search, setSearch] = useState(null);
    const [ContentSearch, setContentSearch] = useState([]);
    const [ProdutosCadastrados, setTodosProdutos] = useState([]);
    const [status, userStatus] = useState(null);
    const [userDB, setUserDBAccount] = useState([]);
    const [ProdutosLength, setProdutosLength] = useState(null)

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
                setProdutosLength(res.documents.length)
                setTodosProdutos(res.documents.map((product) => {
                    return (
                        <tr onClick={() => {
                            window.location.href = window.location.origin + `/admin/products/${product.$id}`
                        }}>
                            <td>
                                <img src={product.PHOTOURL.length > 0 ? product.PHOTOURL[0] : product.PHOTOURL} />
                            </td>
                            <td>
                                <p>{product.NAME_PRODUCT}</p>
         
                            </td>
                            <td>
                                {product.STYLE}
                            </td>
                            <td>
                                <p>R$ {product.DESCONTO.toFixed(2)}</p>
                            </td>
                            <td>
                                <p>R$ {product.PRICE.toFixed(2)}</p>
                            </td>
                            <td>{product.AVALIABLE == true ? <p >Disponível</p> : <p style={{ color: 'red' }}>Sem estoque</p>}</td>
                            <td>{product.QUANT_DISPONIVEL}</td>
                            <td><i className="fa-solid fa-ellipsis"></i></td>
                        </tr>
                    )
                }))
            })

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