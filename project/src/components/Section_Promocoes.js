import { Query } from "appwrite";
import db from "../lib/appwrite"
import { useEffect, useState } from "react";
import { Ring } from "@uiball/loaders";

export default function SectionProducts(props) {
    const DATABASE_UID = '651ca99af19b7afad3f1'
    const PRODUTOS_UID = '651ca9adf3de7aad17d9'

    const [ProductsNovidades, setProductsNovidades] = useState([])
    const [ProductForYouItems, setProductForYouItems] = useState([])
    const [ProductsPromocoes, setProductsPromocoes] = useState([])
    const PREFERENCE = localStorage.getItem("PREFERENCE")
    if (PREFERENCE) {

    }
    else {
        localStorage.setItem("PREFERENCE", 'MICANGAS')
    }

    function setProductFOrYou() {
        db.listDocuments(
            DATABASE_UID,
            PRODUTOS_UID,
            [
                Query.orderDesc("$createdAt"),
                Query.limit(4),
                Query.equal('TYPE', PREFERENCE)
            ]
        )
            .then((response) => {
                const ProductsArray = response.documents.map((products) => (
                    <a href={window.location.origin + "/produto/" + products.URL} id={products.$id} key={products.$id}>
                        <div class='item-prata' id={products.$id}>
                            <img src={window.location.origin + products != "" && products.PHOTOURL && products.PHOTOURL.length > 0 ? products.PHOTOURL[0] : ""} alt="" />
                            <div class="text-prata">
                                {products.PERSONALIZAVEL == true ? <p class="personalizado-loja">PERSONALIZADO</p> :
                                    <>
                                        {products.AVALIABLE == true ?
                                            <p class='novidade-loja'>Disponível</p>
                                            :
                                            <p class="esgotado-loja">ESGOTADO</p>
                                        }
                                    </>}
                                <h1 class="nome-prata">{products.NAME_PRODUCT}</h1>
                                <div class='estrelas'>
                                    <img src={window.location.origin + "/static/media/product-images/Nenhuma estrela.png"} alt="" />
                                </div>
                                <div class="promocao">
                                    {products.DESCONTO > 0 ?
                                        <p class="preço-loja"><s style={{ color: 'darkgray' }}>R$ {products.PRICE.toFixed(2)}</s> R$ {(products.PRICE - products.DESCONTO).toFixed(2)}</p>
                                        :
                                        <p class="preço-loja">R$ {(products.PRICE - products.DESCONTO).toFixed(2)}</p>
                                    }
                                    <p class="opcoesdepaga">Pague à vista ou Pix</p>
                                </div>
                                <div class="botaocomprarprata">
                                    <label>VER DETALHES</label>
                                </div>

                            </div>
                        </div>
                    </a>
                ));
                setProductForYouItems(ProductsArray)
            })
    }

    function setProductNovidades() {
        db.listDocuments(
            DATABASE_UID,
            PRODUTOS_UID,
            [
                Query.orderDesc("$createdAt"),
                Query.limit(4)
            ]
        )
            .then((response) => {
                const ProductsArray = response.documents.map((products) => (
                    <a href={window.location.origin + "/produto/" + products.URL} id={products.$id} key={products.$id}>
                        <div class='item-prata' id={products.$id}>
                            <img src={window.location.origin + products != "" && products.PHOTOURL && products.PHOTOURL.length > 0 ? products.PHOTOURL[0] : ""} alt="" />
                            <div class="text-prata">
                                {products.PERSONALIZAVEL == true ? <p class="personalizado-loja">PERSONALIZADO</p> :
                                    <>
                                        {products.AVALIABLE == true ?
                                            <p class='novidade-loja'>Disponível</p>
                                            :
                                            <p class="esgotado-loja">ESGOTADO</p>
                                        }
                                    </>}
                                <h1 class="nome-prata">{products.NAME_PRODUCT}</h1>
                                <div class='estrelas'>
                                    <img src={window.location.origin + "/static/media/product-images/Nenhuma estrela.png"} alt="" />
                                </div>
                                <div class="promocao">
                                    {products.DESCONTO > 0 ?
                                        <p class="preço-loja"><s style={{ color: 'darkgray' }}>R$ {products.PRICE.toFixed(2)}</s> R$ {(products.PRICE - products.DESCONTO).toFixed(2)}</p>
                                        :
                                        <p class="preço-loja">R$ {(products.PRICE - products.DESCONTO).toFixed(2)}</p>
                                    }
                                    <p class="opcoesdepaga">Pague à vista ou Pix</p>
                                </div>
                                <div class="botaocomprarprata">
                                    <label>VER DETALHES</label>
                                </div>

                            </div>
                        </div>
                    </a>
                ));
                setProductsNovidades(ProductsArray)
            })
    }

    function setShowProductPromocoes() {
        db.listDocuments(
            DATABASE_UID,
            PRODUTOS_UID,
            [
                Query.greaterThan("DESCONTO", 0),
                Query.orderDesc("$createdAt"),
                Query.limit(4),

            ]
        )
            .then((response) => {
                const ProductsArray = response.documents.map((products) => (
                    <a href={window.location.origin + "/produto/" + products.URL} id={products.$id} key={products.$id}>
                        <div class='item-prata' id={products.$id}>
                            <img src={window.location.origin + products != "" && products.PHOTOURL && products.PHOTOURL.length > 0 ? products.PHOTOURL[0] : ""} alt="" />
                            <div class="text-prata">
                                {products.PERSONALIZAVEL == true ? <p class="personalizado-loja">PERSONALIZADO</p> :
                                    <>
                                        {products.AVALIABLE == true ?
                                            <p class='novidade-loja'>Disponível</p>
                                            :
                                            <p class="esgotado-loja">ESGOTADO</p>
                                        }
                                    </>}
                                <h1 class="nome-prata">{products.NAME_PRODUCT}</h1>
                                <div class='estrelas'>
                                    <img src={window.location.origin + "/static/media/product-images/Nenhuma estrela.png"} alt="" />
                                </div>
                                <div class="promocao">
                                    {products.DESCONTO > 0 ?
                                        <p class="preço-loja"><s style={{ color: 'darkgray' }}>R$ {products.PRICE.toFixed(2)}</s> R$ {(products.PRICE - products.DESCONTO).toFixed(2)}</p>
                                        :
                                        <p class="preço-loja">R$ {(products.PRICE - products.DESCONTO).toFixed(2)}</p>
                                    }
                                    <p class="opcoesdepaga">Pague à vista ou Pix</p>
                                </div>
                                <div class="botaocomprarprata">
                                    <label>VER DETALHES</label>
                                </div>

                            </div>
                        </div>
                    </a>
                ));
                setProductsPromocoes(ProductsArray)
            })
    }

    useEffect(() => {
        setProductNovidades()
        setProductFOrYou()
        setShowProductPromocoes()
    }, [])
    return (
        <>
            <section>
                <div className="title-index">
                    <h1>{props.name}</h1>
                    {props.hide_bottom === true ?
                        <></>
                        :
                        <a href={window.location.origin + '/' + props.link}>VEJA TUDO</a>
                    }

                </div>
            </section>

            <div className='estoque-prata-index'>
                {props.name == 'NOVIDADES'
                    ?
                    <>
                        {ProductsNovidades.slice(0, 2)}
                    </>
                    :
                    <></>}
                {props.name == 'RECOMENDADOS PARA VOCÊ'
                    ?
                    <>
                        {ProductForYouItems.slice(0, 2)}
                    </>
                    :
                    <></>
                }
                {props.name == 'PROMOÇÕES'
                    ?
                    <>
                        {ProductsPromocoes == '' ?
                            <Ring
                                size={40}
                                lineWeight={5}
                                speed={2}
                                color="#EF59A0"
                            />
                            :
                            <>{ProductsPromocoes.slice(0, 2)}</>}
                    </>
                    :
                    <></>
                }
            </div>



            <div className='estoque-prata-index-pc'>
                {props.name == 'NOVIDADES'
                    ?
                    <>
                        {ProductsNovidades}
                    </>
                    :
                    <></>
                }
                {props.name == 'RECOMENDADOS PARA VOCÊ'
                    ?
                    <>
                        {ProductForYouItems}
                    </>
                    :
                    <></>
                }
                {props.name == 'PROMOÇÕES'
                    ?
                    <>
                        {ProductsPromocoes == '' ?
                            <Ring
                                size={40}
                                lineWeight={5}
                                speed={2}
                                color="#EF59A0"
                            />
                            :
                            <>{ProductsPromocoes}</>}
                    </>
                    :
                    <></>
                }
            </div>

        </>
    )
}