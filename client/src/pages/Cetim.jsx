/**
 * Creation Date: 06/09/2023
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

import { useEffect, useState } from "react";
import Header from "../components/Header";
import BannerTopPage from "../components/TypeProductPage/BannerTopPage";
import ProductsShow from "../components/TypeProductPage/ProductsShow";
import db from "../lib/appwrite";
import { Query } from "appwrite";

export default function Cetim() {
    const [QTD_PRODUCT, SETQTD_PRODUCT] = useState(null)
    const [NAMEWINDOW, SETNAMEWINDOW] = useState(null)

    const DATABASE_UID = '651ca99af19b7afad3f1'
    const PRODUTOS_UID = '651ca9adf3de7aad17d9'

    const getQTD = () => {
        db.listDocuments(
            DATABASE_UID,
            PRODUTOS_UID,
            [
                Query.limit(200),
                Query.equal("TYPE", "CETIM"),

            ]
        ).then((response) => {
            SETQTD_PRODUCT(response.documents.length)
        })


    }


    useEffect(() => {
        getQTD()
        if(window.location.href.includes('-scrunchie')) {
            SETNAMEWINDOW('SCRUNCHIE')
        }
        else if(window.location.href.includes('-toucas')) {
            SETNAMEWINDOW('TOUCAS')
        }
        else {
            SETNAMEWINDOW("CETIM")
        }

        document.querySelector("title").innerText = "LARI'S ACESSÓRIOS - Cetim"
    }, [])
    return (
        <>
            <Header />
            <BannerTopPage
                name={NAMEWINDOW}
                description="
                    O cetim por ser um tecido liso e macio, não desgasta a fibra capilar - ou seja, o cabelo se mantém forte, saudável, e o melhor, sem frizz. Já para as cacheadas, a touca de cetim é uma excelente aliada, pois também ajuda na definição dos cachos e na retenção da umidade e hidratação dos cabelos.
                "
                QTD_PRODT={QTD_PRODUCT}
            />
            <ProductsShow
                type="CETIM"
            />
        </>
    )
}