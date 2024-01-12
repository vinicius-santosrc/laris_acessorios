import { useEffect, useState } from "react";
import Header from "../components/Header";
import BannerTopPage from "../components/TypeProductPage/BannerTopPage";
import ProductsShow from "../components/TypeProductPage/ProductsShow";
import { Query } from "appwrite";
import db from "../lib/appwrite";

export default function Micangas() {
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
                Query.equal("TYPE", "MICANGAS"),

            ]
        ).then((response) => {
            SETQTD_PRODUCT(response.documents.length)
        })


    }

    useEffect(() => {
        getQTD()
        if(window.location.href.includes('-colares')) {
            SETNAMEWINDOW('COLARES')
        }
        else if(window.location.href.includes('-chockers')) {
            SETNAMEWINDOW('CHOCKERS')
        }
        else if(window.location.href.includes('-pulseiras')) {
            SETNAMEWINDOW('PULSEIRAS')
        }
        else if(window.location.href.includes('-phone-strap')) {
            SETNAMEWINDOW('PHONE-STRAP')
        }
        else if(window.location.href.includes('-chaveiros')) {
            SETNAMEWINDOW('CHAVEIROS')
        }
        else {
            SETNAMEWINDOW("MIÇANGAS")
        }

        document.querySelector("title").innerText = "LARI'S ACESSÓRIOS - Miçangas"
    }, [])
    return (
        <>
            <Header />
            <BannerTopPage
                name={NAMEWINDOW}
                description="
                A miçanga é um pequeno objeto decorativo que é feito de materiais naturais como: ossos, pedras, conchas, madeiras e até mesmo vidro. O seu uso mais comum é na criação de acessórios como colares, pulseiras de miçangas e brincos.
                Fonte: Blog Art CocoJoias
                "
                QTD_PRODT={QTD_PRODUCT}
            />
            <ProductsShow
                type="MICANGAS"
            />
        </>
    )
}