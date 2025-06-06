/**
 * Creation Date: 06/09/2023
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

import React, { useState, useEffect } from 'react';

export function carregarSacolaDoLocalStorage(setSacola) {
    const sacolaNoLocalStorage = JSON.parse(localStorage.getItem('sacola'));
    if (sacolaNoLocalStorage) {
        setSacola(sacolaNoLocalStorage);
    }
}

function SacolaDeCompras({ fetch }) {
    const [sacola, setSacola] = useState(() => {
        const sacolaNoLocalStorage = JSON.parse(localStorage.getItem('sacola'));
        return sacolaNoLocalStorage || [];
    });

    const salvarSacolaNoLocalStorage = () => {
        localStorage.setItem('sacola', JSON.stringify(sacola));
        fetch()
    };

    useEffect(() => {
        carregarSacolaDoLocalStorage(setSacola);
        fetch()
    }, [fetch]);

    useEffect(() => {
        salvarSacolaNoLocalStorage();
    }, [sacola]);

    const adicionarProduto = (produto, preco) => {
        if (produto && preco) {
            const novoProduto = { nome: produto, preco: parseFloat(preco) };
            setSacola([...sacola, novoProduto]);
        }
    };

    const removerProduto = (index) => {
        const novaSacola = [...sacola];
        novaSacola.splice(index, 1);
        setSacola(novaSacola);
        fetch()
    };

    function fecharcart() {
        let carrinho = document.querySelector('.carrinhoshow')
        let back = document.querySelector('.background-cart')
        let filtros = document.querySelector('.filtros-select-cell')


        carrinho.style.display = 'none'
        back.style.display = 'none'
        if (filtros) {
            filtros.style.display = 'none'
        }
        if (window.location.href.includes("/pratas")) {
            filtros.style.display = 'none'
        }
    }

    return (
        <div>
            {sacola.map((item, index) => (
                <li key={index}>
                    <li className="mdl-list__item" id='index'>
                        <div className="product-photo leftsidecart">

                            <img src={item.photoURL} alt="" />
                        </div>
                        <div className="product-info rightsidecart">
                            <div className="product-info-top toprightside">
                                <div className="productname-delete">
                                    <p>{item.name} {item.personalizacao ? <>({item.personalizacao})</> : ""}</p>
                                    <a className="material-icons" onClick={() => removerProduto(index)}>
                                        <i className="fa-solid fa-trash-can"></i>
                                    </a>
                                </div>
                                <p className="product-size">Tamanho: {item.tamanho}</p>
                            </div>
                            <select disabled>
                                <option value="${item.qtd}">{item.qtd}</option>
                            </select>
                            <div className="product-list-price">
                                {item.desconto > 0
                                    ?
                                    <><s style={{color: 'gray'}}>R$ {(item.preco).toFixed(2)}</s> R$ {(item.preco - item.desconto).toFixed(2)}</>
                                    :
                                    <>R$ {(item.preco).toFixed(2)}</>
                            }

                            </div>
                        </div>
                    </li>
                </li>
            ))}
            {sacola == "" ?
                <div className='empty-sacola'>
                    <h2>Sua sacola está vazia.</h2>
                    <p>Adicione produtos à sacola para finalizar a compra.</p>
                    <button onClick={fecharcart}>Escolher suas joias</button>
                </div>
                :
                ""
            }
        </div>
    );
}

export default SacolaDeCompras;
