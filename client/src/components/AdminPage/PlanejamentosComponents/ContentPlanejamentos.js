/**
 * Creation Date: 09/01/2024
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

import { useEffect, useState } from "react";
import db from "../../../lib/appwrite";
import Swal from "sweetalert2";
import { ID } from "appwrite";
import { getPlanejamentos } from "../../../lib/database";

export default function ContentPlanejamentos() {

    const [boxCreateNewVisible, setboxCreateNewVisible] = useState(false);
    const [ContentCards, setContentCards] = useState([]);
    const [NameOfNewList, setNameOfNewList] = useState(null);
    const [createCardOpen, setCreateCardOpen] = useState(false); // Novo estado
    const [newItems, setNewItems] = useState(null); // Novo estado para os itens a lista
    const [localNewItems, setLocalNewItems] = useState('');

    const secretKey = process.env.REACT_APP_API_SECRET_KEY;
    const endpoint = process.env.REACT_APP_API_ENDPOINT;
    const preEndpoint = process.env.REACT_APP_API_PREENDPOINT;

    useEffect(() => {
        setTimeout(() => {
            getCards()
        }, 2000);
    })

    function deleteThatCard(id) {
        Swal.fire({
            title: 'Você deseja excluir essa lista?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Excluir',
            denyButtonText: `Cancelar`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                try {
                    fetch(`${endpoint}${preEndpoint}${secretKey}/planejamentos/delete`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id: id,
                        })
                    })
                        .then((r) => {
                            getCards()
                        })

                }
                catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Algo deu errado. Contate um desenvolvedor.',

                    })
                    getCards()
                }
            } else if (result.isDenied) {

            }
        })

    }

    function createNewList() {
        if (NameOfNewList) {
            try {
                // Faça algo com imageUrls, se necessário
                fetch(`${endpoint}${preEndpoint}${secretKey}/planejamentos/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name_card: NameOfNewList
                    }),
                })

                    .then(() => {
                        getCards();
                        setNameOfNewList(null);
                    })
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo deu errado. Contate um desenvolvedor.',

                })
            }
        }
        else (
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Preencha o nome da lista.',

            })
        )
    }
    function toggleCreateCard() {
        {
            createCardOpen ?
                setCreateCardOpen(false)
                :
                setCreateCardOpen(true)
        }

    }



    async function addListDB(id, content_card) {

        const itensantigos = JSON.parse(content_card)

        if (!newItems) {
            return
        }

        if (content_card != []) {
            try {
                const list = [...itensantigos]
                list.push(newItems)
                fetch(`${endpoint}${preEndpoint}${secretKey}/planejamentos/update`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: id,
                        list: list
                    }),

                })
                    .then((r) => {
                        getCards()
                    })
            }
            catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo deu errado. Contate um desenvolvedor.',
                    footer: `<a href="">ERRO: ${error}</a>`
                })
            }
        }
        else {
            try {
                const list = []
                list.push(newItems.toString())
                fetch(`${endpoint}${preEndpoint}${secretKey}/planejamentos/update`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: id,
                        list: list
                    }),
                })
                    .then((r) => {
                        getCards()
                    })
            }
            catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo deu errado. Contate um desenvolvedor.',
                    footer: `<a href="">ERRO: ${error}</a>`
                })
            }
        }
    }

    async function removeAtt(a, id, content_card) {

        const contentCardArray = JSON.parse(content_card);

        if (a >= 0 && a < contentCardArray.length) {
            // Remova o item da matriz
            contentCardArray.splice(a, 1);

            // Atualize o documento no banco de dados com a nova matriz 'content_card'
            try {
                fetch(`${endpoint}${preEndpoint}${secretKey}/planejamentos/update`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: id,
                        list: contentCardArray
                    }),
                })
            }
            catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo deu errado. Contate um desenvolvedor.',
                    footer: `<a href="">ERRO: ${error}</a>`
                })
            }
            // Atualize o estado ContentCards (se necessário)
            getCards();
        }



    }

    async function getCards() {
        try {
            const response = await getPlanejamentos()
            setContentCards(response)
        }
        catch (error) {
            console.log(error)
        }
    }



    return (
        <div className="Planejamentos-Card-Wrapper">
            <div className="Content-Planejamentos-Card-Wrapper">

                {ContentCards.map((cards, index) => (
                    <div className="Card-Wrapper" id={index} key={index}>
                        <div className="Card-Wrapper-Top">
                            <h3>{cards.name_card}</h3>
                            <button onClick={() => {
                                deleteThatCard(cards.id)
                            }}><i className="fa-solid fa-trash-can"></i></button>
                        </div>
                        <div className="Content-Card">
                            {JSON.parse(cards.content_card).map((r, i) => {
                                return (
                                    <div className="flexbox-content">
                                        <div className="contents-card">
                                            {r}
                                        </div>
                                        <button onClick={() => {
                                            removeAtt(i, cards.id, cards.content_card)
                                        }} id={i} key={i}><i className="fa-solid fa-minus"></i></button>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="bottom_create">
                            <div className="createshowcreate">
                                <input
                                    type="text"
                                    placeholder="Insira o conteúdo do cartão..."
                                    value={newItems} // Use o valor do estado para refletir o conteúdo atual
                                    onChange={(e) =>
                                        setNewItems(e.target.value)
                                    } // Atualize o estado conforme o usuário digita
                                />
                                <div className="contentcreatebutton">
                                    <button onClick={() => {
                                        addListDB(cards.id, cards.content_card)
                                    }}>Adicionar cartão</button>
                                    <button id="closecreatecardbtn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.46967 5.46967C5.76256 5.17678 6.23744 5.17678 6.53033 5.46967L12 10.9393L17.4697 5.46967C17.7626 5.17678 18.2374 5.17678 18.5303 5.46967C18.8232 5.76256 18.8232 6.23744 18.5303 6.53033L13.0607 12L18.5303 17.4697C18.8232 17.7626 18.8232 18.2374 18.5303 18.5303C18.2374 18.8232 17.7626 18.8232 17.4697 18.5303L12 13.0607L6.53033 18.5303C6.23744 18.8232 5.76256 18.8232 5.46967 18.5303C5.17678 18.2374 5.17678 17.7626 5.46967 17.4697L10.9393 12L5.46967 6.53033C5.17678 6.23744 5.17678 5.76256 5.46967 5.46967Z" fill="#0F172A" />
                                    </svg>
                                    </button>
                                </div>

                            </div>


                        </div>
                    </div>
                ))}
                {boxCreateNewVisible ?
                    <div className="Card-CreateNew">
                        <input onChange={(v) => {
                            setNameOfNewList(v.target.value)
                        }} value={NameOfNewList} type="text" placeholder="Insira o título da lista..." />
                        <div className="flex-box-wrapper-createnew">
                            <button onClick={createNewList}>Adicionar Lista</button>
                            <button onClick={() => {
                                setboxCreateNewVisible(false)
                            }} id="closelist"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.46967 5.46967C5.76256 5.17678 6.23744 5.17678 6.53033 5.46967L12 10.9393L17.4697 5.46967C17.7626 5.17678 18.2374 5.17678 18.5303 5.46967C18.8232 5.76256 18.8232 6.23744 18.5303 6.53033L13.0607 12L18.5303 17.4697C18.8232 17.7626 18.8232 18.2374 18.5303 18.5303C18.2374 18.8232 17.7626 18.8232 17.4697 18.5303L12 13.0607L6.53033 18.5303C6.23744 18.8232 5.76256 18.8232 5.46967 18.5303C5.17678 18.2374 5.17678 17.7626 5.46967 17.4697L10.9393 12L5.46967 6.53033C5.17678 6.23744 5.17678 5.76256 5.46967 5.46967Z" fill="#0F172A" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    :
                    <div className="Card-CreateNewStart">
                        <button onClick={() => {
                            setboxCreateNewVisible(true)
                        }}><i className="fa-solid fa-plus"></i> Adicionar uma lista</button>
                    </div>
                }

            </div>
        </div>
    )
}