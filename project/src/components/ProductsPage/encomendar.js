import { useState } from "react"

const produtos = JSON.parse(localStorage.getItem('produtos')) || []

function MostraTarefas() {


    if (localStorage.produtos == '[]' || localStorage.produtos == undefined || localStorage.produtos == 'undefined' || localStorage == null) {

    }

    const [Sacola, SetSacola] = useState([])

    SetSacola(produtos.map((item, index) => {
        return (
            <li class="mdl-list__item" id={index}>
                <div class="product-photo leftsidecart">
                    <img src={item.photoURL} />
                </div>
                <div class="product-info rightsidecart">
                    <div class="product-info-top toprightside">
                        <div class="productname-delete">
                            <p>${item.name}</p>
                            <a class="material-icons" onclick="removeTarefa(0)">
                                <i class="fa-solid fa-trash-can"></i>
                            </a>
                        </div>
                        <p class="product-size">Tamanho: ${item.tamanho}</p>
                    </div>
                    <select disabled>
                        <option value="${item.qtd}">${item.qtd}</option>
                    </select>
                    <div class="product-list-price">
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