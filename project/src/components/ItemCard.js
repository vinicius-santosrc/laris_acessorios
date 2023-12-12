function CardItems(products) {

    return (
        <div className="Product-Card-Wrapper" key={products.data.$id} id={products.data.$id}>
            <section className="Section-Product-Card-Wrapper">
                <a href={window.location.origin + "/produto/" + products.data.URL} className="Product-Card-Link-Content">
                    <article className="Product-Card-Inside-Content">
                        <div className="Product-Jewel-Image-Content Laris-Image-Jewel">
                            <img className="Product-Jewel-Image-Wrapper" src={window.location.origin + products != "" && products.data.PHOTOURL && products.data.PHOTOURL.length > 0 ? products.data.PHOTOURL[0] : ''} loading="auto" alt={products.data.NAME_PRODUCT} />
                        </div>
                        <div className="Product-Jewel-Content-Data">
                            <div className="Product-Availabilities">
                                {products.data.PERSONALIZAVEL == true ? <p class="personalizado-loja">Personalizado</p> :
                                    <>
                                        {products.data.AVALIABLE == true ?
                                            <p class='novidade-loja'>Disponível</p>
                                            :
                                            <p class="esgotado-loja">Esgotado</p>
                                        }
                                    </>}
                            </div>
                            <div className="Product-Jewel-Title">
                                <h3 className="Product-Jewel-Title-Content">
                                    <span>{products.data.NAME_PRODUCT}</span>
                                </h3>
                            </div>
                            <div className="Product-Rating">
                                <img src={null} />
                            </div>
                            <div className="Product-Price-Show">
                                <h4><span>R$ {products.data.DESCONTO > 0 ?
                                    <span><s>{products.data.PRICE.toFixed(2)}</s> R$ {(products.data.PRICE - products.data.DESCONTO).toFixed(2)}</span>
                                    :
                                    <span>{(products.data.PRICE - products.data.DESCONTO).toFixed(2)}</span>
                                }</span></h4>
                            </div>
                            <div className="Product-Bottom-Info">
                                <p><span>Page em até 10x de R$ {((products.data.PRICE - products.data.DESCONTO) / 10 * 1.07).toFixed(2)} com 7% juros.</span></p>
                            </div>
                        </div>
                    </article>
                </a>
            </section>
        </div>
    )

    /*return (
        <a href={window.location.origin + "/produto/" + products.data.URL} id={products.data.$id} key={products.data.$id}>
            <div class='item-prata' id={products.data.$id}>
                <img src={window.location.origin + products != "" && products.data.PHOTOURL && products.data.PHOTOURL.length > 0 ? products.data.PHOTOURL[0] : ""} alt="" />
                <div class="text-prata">
                    {products.data.PERSONALIZAVEL == true ? <p class="personalizado-loja">Personalizado</p> :
                        <>
                            {products.data.AVALIABLE == true ?
                                <p class='novidade-loja'>Disponível</p>
                                :
                                <p class="esgotado-loja">Esgotado</p>
                            }
                        </>}
                    <h1 class="nome-prata">{products.data.NAME_PRODUCT}</h1>

                    <div class="promocao">
                        {products.data.DESCONTO > 0 ?
                            <p class="preço-loja"><s style={{ color: 'darkgray' }}>R$ {products.data.PRICE.toFixed(2)}</s> R$ {(products.data.PRICE - products.data.DESCONTO).toFixed(2)}</p>
                            :
                            <p class="preço-loja">R$ {(products.data.PRICE - products.data.DESCONTO).toFixed(2)}</p>
                        }
                        <p class="opcoesdepaga">Pague à vista, Pix ou no Cartão</p>
                    </div>
                    <div className="botaocomprarprata">
                        <label>VER DETALHES</label>
                    </div>

                </div>
            </div>
        </a>
    )
    */
}

export default CardItems