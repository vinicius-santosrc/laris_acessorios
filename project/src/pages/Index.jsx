//COMPONENTS

import { useEffect, useState } from "react";
import BannerFooter from "../components/BannerFooter";
import FooterIndexPage from "../components/FooterIndexPage";
import Header from "../components/Header";
import Notification_Top from "../components/Notification_Top";
import SectionTypeProductsIndex from "../components/SectionTypeProductsIndex";
import SectionProducts from "../components/Section_Promocoes";
import Slider_Banners from "../components/Slider_Banners";
import db from "../lib/appwrite";
import { Query } from "appwrite";

export default function Index() {
    const [promoItems, setPromocoes] = useState([])

    const DATABASE_UID = '651ca99af19b7afad3f1'
    const PRODUTOS_UID = '651ca9adf3de7aad17d9'

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
                    <a href={"/produto/" + products.URL} id={products.$id} key={products.$id}>
                        <div class='item-prata' id={products.$id}>
                            <img src={products != "" && products.PHOTOURL && products.PHOTOURL.length > 0 ? products.PHOTOURL[0] : ""} alt="" />
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
                                        <p class="preço-loja"><s style={{ color: 'darkgray' }}>R$ {products.PRICE}</s> R$ {products.PRICE - products.DESCONTO}</p>
                                        :
                                        <p class="preço-loja">R$ {products.PRICE - products.DESCONTO}</p>
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
                setPromocoes(ProductsArray)
            })
    }
    useEffect(() => {
        setShowProductPromocoes()
    }, [promoItems])
    return (
        <>
            <Header />
            <Slider_Banners />
            {promoItems == "" ?
                <></>
                :
                <SectionProducts
                    name="PROMOÇÕES"
                    hide_bottom={false}
                    link="promocoes"
                    type="promocoes"
                />
            }

            <SectionProducts
                name="BEST SELLERS"
                hide_bottom={true}
                link="bestsellers"
                type="bestsellers"
            />
            <SectionTypeProductsIndex />
            <SectionProducts
                name="RECOMENDADOS PARA VOCÊ"
                hide_bottom={true}
                link="recomendados"
                type="recomendados"
            />
            <SectionProducts
                name="NOVIDADES"
                hide_bottom={false}
                link="novidades"
                type="novidades"
            />
            <BannerFooter />
            <FooterIndexPage />
        </>
    )
}