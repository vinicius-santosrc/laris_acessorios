/**
 * Creation Date: 02/01/2024
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

import React, { useEffect, useState } from "react"
import { getAllProducts } from "../lib/database";

const InputSearchBox = () => {

    const [search, setSearch] = useState(null);
    const [productsList, setproductsList] = useState([])
    useEffect(() => {
        async function getProducts() {
            const products = await getAllProducts();
            setproductsList(products)
        }
        getProducts()
    }, [])


    return (
        <>
            <div className="inputBox-Search">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14 5C9.02944 5 5 9.02944 5 14C5 18.9706 9.02944 23 14 23C16.4856 23 18.7342 21.9937 20.364 20.364C21.9937 18.7342 23 16.4856 23 14C23 9.02944 18.9706 5 14 5ZM3 14C3 7.92487 7.92487 3 14 3C20.0751 3 25 7.92487 25 14C25 16.6771 24.0426 19.1321 22.4532 21.039L28.7071 27.2929C29.0976 27.6834 29.0976 28.3166 28.7071 28.7071C28.3166 29.0976 27.6834 29.0976 27.2929 28.7071L21.039 22.4532C19.1321 24.0426 16.6771 25 14 25C7.92487 25 3 20.0751 3 14Z" fill="#0F172A" />
                </svg>

                <input
                    className="input-search-wrapper"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value) }}
                    placeholder="Busque pelo nome do produto" /
                >
            </div>
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