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
                    <div class="novidades-capa">
                        <img src="./static/media/product-images/novidades-logo.png" alt="" />
                    </div>
                    <div class="novidades-capa-cell">
                        <img src="./static/media/product-images/novidades-logo-cell.png" alt="" />
                    </div></>
                :
                <>
                    {window.location.href.includes("promocoes")
                        ?
                        <>
                            <div class="novidades-capa">
                                <img src="./static/media/product-images/promocoescardpc.png" alt="" />
                            </div>
                            <div class="novidades-capa-cell">
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
                            <div className="imgside">
                                <img src="imgs/pratas925.png" alt="" />
                            </div>
                        </div>
                    }

                </>
            }




            <section className="quadros-inicio">
                <label>Agradecemos por escolher seu produto da loja LARI'S Acessórios</label>
            </section>

            {window.location.href.includes("/novidades") || window.location.href.includes("promocoes")
                ?
                <>
                    <div class='filtros-select'>
                        <div class="filtros-op">
                            <a href="pratas">
                                <div>
                                    <label>PRATAS 925 <i class="fa-sharp fa-solid fa-caret-down"></i></label>
                                </div>
                            </a>
                            <a href="micangas">
                                <div>
                                    <label>MIÇANGAS <i class="fa-sharp fa-solid fa-caret-down"></i></label>
                                </div>
                            </a>
                            <a href="cetim">
                                <div>
                                    <label>CETIM <i class="fa-sharp fa-solid fa-caret-down"></i></label>
                                </div>
                            </a>
                        </div>
                    </div>

                    <section class="filtros-select-cell">
                        <h1>Filtros</h1>
                        <div class="filtros-op-cell">
                            <a href="pratas">
                                <div>
                                    <label>PRATAS 925 <i class="fa-sharp fa-solid fa-caret-down"></i></label>
                                </div>
                            </a>
                            <a href="micangas">
                                <div>
                                    <label>MIÇANGAS <i class="fa-sharp fa-solid fa-caret-down"></i></label>
                                </div>
                            </a>
                            <a href="cetim">
                                <div>
                                    <label>CETIM <i class="fa-sharp fa-solid fa-caret-down"></i></label>
                                </div>
                            </a>
                        </div>
                    </section>


                </>
                :
                <></>}


            {window.location.href.includes("/pratas") ?
                <>
                    <div className='filtros-select'>
                        <div className="filtros-op">
                            <a href="pratas">
                                <div>
                                    {window.location.pathname == '/pratas'
                                        ?
                                        <label className='selected'>TUDO <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                        :
                                        <label>TUDO <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                    }
                                </div>
                            </a>
                            <a href="pratas-colares">
                                <div>
                                    {window.location.pathname == '/pratas-colares'
                                        ?
                                        <label className='selected'>COLARES <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                        :
                                        <label>COLARES <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                    }
                                </div>
                            </a>
                            <a href="pratas-brincos">
                                <div>
                                    {window.location.pathname == '/pratas-brincos'
                                        ?
                                        <label className='selected'>BRINCOS <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                        :
                                        <label>BRINCOS <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                    }
                                </div>
                            </a>
                            <a href="pratas-aneis">
                                <div>
                                    {window.location.pathname == '/pratas-aneis'
                                        ?
                                        <label className='selected'>ANÉIS <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                        :
                                        <label>ANÉIS <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                    }
                                </div>
                            </a>
                            <a href="pratas-pulseiras">
                                <div>
                                    {window.location.pathname == '/pratas-pulseiras'
                                        ?
                                        <label className='selected'>PULSEIRAS <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                        :
                                        <label>PULSEIRAS <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                    }
                                </div>
                            </a>
                            <a href="pratas-braceletes">
                                <div>
                                    {window.location.pathname == '/pratas-braceletes'
                                        ?
                                        <label className='selected'>BRACELETES <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                        :
                                        <label>BRACELETES <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                    }
                                </div>
                            </a>
                            <a href="pratas-tornozeleiras">
                                <div>
                                    {window.location.pathname == '/pratas-tornozeleiras'
                                        ?
                                        <label className='selected'>TORNOZELEIRAS <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                        :
                                        <label>TORNOZELEIRAS <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                    }
                                </div>
                            </a>
                            <a href="pratas-piercing">
                                <div>
                                    {window.location.pathname == '/pratas-piercing'
                                        ?
                                        <label className='selected'>PIERCING <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                        :
                                        <label>PIERCING <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                    }
                                </div>
                            </a>
                        </div>
                    </div>

                    <section className="filtros-select-cell">
                        <h1>Filtros</h1>
                        <div className="filtros-op-cell">
                            <a href="pratas">
                                <div>
                                    {window.location.pathname == '/pratas'
                                        ?
                                        <label className='selected'>TUDO <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                        :
                                        <label>TUDO <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                    }
                                </div>
                            </a>
                            <a href="pratas-colares">
                                <div>
                                    {window.location.pathname == '/pratas-colares'
                                        ?
                                        <label className='selected'>COLARES <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                        :
                                        <label>COLARES <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                    }
                                </div>
                            </a>
                            <a href="pratas-brincos">
                                <div>
                                    {window.location.pathname == '/pratas-brincos'
                                        ?
                                        <label className='selected'>BRINCOS <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                        :
                                        <label>BRINCOS <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                    }
                                </div>
                            </a>
                            <a href="pratas-aneis">
                                <div>
                                    {window.location.pathname == '/pratas-aneis'
                                        ?
                                        <label className='selected'>ANÉIS <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                        :
                                        <label>ANÉIS <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                    }
                                </div>
                            </a>
                            <a href="pratas-pulseiras">
                                <div>
                                    {window.location.pathname == '/pratas-pulseiras'
                                        ?
                                        <label className='selected'>PULSEIRAS <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                        :
                                        <label>PULSEIRAS <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                    }
                                </div>
                            </a>
                            <a href="pratas-braceletes">
                                <div>
                                    {window.location.pathname == '/pratas-braceletes'
                                        ?
                                        <label className='selected'>BRACELETES <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                        :
                                        <label>BRACELETES <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                    }
                                </div>
                            </a>
                            <a href="pratas-tornozeleiras">
                                <div>
                                    {window.location.pathname == '/pratas-tornozeleiras'
                                        ?
                                        <label className='selected'>TORNOZELEIRAS <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                        :
                                        <label>TORNOZELEIRAS <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                    }
                                </div>
                            </a>
                            <a href="pratas-piercing">
                                <div>
                                    {window.location.pathname == '/pratas-piercing'
                                        ?
                                        <label className='selected'>PIERCING <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                        :
                                        <label>PIERCING <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                    }
                                </div>
                            </a>
                        </div>
                    </section>
                </>
                :
                ""
            }

            {window.location.href.includes("/micangas")
                ?
                <>
                    <div className='filtros-select'>
                        <div className="filtros-op">
                            <a href="micangas">
                                <div>
                                    {window.location.pathname == '/micangas'
                                        ?
                                        <label className='selected'>TUDO <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                        :
                                        <label>TUDO <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                    }

                                </div>
                            </a>
                            <a href="micangas-colares">
                                <div>
                                    {window.location.pathname == '/micangas-colares'
                                        ?
                                        <label className='selected'>COLARES <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                        :
                                        <label>COLARES <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                    }
                                </div>
                            </a>
                            <a href="micangas-chockers">
                                <div>
                                    {window.location.pathname == '/micangas-chockers'
                                        ?
                                        <label className='selected'> CHOCKERS <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                        :
                                        <label> CHOCKERS <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                    }
                                </div>
                            </a>
                            <a href="micangas-pulseiras">
                                <div>
                                    {window.location.pathname == '/micangas-pulseiras'
                                        ?
                                        <label className='selected'>PULSEIRAS <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                        :
                                        <label>PULSEIRAS <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                    }
                                </div>
                            </a>
                            <a href="micangas-phone-strap">
                                <div>
                                    {window.location.pathname == '/micangas-phone-strap'
                                        ?
                                        <label className='selected'> PHONE STRAP <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                        :
                                        <label> PHONE STRAP <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                    }
                                </div>
                            </a>
                            <a href="micangas-chaveiros">
                                <div>
                                    {window.location.pathname == '/micangas-chaveiros'
                                        ?
                                        <label className='selected'> CHAVEIROS <i i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                        :
                                        <label> CHAVEIROS <i i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                    }
                                </div>
                            </a>
                        </div>
                    </div >

                    <section className="filtros-select-cell">
                        <h1>Filtros</h1>
                        <div className="filtros-op-cell">
                            <a href="micangas">
                                <div>
                                    {window.location.pathname == '/micangas'
                                        ?
                                        <label className='selected'>TUDO <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                        :
                                        <label>TUDO <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                    }

                                </div>
                            </a>
                            <a href="micangas-colares">
                                <div>
                                    {window.location.pathname == '/micangas-colares'
                                        ?
                                        <label className='selected'>COLARES <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                        :
                                        <label>COLARES <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                    }
                                </div>
                            </a>
                            <a href="micangas-chockers">
                                <div>
                                    {window.location.pathname == '/micangas-chockers'
                                        ?
                                        <label className='selected'>CHOCKERS <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                        :
                                        <label>CHOCKERS <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                    }
                                </div>
                            </a>
                            <a href="micangas-pulseiras">
                                <div>
                                    {window.location.pathname == '/micangas-pulseiras'
                                        ?
                                        <label className='selected'>PULSEIRAS <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                        :
                                        <label>PULSEIRAS <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                    }
                                </div>
                            </a>
                            <a href="micangas-phone-strap">
                                <div>
                                    {window.location.pathname == '/micangas-phone-strap'
                                        ?
                                        <label className='selected'>PHONE-STRAP <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                        :
                                        <label>PHONE-STRAP <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                    }
                                </div>
                            </a>
                            <a href="micangas-chaveiros">
                                <div>
                                    {window.location.pathname == '/micangas-chaveiros'
                                        ?
                                        <label className='selected'>CHAVEIROS <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                        :
                                        <label>CHAVEIROS <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                    }
                                </div>
                            </a>
                        </div>
                    </section >
                </>
                :
                ""
            }

            {
                window.location.href.includes("/cetim")
                    ?
                    <>
                        <div className='filtros-select'>
                            <div className="filtros-op">
                                <a href="cetim">
                                    <div>
                                        {window.location.pathname == '/cetim'
                                            ?
                                            <label className='selected'>TUDO <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                            :
                                            <label>TUDO <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                        }
                                    </div>
                                </a>
                                <a href="cetim-scrunchie">
                                    <div>
                                        {window.location.pathname == '/cetim-scrunchie'
                                            ?
                                            <label className='selected'>SCRUNCHIE <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                            :
                                            <label>SCRUNCHIE <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                        }
                                    </div>
                                </a>
                                <a href="cetim-toucas">
                                    <div>
                                        {window.location.pathname == '/cetim-toucas'
                                            ?
                                            <label className='selected'>TOUCAS <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                            :
                                            <label>TOUCAS <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                        }
                                    </div>
                                </a>
                            </div>

                            <section className="filtros-select-cell">
                                <h1>Filtros</h1>
                                <div className="filtros-op-cell">
                                    <a href="cetim">
                                        <div>
                                            {window.location.pathname == '/cetim'
                                                ?
                                                <label className='selected'>TUDO <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                                :
                                                <label>TUDO <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                            }
                                        </div>
                                    </a>
                                    <a href="cetim-scrunchie">
                                        <div>
                                            {window.location.pathname == '/cetim-scrunchie'
                                                ?
                                                <label className='selected'>SCRUNCHIE <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                                :
                                                <label>SCRUNCHIE <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                            }
                                        </div>
                                    </a>
                                    <a href="cetim-toucas">
                                        <div>
                                            {window.location.pathname == '/cetim-toucas'
                                                ?
                                                <label className='selected'>TOUCAS <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                                :
                                                <label>TOUCAS <i className="fa-sharp fa-solid fa-caret-down"></i></label>
                                            }
                                        </div>
                                    </a>

                                </div>
                            </section>
                        </div>
                    </>
                    :
                    ""
            }



            <section className="ordenar">
                <label for="select">ORDENAR POR</label>
                <select>
                    <option className="ordenarselect">MAIS RECENTES</option>
                </select>
            </section>

            <section className="ordenar-cell">
                <div className='option-order' onClick={openfiltros}>
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