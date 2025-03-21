/**
 * Creation Date: 05/09/2023
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

export default function BannerTopPage(props) {
    function openfiltros() {
        let filtros = document.querySelector('.filtros-select-cell')
        let back = document.querySelector('.background-cart')
        back.style.display = 'block'
        filtros.style.display = 'block'

    }

    return (
        <>
            {window.location.href.includes('novidades')
                ?
                <>
                    <div className="novidades-capa">
                        <img src="./static/media/product-images/novidades-logo.png" alt="" />
                    </div>
                    <div className="novidades-capa-cell">
                        <img src="./static/media/product-images/novidades-logo-cell.png" alt="" />
                    </div></>
                :
                <>
                    {window.location.href.includes("promocoes")
                        ?
                        <>
                            <div className="novidades-capa">
                                <img src="./static/media/product-images/promocoescardpc.png" alt="" />
                            </div>
                            <div className="novidades-capa-cell">
                                <img src="./static/media/product-images/promocoescardcell.png" alt="" />
                            </div>
                        </>
                        :
                        <div className="card">
                            <div className='leftside'>
                                <div className='direct'>
                                    <label><a href={window.location.origin}>Página Inicial</a><a href="">{props.name}</a></label>
                                </div>
                                <div className="topcard">
                                    <h1>{props.name}</h1>
                                    <p>{props.QTD_PRODT} Produtos</p>
                                </div>
                                <div>
                                    <p className='desccard'>
                                        {props.description}
                                    </p>
                                </div>
                            </div>

                        </div>
                    }

                </>
            }


            


            <section className="ordenar">
                <label for="select">ORDENAR POR</label>
                <select>
                    <option className="ordenarselect">MAIS RECENTES</option>
                </select>
            </section>

            <section className="ordenar-cell">
                <div className='option-order'>
                    <label>FILTROS <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                </div>
                <div className='option-order2'>
                    <label for="select">ORDENAR POR</label>
                    <select>
                        <option className="ordenarselect">MAIS RECENTES</option>
                    </select>
                </div>
            </section>
        </>
    )
}