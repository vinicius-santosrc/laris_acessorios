import { Query } from "appwrite"
import db from "../../lib/appwrite"
import { useEffect, useState } from "react"
import { Ring } from '@uiball/loaders'
import CardItems from "../ItemCard"

export default function ProductsShow(props) {

    const [PRODUCTS, SETPRODUCTS] = useState([])
    const [productsObject, setProductsObject] = useState([])

    useEffect(() => {
        async function getPdt() {
            await getProducts()
        }
        getPdt()
    }, [])

    const getProducts = async () => {
        try {
            const response = await fetch(`https://api-laris-acessorios.vercel.app/api/products`)
            const data = await response.json()
            SETPRODUCTS(data);

            if (PRODUCTS) {
                if (window.location.href.includes("/promocoes")) {
                    setProductsObject(data.reverse().filter((product) => product.desconto > 0).map((pdt) => {
                        return (
                            <CardItems
                                data={pdt}
                            />
                        )
                    }))
                }

                if (window.location.href.includes("/novidades")) {
                    setProductsObject(data.reverse().map((pdt) => {
                        return (
                            <CardItems
                                data={pdt}
                            />
                        )
                    }))
                }

                if (window.location.pathname == "/pratas") {
                    setProductsObject(data.reverse().sort((a, b) => (b.disponibilidade - a.disponibilidade)).filter((product) => product.categoria == 'PRATA').map((pdt) => {
                        return (
                            <CardItems
                                data={pdt}
                            />
                        )
                    }))
                }

                if (window.location.pathname == "/pratas-colares") {
                    setProductsObject(data.reverse().sort((a, b) => (b.disponibilidade - a.disponibilidade)).filter((product) => product.categoria == 'PRATA').filter((product) => product.tipo == 'Colar').map((pdt) => {
                        return (
                            <CardItems
                                data={pdt}
                            />
                        )
                    }))
                }

                if (window.location.pathname == "/pratas-brincos") {
                    setProductsObject(data.reverse().sort((a, b) => (b.disponibilidade - a.disponibilidade)).filter((product) => product.categoria == 'PRATA').filter((product) => product.tipo == 'Brincos').map((pdt) => {
                        return (
                            <CardItems
                                data={pdt}
                            />
                        )
                    }))
                }

                if (window.location.pathname == "/pratas-aneis") {
                    setProductsObject(data.reverse().sort((a, b) => (b.disponibilidade - a.disponibilidade)).filter((product) => product.categoria == 'PRATA').filter((product) => product.tipo == 'Aneis').map((pdt) => {
                        return (
                            <CardItems
                                data={pdt}
                            />
                        )
                    }))
                }

                if (window.location.pathname == "/pratas-pulseiras") {
                    setProductsObject(data.reverse().sort((a, b) => (b.disponibilidade - a.disponibilidade)).filter((product) => product.categoria == 'PRATA').filter((product) => product.tipo == 'Pulseiras').map((pdt) => {
                        return (
                            <CardItems
                                data={pdt}
                            />
                        )
                    }))
                }

                if (window.location.pathname == "/pratas-braceletes") {
                    setProductsObject(data.reverse().sort((a, b) => (b.disponibilidade - a.disponibilidade)).filter((product) => product.categoria == 'PRATA').filter((product) => product.tipo == 'Braceletes').map((pdt) => {
                        return (
                            <CardItems
                                data={pdt}
                            />
                        )
                    }))
                }
                if (window.location.pathname == "/pratas-tornozeleiras") {
                    setProductsObject(data.reverse().sort((a, b) => (b.disponibilidade - a.disponibilidade)).filter((product) => product.categoria == 'PRATA').filter((product) => product.tipo == 'Tornozeleira').map((pdt) => {
                        return (
                            <CardItems
                                data={pdt}
                            />
                        )
                    }))
                }

                if (window.location.pathname == "/pratas-piercing") {
                    setProductsObject(data.reverse().sort((a, b) => (b.disponibilidade - a.disponibilidade)).filter((product) => product.categoria == 'PRATA').filter((product) => product.tipo == 'Piercing').map((pdt) => {
                        return (
                            <CardItems
                                data={pdt}
                            />
                        )
                    }))
                }
            }

        }
        catch (err) {
            console.log(err)
        }
    }


    return (
        <>
            <div className='estoque-prata'>
                {PRODUCTS != '' ?
                    productsObject
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