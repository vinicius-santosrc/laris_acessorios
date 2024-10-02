/**
 * Creation Date: 05/09/2023
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

import { useState } from "react"

const produtos = JSON.parse(localStorage.getItem('produtos')) || []

function MostraTarefas() {


    if (localStorage.produtos == '[]' || localStorage.produtos == undefined || localStorage.produtos == 'undefined' || localStorage == null) {

    }

    const [Sacola, SetSacola] = useState([])

    SetSacola(produtos.map((item, index) => {
        return (
            <li className="mdl-list__item" id={index}>
                <div className="product-photo leftsidecart">
                    <img src={item.photoURL} />
                </div>
                <div className="product-info rightsidecart">
                    <div className="product-info-top toprightside">
                        <div className="productname-delete">
                            <p>${item.name}</p>
                            <a className="material-icons" onclick="removeTarefa(0)">
                                <i className="fa-solid fa-trash-can"></i>
                            </a>
                        </div>
                        <p className="product-size">Tamanho: ${item.tamanho}</p>
                    </div>
                    <select disabled>
                        <option value="${item.qtd}">${item.qtd}</option>
                    </select>
                    <div className="product-list-price">
                        R$ ${item.preco}
                    </div>
                </div>
            </li>
        )
    }))

}


function salvarNoLocalStorage() {
    localStorage.setItem('produtos', JSON.stringify(produtos))
}

function removeTarefa(pos) {
    produtos.splice(pos, 1)
    MostraTarefas()
    salvarNoLocalStorage()
}

function removeTarefaCart(pos) {
    produtos.splice(pos, 1)
    MostraTarefas()
    salvarNoLocalStorage()
    window.location.reload()
}

export { produtos, salvarNoLocalStorage, MostraTarefas }