/**
 * Creation Date: 15/01/2024
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

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
    const preEndpoint = process.env.REACT_APP_API_PREENDPOINT;

    const setShowProductPromocoes = async () => {
        try {
            const response = await fetch(`${endpoint}${preEndpoint}${secretKey}/products`)
            const data = await response.json()
            const ProductsArray = data.reverse().sort((a, b) => (b.disponibilidade - a.disponibilidade)).filter((product) => product.desconto > 0).map((pdt) => {
                <CardItems
                    data={pdt}
                />
            });
            setPromocoes(ProductsArray)
        }
        catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        setShowProductPromocoes()
    }, [])
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