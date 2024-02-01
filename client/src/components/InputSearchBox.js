import React, { useEffect, useState } from "react"
import { getAllProducts } from "../lib/database";

const InputSearchBox = () => {

    const [search, setSearch] = useState(null);
    const [productsList, setproductsList] = useState([])
    useEffect(() => {
        async function getProducts() {
            const products = await getAllProducts();
            console.log(products)
            setproductsList(products)
        }
        getProducts()
    }, [])


    return (
        <>
            <input
                className="input-search-wrapper"
                value={search}
                onChange={(e) => { setSearch(e.target.value) }}
                placeholder="Busque pelo nome do produto" /
            >
            {search &&
                <div className="box-products-search">
                    <h2>Produtos para {search}</h2>
                    <div className="list-Items">
                        <React.Fragment>
                            {productsList?.filter((product) => product.name_product.toLowerCase().includes(search.toLowerCase())).map((item) => {

                                let photoURL = JSON.parse(item.photoURL);

                                return (
                                    <a href={window.location.origin + "/produto/" + item.url} key={item.id}>
                                        <li className="item-wrapper-searched">
                                            <div className="leftside-searched-item">
                                                {photoURL.length > 0 ?
                                                    <img src={photoURL[0]} />
                                                    :
                                                    <img src={photoURL} />
                                                }

                                            </div>
                                            <div className="rightside-searched-item">
                                                <h3>{item.name_product}</h3>
                                                <p>R${item.price - item.desconto}</p>
                                            </div>
                                        </li>
                                    </a>
                                )
                            })}
                        </React.Fragment>
                    </div>
                </div>
            }
        </>
    )
}

export default InputSearchBox