import { useEffect, useState } from "react";
import Header from "../components/Header";
import BannerTopPage from "../components/TypeProductPage/BannerTopPage";
import ProductsShow from "../components/TypeProductPage/ProductsShow";
import db from "../lib/appwrite";
import { Query } from "appwrite";

export default function Pratas() {
    const [QTD_PRODUCT, SETQTD_PRODUCT] = useState(null);
    const [NAMEWINDOW, SETNAMEWINDOW] = useState(null);
    const [produtos, setProdutos] = useState([]);
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/products');
                const data = await response.json();
                //SETANDO DADOS
                setProdutos(data);
                //SETANDO QUANTIDADE DE DADOS 
                SETQTD_PRODUCT(data.filter(r => r.categoria == 'PRATA').length)
            } catch (error) {
                console.error('Erro ao obter dados:', error);
            }
        };

        fetchData();

    }, []);

    useEffect(() => {

        if (window.location.href.includes('-colares')) {
            SETNAMEWINDOW('COLARES')
        }

        else if (window.location.href.includes('-brincos')) {
            SETNAMEWINDOW('BRINCOS')
        }

        else if (window.location.href.includes('-aneis')) {
            SETNAMEWINDOW('ANÉIS')
        }

        else if (window.location.href.includes('-pulseiras')) {
            SETNAMEWINDOW('PULSEIRAS')
        }

        else if (window.location.href.includes('-braceletes')) {
            SETNAMEWINDOW('BRACELETES')
        }

        else if (window.location.href.includes('-tornozeleiras')) {
            SETNAMEWINDOW('TORNOZELEIRA')
        }

        else if (window.location.href.includes('-piercing')) {
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
                    As pratas 925 referem-se a objetos de prata que possuem uma composição de 92,5% de prata pura e 7,5% de outros metais, geralmente cobre. Essa liga é conhecida como prata esterlina e é amplamente utilizada na fabricação de joias e objetos de decoração. A beleza das pratas 925 reside na sua brilhante aparência, durabilidade e resistência à corrosão. Essas peças apresentam um charme atemporal, destacando-se por seu lustro e elegância, sendo uma escolha popular para quem busca acessórios sofisticados e duradouros.
                "
                QTD_PRODT={QTD_PRODUCT}
            />
            <ProductsShow
                type="PRATA"
            />
        </>
    )
}