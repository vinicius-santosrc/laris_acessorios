import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function NavigationLeft() {



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
        </>
    )
}