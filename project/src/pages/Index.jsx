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
import CardItems from "../components/ItemCard";

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
                    <CardItems
                        data={products}
                    />
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