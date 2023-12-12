import { Query } from "appwrite"
import db from "../../lib/appwrite"
import { useEffect, useState } from "react"
import { Ring } from '@uiball/loaders'
import CardItems from "../ItemCard"



export default function ProductsShow(props) {

    const [PRODUCTS, SETPRODUCTS] = useState([])

    const DATABASE_UID = '651ca99af19b7afad3f1'
    const PRODUTOS_UID = '651ca9adf3de7aad17d9'

    const getNovidades = () => {
        db.listDocuments(
            DATABASE_UID,
            PRODUTOS_UID,
            [
                Query.limit(200),
                Query.orderDesc("$createdAt"),

            ]
        )
            .then((res) => {
                if (window.location.href.includes("/novidades")) {
                    SETPRODUCTS(res.documents.map((produto) => {
                        return (
                            <CardItems
                                data={produto}
                            />
                        )
                    }))
                }
                if (window.location.href.includes("/promocoes")) {
                    SETPRODUCTS(res.documents.filter(r => r.DESCONTO > 0).map((produto) => {
                        return (
                            <CardItems
                                data={produto}
                            />
                        )
                    }))
                }
                return
            })
    }

    const getProducts = () => {
        db.listDocuments(
            DATABASE_UID,
            PRODUTOS_UID,
            [
                Query.limit(200),
                Query.equal("TYPE", props.type),
                Query.orderDesc("AVALIABLE"), // Ordena por AVALIABLE em ordem decrescente (false primeiro)
                Query.orderDesc("$createdAt"),


            ]
        )
            .then((res) => {
                if (window.location.href.includes("-colares")) {
                    SETPRODUCTS(res.documents.filter(r => r.STYLE == 'Colar').map((produto) => {
                        return (
                            <CardItems
                                data={produto}
                            />
                        )
                    }))
                }
                else if (window.location.href.includes("-chockers")) {
                    SETPRODUCTS(res.documents.filter(r => r.STYLE == 'Chocker').map((produto) => {
                        return (
                            <CardItems
                                data={produto}
                            />
                        )
                    }))
                }
                else if (window.location.href.includes("-pulseiras")) {
                    SETPRODUCTS(res.documents.filter(r => r.STYLE == 'Pulseira').map((produto) => {
                        return (
                            <CardItems
                                data={produto}
                            />
                        )
                    }))
                }
                else if (window.location.href.includes("-phone-strap")) {
                    SETPRODUCTS(res.documents.filter(r => r.STYLE == 'Phone-Strap').map((produto) => {
                        return (
                            <CardItems
                                data={produto}
                            />
                        )
                    }))
                }
                else if (window.location.href.includes("-chaveiros")) {
                    SETPRODUCTS(res.documents.filter(r => r.STYLE == 'Chaveiros').map((produto) => {
                        return (
                            <CardItems
                                data={produto}
                            />
                        )
                    }))
                }
                else if (window.location.href.includes("-toucas")) {
                    SETPRODUCTS(res.documents.filter(r => r.STYLE == 'Touca').map((produto) => {
                        return (
                            <CardItems
                                data={produto}
                            />
                        )
                    }))
                }
                else if (window.location.href.includes("-scrunchie")) {
                    SETPRODUCTS(res.documents.filter(r => r.STYLE == 'Scrunchie').map((produto) => {
                        return (
                            <CardItems
                                data={produto}
                            />
                        )
                    }))
                }
                else if (window.location.href.includes("-brincos")) {
                    SETPRODUCTS(res.documents.filter(r => r.STYLE == 'Brincos').map((produto) => {
                        return (
                            <CardItems
                                data={produto}
                            />
                        )
                    }))
                }
                else if (window.location.href.includes("-aneis")) {
                    SETPRODUCTS(res.documents.filter(r => r.STYLE == 'Aneis').map((produto) => {
                        return (
                            <CardItems
                                data={produto}
                            />
                        )
                    }))
                }
                else if (window.location.href.includes("-braceletes")) {
                    SETPRODUCTS(res.documents.filter(r => r.STYLE == 'Braceletes').map((produto) => {
                        return (
                            <CardItems
                                data={produto}
                            />
                        )
                    }))
                }
                else if (window.location.href.includes("-tornozeleiras")) {
                    SETPRODUCTS(res.documents.filter(r => r.STYLE == 'Tornozeleira').map((produto) => {
                        return (
                            <CardItems
                                data={produto}
                            />
                        )
                    }))
                }
                else if (window.location.href.includes("-piercing")) {
                    SETPRODUCTS(res.documents.filter(r => r.STYLE == 'Piercing').map((produto) => {
                        return (
                            <CardItems
                                data={produto}
                            />
                        )
                    }))
                }
                else {
                    SETPRODUCTS(res.documents.map((produto) => {
                        return (
                            <CardItems
                                data={produto}
                            />
                        )
                    }))
                }

            })



    }

    useEffect(() => {
        getProducts()
        if (window.location.href.includes('/novidades') || window.location.href.includes('/promocoes')) {
            return getNovidades()
        }
    }, [])

    return (
        <>
            <div className='estoque-prata'>
                {PRODUCTS != '' ?
                    PRODUCTS
                    :
                    <Ring
                        size={40}
                        lineWeight={5}
                        speed={2}
                        color="#EF59A0"
                    />
                }
            </div>
        </>
    )
}