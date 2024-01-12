import { Query } from "appwrite"
import db from "../../lib/appwrite"
import { useEffect, useState } from "react"
import { Ring } from '@uiball/loaders'
import CardItems from "../ItemCard"

export default function ProductsShow(props) {

    const [PRODUCTS, SETPRODUCTS] = useState([])

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/products`)
            const data = await response.json()
            SETPRODUCTS(data.reverse().sort((a, b) => (b.disponibilidade - a.disponibilidade)).filter((product) => product.categoria == 'PRATA').map((pdt) => {
                return (
                    <CardItems
                        data={pdt}
                    />
                )
            }))
        }
        catch (err) {
            console.log(err)
        }
    }


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