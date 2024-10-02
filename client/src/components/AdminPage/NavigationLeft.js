/**
 * Creation Date: 09/01/2024
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function NavigationLeft() {

    const [MenuMobile, setMenuMobile] = useState(false)

    function changemenumobile() {

        if (MenuMobile == true) {
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
                            <Link id="selectednavigation" to={window.location.origin + '/admin'}>
                                <i className="fa-solid fa-globe"></i>
                                <span>Dashboard</span>

                            </Link>
                        </li>
                        :
                        <li>
                            <Link to={window.location.origin + '/admin'}>
                                <i className="fa-solid fa-globe"></i>
                                <span>Dashboard</span>

                            </Link>
                        </li>
                    }

                    {window.location.href.includes('products')
                        ?
                        <li>
                            <Link id="selectednavigation" to={window.location.origin + '/admin/products'}>
                                <i className="fa-solid fa-gem"></i>
                                <span>Produtos</span>
                            </Link>
                        </li>
                        :
                        <li>
                            <Link to={window.location.origin + '/admin/products'}>
                                <i className="fa-solid fa-gem"></i>
                                <span>Produtos</span>
                            </Link>
                        </li>
                    }

                    {window.location.href.includes('clientes')
                        ?
                        <li>
                            <Link id="selectednavigation" to={window.location.origin + '/admin/clientes'}>
                                <i className="fa-solid fa-clipboard-user"></i>
                                <span>Clientes</span>
                            </Link>
                        </li>
                        :
                        <li>
                            <Link to={window.location.origin + '/admin/clientes'}>
                                <i className="fa-solid fa-clipboard-user"></i>
                                <span>Clientes</span>
                            </Link>
                        </li>
                    }

                    {window.location.href.includes('admin/planilhas')
                        ?
                        <li>
                            <Link id="selectednavigation" to={window.location.origin + '/admin/planilhas'}>
                                <i className="fa-regular fa-calendar-days"></i>
                                <span>Planilhas</span>
                            </Link>
                        </li>
                        :
                        <li>
                            <Link to={window.location.origin + '/admin/planilhas'}>
                                <i className="fa-regular fa-calendar-days"></i>
                                <span>Planilhas</span>
                            </Link>
                        </li>
                    }

                    {window.location.href.includes('admin/pedidos')
                        ?
                        <li>
                            <Link id="selectednavigation" to={window.location.origin + '/admin/pedidos'}>
                                <i className="fa-regular fa-clipboard"></i>
                                <span>Pedidos</span>
                            </Link>
                        </li>
                        :
                        <li>
                            <Link to={window.location.origin + '/admin/pedidos'}>
                                <i className="fa-regular fa-clipboard"></i>
                                <span>Pedidos</span>
                            </Link>
                        </li>
                    }

                    {window.location.href.includes('admin/planejamentos')
                        ?
                        <li>
                            <Link id="selectednavigation" to={window.location.origin + '/admin/planejamentos'}>
                                <i className="fa-regular fa-calendar-check"></i>
                                <span>Planejamentos</span>
                            </Link>
                        </li>
                        :
                        <li>
                            <Link to={window.location.origin + '/admin/planejamentos'}>
                                <i className="fa-regular fa-calendar-check"></i>
                                <span>Planejamentos</span>
                            </Link>
                        </li>
                    }

                    {window.location.href.includes('admin/cupons')
                        ?
                        <li>
                            <Link id="selectednavigation" to={window.location.origin + '/admin/cupons'}>
                                <i className="fa-solid fa-ticket-simple"></i>
                                <span>Cupons</span>
                            </Link>
                        </li>
                        :
                        <li>
                            <Link to={window.location.origin + '/admin/cupons'}>
                                <i className="fa-solid fa-ticket-simple"></i>
                                <span>Cupons</span>
                            </Link>
                        </li>
                    }

                    {window.location.href.includes('admin/imagens-pagina')
                        ?
                        <li>
                            <Link id="selectednavigation" to={window.location.origin + '/admin/imagens-pagina'}>
                                <i className="fa-regular fa-image"></i>
                                <span>Imagens</span>
                            </Link>
                        </li>
                        :
                        <li>
                            <Link to={window.location.origin + '/admin/imagens-pagina'}>
                                <i className="fa-regular fa-image"></i>
                                <span>Imagens</span>
                            </Link>
                        </li>
                    }

                    {window.location.href.includes('admin/settings')
                        ?
                        <li>
                            <Link to={window.location.origin + '/admin/settings'}>
                                <i className="fa-solid fa-gear"></i>
                                <span>Configurações</span>
                            </Link>
                        </li>
                        :
                        <li>
                            <Link to={window.location.origin + '/admin/settings'}>
                                <i className="fa-solid fa-gear"></i>
                                <span>Configurações</span>
                            </Link>
                        </li>
                    }




                </ul>

            </nav >
            <div className="navigation-bottom">

            </div>
            <header className="navigation-header-cell">
                <div className="leftside-navigation-bar-cellphone">
                    {MenuMobile == false ? <button onClick={changemenumobile}><i className="fa-solid fa-bars"></i></button> : <button onClick={changemenumobile}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.46967 5.46967C5.76256 5.17678 6.23744 5.17678 6.53033 5.46967L12 10.9393L17.4697 5.46967C17.7626 5.17678 18.2374 5.17678 18.5303 5.46967C18.8232 5.76256 18.8232 6.23744 18.5303 6.53033L13.0607 12L18.5303 17.4697C18.8232 17.7626 18.8232 18.2374 18.5303 18.5303C18.2374 18.8232 17.7626 18.8232 17.4697 18.5303L12 13.0607L6.53033 18.5303C6.23744 18.8232 5.76256 18.8232 5.46967 18.5303C5.17678 18.2374 5.17678 17.7626 5.46967 17.4697L10.9393 12L5.46967 6.53033C5.17678 6.23744 5.17678 5.76256 5.46967 5.46967Z" fill="#0F172A" />
                    </svg>
                    </button>}
                    {window.location.pathname == "/admin" ? <h2>Dashboard</h2> : null}
                    {window.location.href.includes("/admin/products") ? <h2>Produtos</h2> : null}
                    {window.location.href.includes("/admin/planilhas") ? <h2>Planilhas</h2> : null}
                    {window.location.href.includes("/admin/pedidos") ? <h2>Pedidos</h2> : null}
                    {window.location.href.includes("/admin/clientes") ? <h2>Clientes</h2> : null}
                    {window.location.href.includes("/errors") ? <h2>Docs</h2> : null}
                    {window.location.href.includes("/metas") ? <h2>Metas</h2> : null}
                    {window.location.href.includes("/planejamentos") ? <h2>Planejamentos</h2> : null}
                    {window.location.href.includes("/imagens-pagina") ? <h2>Imagens</h2> : null}
                    {window.location.href.includes("/cupons") ? <h2>Cupons</h2> : null}
                </div>
                <div className="rightside-navigation-bar-cellphone">

                </div>
            </header>

        </>
    )
}