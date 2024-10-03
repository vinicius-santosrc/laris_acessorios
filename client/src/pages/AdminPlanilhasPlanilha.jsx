/**
 * Creation Date: 13/09/2023
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

import React, { useEffect, useState } from "react";
import db, { getUserData } from "../lib/appwrite";
import { useParams } from "react-router-dom";
import NavigationLeft from "../components/AdminPage/NavigationLeft";
import Swal from "sweetalert2";
import { ID, Query } from "appwrite";
import { getPlanilhaDespesas, getPlanilhaItens, getUser, GetUserAtual } from "../lib/database";
import { auth, CheckIfUserIsLogged } from "../lib/firebase";
import Loading from "../components/AdminPage/Loading";

export default function PlanilhaPage() {
    const [user, setUser] = useState(null)
    const [status, userStatus] = useState(null)
    const [userDB, setUserDBAccount] = useState([])
    const [saldoWrap, setSaldo] = useState(0)
    const [entradasWrap, setEntradas] = useState(0)
    const [saidasWrap, setSaidas] = useState(0)

    

    const endpoint = process.env.REACT_APP_API_ENDPOINT;
    const secretKey = process.env.REACT_APP_API_SECRET_KEY;
    const preEndpoint = process.env.REACT_APP_API_PREENDPOINT;


    useEffect(() => {
        
        getTotal();
    }, []);
    
    async function getTotal() {
        const PlanilhaDespesa = await getPlanilhaDespesas();

        let entradas = 0;
        let saidas = 0; 

        PlanilhaDespesa.forEach((r) => {
            if (r.tipo === "Receita") {
                entradas += Number(r.valor);
            } else {
                saidas += Number(r.valor);
            }
        });

        setEntradas(entradas);
        setSaidas(saidas);
        setSaldo(entradas - saidas);
    }

    const { planilha } = useParams();

    const [AddItemOpen, setAddItemOpen] = useState(false)

    const [items, setItems] = useState([]);
    const [itemId, setItemId] = useState(null)
    const [currentItem, setCurrentItem] = useState({
        codigo: "",
        nameofitem: "",
        detalhe: "",
        preco_compra: "",
        custos: "",
        precorevenda: "",
        quantcompra: "",
        lucroporitem: ""
    });

    const [currentItemDESPESAS, setcurrentItemDESPESAS] = useState({
        descricao: "",
        valor: "",
        tipo: "Receita"
    });

    useEffect(() => {
        loadItens();
    }, []);

    const handleEdit = (item) => {
        setCurrentItem(item);
        setcurrentItemDESPESAS(item);
        setItemId(item.id)
        setAddItemOpen(true)
        getTotal();
    };

    const handleDelete = (item) => {
        if (!item.id) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'O item não possui um ID válido para exclusão! Contate um desenvolvedor.',
                footer: '<a href="errors">Por que deste erro?</a>'
            })
            getTotal();
            return;
        }

        if (planilha == 'planilha-despesas') {
            fetch(`${endpoint}${preEndpoint}${secretKey}/planilha-despesas/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            })
                .then(() => {
                    loadItens();
                    getTotal();
                })
                .catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'O item não possui um ID válido para exclusão! Contate um desenvolvedor.',
                        footer: '<a href="errors">Por que deste erro?</a>'
                    })
                });
        }
        else if (planilha == 'planilha-itens') {
            fetch(`${endpoint}${preEndpoint}${secretKey}/planilha-itens/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            })
                .then(() => {
                    loadItens();
                })
                .catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'O item não possui um ID válido para exclusão! Contate um desenvolvedor.',
                        footer: '<a href="errors">Por que deste erro?</a>'
                    })
                });
        }

    };

    const [userAtual, setuserAtual] = useState([]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const res = await GetUserAtual(user.uid);
                    setuserAtual(res);
                } catch (error) {
                    console.warn("Erro ao pegar usuário: ", error);
                }
            } else {
                setuserAtual(null);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (CheckIfUserIsLogged()) {
                return
            } else {
                return window.location.href = window.location.origin + "/admin/login";
            }
        });

        return () => unsubscribe();
    }, []);

    if (!userAtual) {
        return <Loading />

    }

    const handleSave = () => {
        if (planilha == "planilha-itens") {
            if (!currentItem.codigo || !currentItem.nameofitem || !currentItem.detalhe || !currentItem.preco_compra || !currentItem.custos || !currentItem.precorevenda || !currentItem.quantcompra || !currentItem.lucroporitem) {
                Swal.fire("Preencha todos os campos!");
                return;
            }
        }

        else if (planilha == "planilha-despesas") {
            if (!currentItemDESPESAS.descricao || !currentItemDESPESAS.valor || !currentItemDESPESAS.tipo) {
                Swal.fire("Preencha todos os campos!");
                return;
            }
        }

        if (itemId) {
            // Atualize o item no Appwrite
            if (planilha == "planilha-itens") {
                fetch(`${endpoint}${preEndpoint}${secretKey}/planilha-itens/edit`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(currentItem),
                })
                    .then(() => {
                        loadItens();
                        setCurrentItem({
                            codigo: "",
                            nameofitem: "",
                            detalhe: "",
                            preco_compra: "",
                            custos: "",
                            precorevenda: "",
                            quantcompra: "",
                            lucroporitem: "",
                        });
                        setItemId(null);
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'O item não pode ser salvo. Contate um desenvolvedor',
                            footer: '<a href="errors">Por que deste erro?</a>'
                        })

                    });
            }
            else if (planilha == "planilha-despesas") {
                //EDITAR LINHA
                fetch(`${endpoint}${preEndpoint}${secretKey}/planilha-despesas/edit`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(currentItemDESPESAS),
                })
                    .then(() => {
                        loadItens();
                        getTotal();
                        setCurrentItem({
                            descricao: "",
                            valor: "",
                            tipo: "",
                        })
                        setItemId(null);

                    })
                    .catch(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'O item não pode ser salvo. Contate um desenvolvedor',
                            footer: '<a href="errors">Por que deste erro?</a>'
                        })

                    });
            }
        } else {
            // Crie um novo item no Appwrite sem especificar o ID
            if (planilha == "planilha-itens") {
                fetch(`${endpoint}${preEndpoint}${secretKey}/planilha-itens/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(currentItem),
                })
                    .then(() => {
                        Swal.fire("Item criado com sucesso!");
                        loadItens();
                        setCurrentItem({
                            codigo: "",
                            nameofitem: "",
                            detalhe: "",
                            preco_compra: "",
                            custos: "",
                            precorevenda: "",
                            quantcompra: "",
                            lucroporitem: "",
                            // Certifique-se de redefinir o ID
                        });
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'O item não pôde ser criado. Contate um desenvolvedor.',
                            footer: '<a href="errors">Por que deste erro?</a>'
                        })
                    });
            }
            else if (planilha == "planilha-despesas") {
                //ADICIONAR LINHA
                fetch(`${endpoint}${preEndpoint}${secretKey}/planilha-despesas/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(currentItemDESPESAS),
                })
                    .then(() => {
                        Swal.fire("Item criado com sucesso!");
                        loadItens();
                        getTotal();
                        setCurrentItem({
                            descricao: "",
                            valor: "",
                            tipo: "",
                            // Certifique-se de redefinir o ID
                        });
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'O item não pôde ser criado. Contate um desenvolvedor.',
                            footer: '<a href="errors">Por que deste erro?</a>'
                        })
                    });
            }
        }
    };

    const loadItens = async () => {
        if (planilha == 'planilha-despesas') {
            const Items = await getPlanilhaDespesas();
            setItems(Items)
        }
        else if (planilha == 'planilha-itens') {
            const Items = await getPlanilhaItens();
            setItems(Items)
        }
    };

    if (planilha == 'planilha-despesas') {
        return (
            <div className="AdminPage-DashBoard">
                <NavigationLeft />
                <div className="Admin-ContentDashBoard">
                    {planilha != "planilha-despesas"
                        ?
                        <div className="Planilha-404-NotFound">
                            <img src={window.location.origin + "/static/media/admin-images/undraw_void_-3-ggu.svg"} alt="Sem Planilha"/>
                            <h1>Nenhuma planilha foi encontrada.</h1>
                            <p>Entre em contato com o desenvolvedor ou tente novamente mais tarde.</p>
                        </div>
                        :
                        <>
                            <div className="newItem">
                                <h3>Entradas: R$<span id="entradas">{entradasWrap.toFixed(2)}</span></h3>
                                <h3>Saídas: R$<span id="saidas">{saidasWrap.toFixed(2)}</span></h3>
                                <h3 id="saldoh3">Saldo: R$<span>{saldoWrap.toFixed(2)}</span></h3>
                            </div>
                            <div className="newItem">
                                <div className="headeritem">
                                    <div className="side1item">
                                        <h1>{itemId ? 'Editando' : 'Adicionar'} um Item</h1>
                                        <p>Preencha todos os dados para adicionar o item ao banco de dados.</p>
                                    </div>
                                    <div>
                                        {AddItemOpen
                                            ?
                                            <button onClick={() => {
                                                setAddItemOpen(false)
                                            }}><i className="fa-solid fa-minus"></i></button>
                                            :
                                            <button onClick={() => {
                                                setAddItemOpen(true)
                                            }}><i className="fa-solid fa-plus"></i></button>
                                        }


                                    </div>

                                </div>
                                {AddItemOpen
                                    ?
                                    <div className="exboxitem">
                                        <p>Descrição:</p>
                                        <input
                                            type="text"
                                            value={currentItemDESPESAS.descricao}
                                            onChange={(e) => setcurrentItemDESPESAS({ ...currentItemDESPESAS, descricao: e.target.value })}
                                        />
                                        <p>Valor:</p>
                                        <input
                                            type="number"
                                            value={currentItemDESPESAS.valor}
                                            onChange={(e) => setcurrentItemDESPESAS({ ...currentItemDESPESAS, valor: e.target.value })}
                                        />
                                        <p>Tipo:</p>
                                        <select
                                            value={currentItemDESPESAS.tipo}
                                            onChange={(e) => setcurrentItemDESPESAS({ ...currentItemDESPESAS, tipo: e.target.value })}
                                        >
                                            <option value={'Receita'} selected>Receita</option>
                                            <option value={'Despesa'}>Despesa</option>
                                        </select>
                                        <br />
                                        <button onClick={handleSave}>{itemId ? 'Salvar' : 'Adicionar item na tabela'}</button>
                                    </div>
                                    :
                                    null}

                            </div>


                            <table className="item-table item-table-despesas">
                                <thead className="titlecolumns">
                                    <tr>
                                        <th>Descrição</th>
                                        <th>Valor</th>
                                        <th>Tipo</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item, index) => (
                                        <tr className={item.tipo == "Receita" ? "color-green-receita" : "red-color-despesa"} id={item.id} key={item.id}>
                                            <td id="bggray">{item.descricao}</td>
                                            <td>R$ {item.valor}</td>
                                            <td id="bggray">
                                                {item.tipo == 'Receita'
                                                    ?
                                                    <>
                                                        <i className="fa-solid fa-circle-chevron-up"></i>
                                                        <span>Entrada</span>
                                                    </>
                                                    :
                                                    <>
                                                        <i className="fa-solid fa-circle-chevron-down"></i>
                                                        <span>Saída</span>
                                                    </>
                                                }
                                            </td>


                                            <td>
                                                <button onClick={() => handleEdit(item)}><i className="fa-solid fa-pen-to-square"></i></button>
                                                <button onClick={() => handleDelete(item)}><i className="fa-solid fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>}
                </div>
            </div>
        )
    }

    function handleDeleteItem(item) {
        Swal.fire({
            title: "Você deseja remover esse item?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Remover",
            denyButtonText: `Cancelar`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                handleDelete(item)
            } else if (result.isDenied) {
                return
            }
        });
    }

    return (
        <div className="AdminPage-DashBoard">
            <NavigationLeft />
            <div className="Admin-ContentDashBoard">
                {planilha == "planilha-despesas"
                    ?
                    <div className="Planilha-404-NotFound">
                        <img src={window.location.origin + "/static/media/admin-images/undraw_void_-3-ggu.svg"} />
                        <h1>Nenhuma planilha foi encontrada.</h1>
                        <p>Entre em contato com o desenvolvedor ou tente novamente mais tarde.</p>
                    </div>
                    :
                    <>
                        <div className="newItem">
                            <div className="headeritem">
                                <div className="side1item">
                                    <h1>{itemId ? 'Editando' : 'Adicionar'} um Item</h1>
                                    <p>Preencha todos os dados para adicionar o item ao banco de dados.</p>
                                </div>
                                <div>
                                    {AddItemOpen
                                        ?
                                        <button onClick={() => {
                                            setAddItemOpen(false)
                                        }}><i className="fa-solid fa-minus"></i></button>
                                        :
                                        <button onClick={() => {
                                            setAddItemOpen(true)
                                        }}><i className="fa-solid fa-plus"></i></button>
                                    }


                                </div>

                            </div>
                            {AddItemOpen
                                ?
                                <div className="exboxitem">
                                    <p>Código:</p>
                                    <input
                                        type="text"
                                        value={currentItem.codigo}
                                        onChange={(e) => setCurrentItem({ ...currentItem, codigo: e.target.value })}
                                    />
                                    <p>Nome do Item:</p>
                                    <input
                                        type="text"
                                        value={currentItem.nameofitem}
                                        onChange={(e) => setCurrentItem({ ...currentItem, nameofitem: e.target.value })}
                                    />
                                    <p>Detalhe:</p>
                                    <input
                                        type="text"
                                        value={currentItem.detalhe}
                                        onChange={(e) => setCurrentItem({ ...currentItem, detalhe: e.target.value })}
                                    />
                                    <p>Preço de Compra:</p>
                                    <input
                                        type="number"
                                        value={currentItem.preco_compra}
                                        onChange={(e) => setCurrentItem({ ...currentItem, preco_compra: e.target.value })}
                                    />
                                    <p>Custos:</p>
                                    <input
                                        type="number"
                                        value={currentItem.custos}
                                        onChange={(e) => setCurrentItem({ ...currentItem, custos: e.target.value })}
                                    />
                                    <p>Preço de Revenda:</p>
                                    <input
                                        type="number"
                                        value={currentItem.precorevenda}
                                        onChange={(e) => setCurrentItem({ ...currentItem, precorevenda: e.target.value })}
                                    />
                                    <p>Quantidade de Compra:</p>
                                    <input
                                        type="number"
                                        value={currentItem.quantcompra}
                                        onChange={(e) => setCurrentItem({ ...currentItem, quantcompra: e.target.value })}
                                    />
                                    <p>Lucro por Item:</p>
                                    <input
                                        type="number"
                                        value={currentItem.lucroporitem}
                                        onChange={(e) => setCurrentItem({ ...currentItem, lucroporitem: e.target.value })}
                                    />
                                    <button onClick={handleSave}>Salvar</button>
                                </div>
                                :
                                null}

                        </div>


                        <table className="item-table">
                            <thead className="titlecolumns">
                                <tr>
                                    <th>Código</th>
                                    <th>Nome do Item</th>
                                    <th>Detalhe</th>
                                    <th>Preço de Compra</th>
                                    <th>Custos</th>
                                    <th>Preço de Revenda</th>
                                    <th>Quantidade de Compra</th>
                                    <th>Lucro por Item</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr id={item.id} key={item.id}>
                                        <td id="bggray">{item.codigo}</td>
                                        <td>{item.nameofitem}</td>
                                        <td id="bggray">{item.detalhe}</td>
                                        <td>R$ {item.preco_compra}</td>
                                        <td id="bggray">R$ {item.custos}</td>
                                        <td>R$ {item.precorevenda}</td>
                                        <td id="bggray">{item.quantcompra}</td>
                                        <td id="lucrolinha">R$ {item.lucroporitem}</td>
                                        <td>
                                            <button onClick={() => handleEdit(item)}><i className="fa-solid fa-pen-to-square"></i></button>
                                            <button onClick={() => handleDeleteItem(item)}><i className="fa-solid fa-trash"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>}
            </div>
        </div>
    );
}
