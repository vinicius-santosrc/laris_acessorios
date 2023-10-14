import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function NavigationLeft() {

    const [MenuMobile, setMenuMobile] = useState(false)

    function changemenumobile() {
        
        if(MenuMobile == true) {
            document.querySelector(".AdminPage-DashBoard nav").style.display = "none";
            setMenuMobile(false)
        }
        else {
            document.querySelector(".AdminPage-DashBoard nav").style.display = "block";
            setMenuMobile(true)
        }
    }

    return (
        <>
            <nav>
                <div className="navigation-bar-logo-top">
                    <img src={window.location.origin + '/static/media/logolaris.png'} />
                </div>
                <h1 class="title-opcoes-pc">Opções de Navegação</h1>
                <ul className="navigation-bar-left-side">
                    {window.location.pathname == '/admin'
                        ?
                        <li>
                            <a id="selectednavigation" href={window.location.origin + '/admin'}>
                                <i className="fa-solid fa-globe"></i>
                                <span>Dashboard</span>

                            </a>
                        </li>
                        :
                        <li>
                            <a href={window.location.origin + '/admin'}>
                                <i className="fa-solid fa-globe"></i>
                                <span>Dashboard</span>

                            </a>
                        </li>
                    }

                    {window.location.href.includes('products')
                        ?
                        <li>
                            <a id="selectednavigation" href={window.location.origin + '/admin/products'}>
                                <i className="fa-solid fa-gem"></i>
                                <span>Produtos</span>
                            </a>
                        </li>
                        :
                        <li>
                            <a href={window.location.origin + '/admin/products'}>
                                <i className="fa-solid fa-gem"></i>
                                <span>Produtos</span>
                            </a>
                        </li>
                    }

                    {window.location.href.includes('admin/planilhas')
                        ?
                        <li>
                            <a id="selectednavigation" href={window.location.origin + '/admin/planilhas'}>
                                <i className="fa-regular fa-calendar-days"></i>
                                <span>Planilhas</span>
                            </a>
                        </li>
                        :
                        <li>
                            <a href={window.location.origin + '/admin/planilhas'}>
                                <i className="fa-regular fa-calendar-days"></i>
                                <span>Planilhas</span>
                            </a>
                        </li>
                    }

                    {window.location.href.includes('admin/pedidos')
                        ?
                        <li>
                            <a id="selectednavigation" href={window.location.origin + '/admin/pedidos'}>
                                <i className="fa-regular fa-clipboard"></i>
                                <span>Pedidos</span>
                            </a>
                        </li>
                        :
                        <li>
                            <a href={window.location.origin + '/admin/pedidos'}>
                                <i className="fa-regular fa-clipboard"></i>
                                <span>Pedidos</span>
                            </a>
                        </li>
                    }

                    {window.location.href.includes('admin/plano-semanal')
                        ?
                        <li>
                            <a id="selectednavigation" href={window.location.origin + '/admin/plano-semanal'}>
                                <i className="fa-regular fa-calendar-check"></i>
                                <span>Plano Semanal</span>
                            </a>
                        </li>
                        :
                        <li>
                            <a href={window.location.origin + '/admin/plano-semanal'}>
                                <i className="fa-regular fa-calendar-check"></i>
                                <span>Plano Semanal</span>
                            </a>
                        </li>
                    }

                    {window.location.href.includes('admin/settings')
                        ?
                        <li>
                            <a href={window.location.origin + '/admin/settings'}>
                                <i className="fa-solid fa-gear"></i>
                                <span>Configurações</span>
                            </a>
                        </li>
                        :
                        <li>
                            <a href={window.location.origin + '/admin/settings'}>
                                <i className="fa-solid fa-gear"></i>
                                <span>Configurações</span>
                            </a>
                        </li>
                    }


                </ul>

            </nav >
            <div className="navigation-bottom">

            </div>
            <header className="navigation-header-cell">
                <div className="leftside-navigation-bar-cellphone">
                    {MenuMobile == false ? <button onClick={changemenumobile}><i className="fa-solid fa-bars"></i></button> : <button onClick={changemenumobile}><i className="fa-solid fa-xmark"></i></button>}
                    {window.location.pathname == "/admin" ? <h2>Dashboard</h2> : null}
                    {window.location.href.includes("/admin/products") ? <h2>Produtos</h2> : null}
                    {window.location.href.includes("/admin/planilhas") ? <h2>Planilhas</h2> : null}
                    {window.location.href.includes("/admin/pedidos") ? <h2>Pedidos</h2> : null}
                    {window.location.href.includes("/errors") ? <h2>Docs</h2> : null}
                    {window.location.href.includes("/metas") ? <h2>Metas</h2> : null}
                </div>
                <div className="rightside-navigation-bar-cellphone">
                    
                </div>
            </header>

        </>
    )
}