/**
 * Creation Date: 09/11/2023
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

function CardItems(products) {
    const photos = JSON.parse(products.data.photoURL)
    
    return (
        <div className="Product-Card-Wrapper" key={products.data.id} id={products.data.id}>
            <section className="Section-Product-Card-Wrapper">
                <a href={window.location.origin + "/produto/" + products.data.url} className="Product-Card-Link-Content">
                    <article className="Product-Card-Inside-Content">
                        <div className="Product-Jewel-Image-Content Laris-Image-Jewel">
                            <img className="Product-Jewel-Image-Wrapper" src={window.location.origin + products != "" && photos && photos.length > 0 ? photos[0] : ''} loading="auto" alt={products.data.name_product} />
                        </div>
                        <div className="Product-Jewel-Content-Data">
                            <div className="Product-Availabilities">
                                {products.data.personalizavel == true ? <p className="personalizado-loja">Personalizado</p> :
                                    <>
                                        {products.data.disponibilidade == true ?
                                            <p className='novidade-loja'>Disponível</p>
                                            :
                                            <p className="esgotado-loja">Esgotado</p>
                                        }
                                    </>}
                            </div>
                            <div className="Product-Jewel-Title">
                                <h3 className="Product-Jewel-Title-Content">
                                    <span>{products.data.name_product}</span>
                                </h3>
                            </div>
                            <div className="Product-Rating">
                                <img src={null} />
                            </div>
                            <div className="Product-Price-Show">
                                <h4><span>R$ {products.data.desconto > 0 ?
                                    <span><s>{products.data.price.toFixed(2)}</s> R$ {(products.data.price - products.data.desconto).toFixed(2)}</span>
                                    :
                                    <span>{(Number(products.data.price) - Number(products.data.desconto)).toFixed(2)}</span>
                                }</span></h4>
                            </div>
                        </div>
                    </article>
                </a>
            </section>
        </div>
    )

    /*return (
        <a href={window.location.origin + "/produto/" + products.data.URL} id={products.data.$id} key={products.data.$id}>
            <div className='item-prata' id={products.data.$id}>
                <img src={window.location.origin + products != "" && products.data.PHOTOURL && products.data.PHOTOURL.length > 0 ? products.data.PHOTOURL[0] : ""} alt="" />
                <div className="text-prata">
                    {products.data.PERSONALIZAVEL == true ? <p className="personalizado-loja">Personalizado</p> :
                        <>
                            {products.data.AVALIABLE == true ?
                                <p className='novidade-loja'>Disponível</p>
                                :
                                <p className="esgotado-loja">Esgotado</p>
                            }
                        </>}
                    <h1 className="nome-prata">{products.data.NAME_PRODUCT}</h1>

                    <div className="promocao">
                        {products.data.DESCONTO > 0 ?
                            <p className="preço-loja"><s style={{ color: 'darkgray' }}>R$ {products.data.PRICE.toFixed(2)}</s> R$ {(products.data.PRICE - products.data.DESCONTO).toFixed(2)}</p>
                            :
                            <p className="preço-loja">R$ {(products.data.PRICE - products.data.DESCONTO).toFixed(2)}</p>
                        }
                        <p className="opcoesdepaga">Pague à vista, Pix ou no Cartão</p>
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