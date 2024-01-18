//COMPONENTS
import React, { useEffect, useState } from "react";
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

    const endpoint = process.env.REACT_APP_API_ENDPOINT;
    const secretKey = process.env.REACT_APP_API_SECRET_KEY;

    const setShowProductPromocoes = async () => {
        try {
            const response = await fetch(`${endpoint}/api/v1/${secretKey}/products`)
            const data = await response.json()
            const ProductsArray = data.reverse().sort((a, b) => (b.disponibilidade - a.disponibilidade)).filter((product) => product.desconto > 0).map((pdt) => {
                <CardItems
                    data={pdt}
                />
            });
            setPromocoes(ProductsArray)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        setShowProductPromocoes()
    }, [promoItems])
    return (
        <>
            <Header />
            <Slider_Banners />
            <SectionTypeProductsIndex />
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