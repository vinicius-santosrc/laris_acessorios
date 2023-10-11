import { useEffect } from "react"
import HeaderAdminPage from "./HeaderAdminPage"


export default function ContentDashboard() {
    return (
        <div className="Admin-ContentDashBoard">
            <HeaderAdminPage />

            <div className="dashboard-cards">
                <section className="Admin-Btns-Wrapper-Acesso-Rapido">
                    <h2 id="titleacessorapido">Acesso Rápido</h2>
                    <div className="leftside-wrapper-btn">
                        <button>Adicionar Produtos</button>
                        <button>Pedidos realizados</button>
                        <button>Planilhas</button>
                    </div>
                    <div className="rightsideside-wrapper-btn">

                    </div>
                </section>

                <section className="Cards-Dashboards">
                    <div className="Cards-Top">

                        <div className="Card-Middle-Top">
                            <a href="#">
                                <h2>METAS</h2>
                                <p>Metas mensais e anuais para a concluídas.</p>
                                <div className="bottom-middle-top-card">

                                </div>
                            </a>
                        </div>

                        <div className="Card-Large-Top">
                            <a href="#">
                                <h2></h2>
                            </a>
                        </div>

                    </div>

                    <div className="Cards-Left-Middle">
                        <div className="leftside-itens">
                            <div className="Cards-Low-Top">
                                <div className="Card-Low-Top-Inner">
                                    <a href="#">
                                        <i className="fa-solid fa-money-bill"></i>
                                        <h2>Saldo</h2>
                                        <div className="card_ipt_inner">
                                            <p>R$ <span>00,00</span></p>
                                        </div>
                                    </a>
                                </div>
                                <div className="Card-Low-Top-Inner">
                                    <a href="#">
                                        <i className="fa-solid fa-piggy-bank"></i>
                                        <h2>Entradas</h2>
                                        <div className="card_ipt_inner">
                                            <p>R$ <span>00,00</span></p>
                                        </div>
                                    </a>
                                </div>
                                <div className="Card-Low-Top-Inner">
                                    <a href="#">
                                        <i className="fa-solid fa-piggy-bank"></i>
                                        <h2>Saídas</h2>
                                        <div className="card_ipt_inner">
                                            <p>R$ <span>00,00</span></p>
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
                            <div className="Card-Large-Hg"></div>
                        </div>

                    </div>


                </section>
            </div>

        </div>

    )
}