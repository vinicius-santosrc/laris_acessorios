import { useEffect, useState } from "react";
import Header from "../components/Header";
import BannerTopPage from "../components/TypeProductPage/BannerTopPage";
import ProductsShow from "../components/TypeProductPage/ProductsShow";
import db from "../lib/appwrite";
import { Query } from "appwrite";

export default function Pratas() {
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
                Query.equal("TYPE", "PRATA"),
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

        else if(window.location.href.includes('-brincos')) {
            SETNAMEWINDOW('BRINCOS')
        }

        else if(window.location.href.includes('-aneis')) {
            SETNAMEWINDOW('ANÉIS')
        }

        else if(window.location.href.includes('-pulseiras')) {
            SETNAMEWINDOW('PULSEIRAS')
        }

        else if(window.location.href.includes('-braceletes')) {
            SETNAMEWINDOW('BRACELETES')
        }

        else if(window.location.href.includes('-tornozeleiras')) {
            SETNAMEWINDOW('TORNOZELEIRA')
        }

        else if(window.location.href.includes('-piercing')) {
            SETNAMEWINDOW('PIERCING')
        }

        else {
            SETNAMEWINDOW("PRATAS 925")
        }

        document.querySelector("title").innerText = "LARI'S ACESSÓRIOS - Pratas 925"
    }, [])
        return (
            <>
                <Header />
                <BannerTopPage
                    name={NAMEWINDOW}
                    description="
                    A Prata de Lei também é conhecida pelos brasileiros como Prata 925. Ambas são ideais para a fabricação de joias e têm grau de pureza de 92,5%, respectivamente, o que garante a qualidade, o brilho e a durabilidade de uma joia em prata. 
                    Fonte: pratafina.com.br
                "
                    QTD_PRODT={QTD_PRODUCT}
                />
                <ProductsShow
                    type="PRATA"
                />
            </>
        )
    }