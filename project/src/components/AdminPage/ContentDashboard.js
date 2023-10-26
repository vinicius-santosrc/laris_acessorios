import { useEffect, useState } from "react"
import HeaderAdminPage from "./HeaderAdminPage"
import db from "../../lib/appwrite"
import { Query } from "appwrite"


export default function ContentDashboard() {
    const [saldoWrap, setSaldo] = useState(0)
    const [entradasWrap, setEntradas] = useState(0)
    const [saidasWrap, setSaidas] = useState(0)
    const [Produtos, setProdutos] = useState(0)
    const DBUID = '651ca99af19b7afad3f1';

    const [metaMensal, setMetaMensal] = useState(0)
    const [metaAnual, setMetaAnual] = useState(0)

    useEffect(() => {
        let entradas = 0; // Inicialize as variáveis aqui
        let saidas = 0;
        const collectionId = "6526ef810e37b1d693c1"

        db.getDocument(
            '651ca99af19b7afad3f1',
            "6526fb79b32651e0087a",
            "6529bb6b64c8490376bd"

        )
            .then((rs) => {
                setMetaAnual(rs.anual.toFixed(2))
                setMetaMensal(rs.mensal.toFixed(2))
            })

        db
            .listDocuments(
                DBUID,
                collectionId
            )
            .then((response) => {
                response.documents.map((r) => {
                    if (r.tipo === "Receita") {
                        entradas += Number(r.valor);
                    } else {
                        saidas += Number(r.valor);
                    }
                });
                const saldototal = entradas - saidas;
                setSaldo(saldototal.toFixed(2));
                setEntradas(entradas.toFixed(2));
                setSaidas(saidas.toFixed(2));
            })
            .catch(console.error);

    }, []);

    db.listDocuments(
        DBUID,
        "651ca9adf3de7aad17d9",
        [
            Query.limit(7),
            Query.orderDesc("$createdAt")
        ]
    )
        .then((r) => {
            setProdutos(r.documents.map((response) => {
                return (
                    <div className="product-content">
                        <a target="_blank" href={"admin/products/" + response.$id}>
                            <img src={(response.PHOTOURL).length > 0 ? response.PHOTOURL[0] : response.PHOTOURL} />
                            <div>
                                <h2>{response.NAME_PRODUCT}</h2>
                                <p>{response.TYPE}</p>

                            </div>
                        </a>
                    </div>
                )
            }))
        })

    return (
        <div className="Admin-ContentDashBoard">
            <HeaderAdminPage />

            <div className="dashboard-cards">
                <section className="Admin-Btns-Wrapper-Acesso-Rapido">
                    <h2 id="titleacessorapido">Acesso Rápido</h2>
                    <div className="leftside-wrapper-btn">
                        <button onClick={() => {
                            window.location.href = "/admin/products/add";
                        }}>Adicionar Produtos</button>
                        <button onClick={() => {
                            window.location.href = "/admin/pedidos";
                        }}>Pedidos realizados</button>
                        <button onClick={() => {
                            window.location.href = "/admin/planilhas";
                        }}>Planilhas</button>
                    </div>
                    <div className="rightsideside-wrapper-btn">

                    </div>
                </section>

                <section className="Cards-Dashboards">
                    <div className="Cards-Top">

                    {metaAnual - saldoWrap <= 0 && metaMensal - saldoWrap <= 0 
                    ?
                    <div className="Card-Middle-Top" id="greenbackground-card-middle" >
                            <a href="admin/metas">
                                <h2><i className="fa-solid fa-bullseye"></i> Suas Metas:</h2>
                                <p>Anual: R$<span>{metaAnual}</span></p>
                                <p>Mensal: R$<span>{metaMensal}</span></p>
                                <div className="bottom-middle-top-card">
                                    {metaAnual - saldoWrap <= 0
                                        ?
                                        <p>Conseguimos! Batemos a meta anual e estamos com <span id="greenlight">R${saldoWrap - metaAnual}</span> acima da meta.</p>
                                        :
                                        <p>Faltam: R${metaAnual - saldoWrap} para alcançar sua meta anual.</p>
                                    }
                                    {metaMensal - saldoWrap <= 0
                                        ?
                                        <p>Conseguimos! Batemos a meta mensal e estamos com <span id="greenlight">R${saldoWrap - metaMensal}</span> acima da meta.</p>
                                        :
                                        <p>Faltam: R${metaMensal - saldoWrap} para alcançar sua meta mensal.</p>
                                    }

                                </div>
                            </a>
                        </div> 
                    : 
                    <div className="Card-Middle-Top" >
                    <a href="admin/metas">
                        <h2><i className="fa-solid fa-bullseye"></i> Suas Metas:</h2>
                        <p>Anual: R$<span>{metaAnual}</span></p>
                        <p>Mensal: R$<span>{metaMensal}</span></p>
                        <div className="bottom-middle-top-card">
                            {metaAnual - saldoWrap <= 0
                                ?
                                <p>Conseguimos! Batemos a meta anual e estamos com <span id="greenlight">R${saldoWrap - metaAnual}</span> acima da meta.</p>
                                :
                                <p>Faltam: R${(metaAnual - saldoWrap).toFixed(2)} para alcançar sua meta anual.</p>
                            }
                            {metaMensal - saldoWrap <= 0
                                ?
                                <p>Conseguimos! Batemos a meta mensal e estamos com <span id="greenlight">R${saldoWrap - metaMensal}</span> acima da meta.</p>
                                :
                                <p>Faltam: R${(metaMensal - saldoWrap).toFixed(2)} para alcançar sua meta mensal.</p>
                            }

                        </div>
                    </a>
                </div>} 
                        

                        <div className="Card-Large-Top">
                            <a href="#">
                                <h2></h2>
                            </a>
                        </div>

                    </div>

                    <div className="Cards-Left-Middle">
                        <div className="leftside-itens">
                            <h2 id="titleacessorapido">Renda</h2>
                            <div className="Cards-Low-Top">
                                <div className="Card-Low-Top-Inner">
                                    <a href="admin/planilhas/planilha-despesas">
                                        <i className="fa-solid fa-money-bill"></i>
                                        <h2>Saldo</h2>
                                        <div className="card_ipt_inner">
                                            <p>R$ <span>{saldoWrap}</span></p>
                                        </div>
                                    </a>
                                </div>
                                <div className="Card-Low-Top-Inner">
                                    <a href="admin/planilhas/planilha-despesas">
                                        <i className="fa-solid fa-piggy-bank"></i>
                                        <h2>Entradas</h2>
                                        <div className="card_ipt_inner">
                                            <p id="entradas">R$ <span>{entradasWrap}</span></p>
                                        </div>
                                    </a>
                                </div>
                                <div className="Card-Low-Top-Inner">
                                    <a href="admin/planilhas/planilha-despesas">
                                        <i className="fa-solid fa-piggy-bank"></i>
                                        <h2>Saídas</h2>
                                        <div className="card_ipt_inner">
                                            <p id="saidas">R$ <span>{saidasWrap}</span></p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="Cards-Middle-Top">
                                <div className="Card-Mid-Top-Inner">
                                    <a href="#">
                                        <h2></h2>
                                    </a>
                                </div>
                                <div className="Card-Mid-Top-Inner">
                                    <a href="#">
                                        <h2></h2>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="rightside-itens">
                            <h2 id="titleacessorapido">Produtos</h2>
                            <div className="Card-Large-Hg">
                                <div className="products-content-wrap">
                                    {Produtos}

                                </div>
                            </div>
                        </div>

                    </div>


                </section>
            </div>

        </div>

    )
}