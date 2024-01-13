import React, { useEffect, useState } from "react";
import db, { getUserData } from "../lib/appwrite";
import { useParams } from "react-router-dom";
import NavigationLeft from "../components/AdminPage/NavigationLeft";
import Swal from "sweetalert2";
import { ID, Query } from "appwrite";
import { getPlanilhaDespesas, getUser } from "../lib/database";

export default function PlanilhaPage() {
    const [user, setUser] = useState(null)
    const [status, userStatus] = useState(null)
    const [userDB, setUserDBAccount] = useState([])
    const [saldoWrap, setSaldo] = useState(0)
    const [entradasWrap, setEntradas] = useState(0)
    const [saidasWrap, setSaidas] = useState(0)

    useEffect(() => {
        getUserData()
            .then(async (account) => {
                setUser(account)
                userStatus(account.status ? 'Online' : 'Offline')
                const user = await getUser(account.email)
                setUserDBAccount(user)
                if (!account) {
                    window.location.href = window.location.origin + "/admin/login"
                }
            })

    }, [])

    const collectionId = ''

    const { planilha } = useParams();
    const DBUID = '651ca99af19b7afad3f1';

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
        tipo: "Receita",

    });

    useEffect(() => {
        loadItens();
    }, []);

    const handleEdit = (item) => {
        setCurrentItem(item);
        setcurrentItemDESPESAS(item);
        setItemId(item.$id)
        setAddItemOpen(true)
    };

    const handleDelete = (item) => {
        if (!item.$id) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'O item não possui um ID válido para exclusão! Contate um desenvolvedor.',
                footer: '<a href="errors">Por que deste erro?</a>'
            })
            return;
        }


        db
            .deleteDocument(DBUID, collectionId, item.$id)
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
    };

    const handleSave = () => {
        if (planilha == "planilha-itens") {
            if (!currentItem.codigo || !currentItem.nameofitem || !currentItem.detalhe || !currentItem.preco_compra || !currentItem.custos || !currentItem.precorevenda || !currentItem.quantcompra || !currentItem.lucroporitem) {
                Swal.fire("Preencha todos os campos!");
                return;
            }
        }

        if (planilha == "planilha-despesas") {
            if (!currentItemDESPESAS.descricao || !currentItemDESPESAS.valor || !currentItemDESPESAS.tipo) {
                Swal.fire("Preencha todos os campos!");
                return;
            }
        }

        if (itemId) {
            // Atualize o item no Appwrite
            if (planilha == "planilha-itens") {
                db
                    .updateDocument(DBUID, collectionId, itemId, {
                        codigo: currentItem.codigo,
                        nameofitem: currentItem.nameofitem,
                        detalhe: currentItem.detalhe,
                        preco_compra: currentItem.preco_compra,
                        custos: currentItem.custos,
                        precorevenda: currentItem.precorevenda,
                        quantcompra: currentItem.quantcompra,
                        lucroporitem: currentItem.lucroporitem,
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
                db
                    .updateDocument(DBUID, collectionId, itemId, {
                        descricao: currentItemDESPESAS.descricao,
                        valor: currentItemDESPESAS.valor,
                        tipo: currentItemDESPESAS.tipo,
                    })
                    .then(() => {
                        loadItens();
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
                db
                    .createDocument(DBUID, collectionId, ID.unique(), { ...currentItem })
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
                fetch('https://api-laris-acessorios.vercel.app/api/add/planilha-despesas', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ currentItemDESPESAS }),
                })
                    .then(() => {
                        Swal.fire("Item criado com sucesso!");
                        loadItens();
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

    let entradas = 0; // Inicialize as variáveis aqui
    let saidas = 0;
    let saldototal = entradas - saidas;

    useEffect(() => {
        async function getTotal() {
            const PlanilhaDespesa = await getPlanilhaDespesas();

            //SETAR PLANILHAS ENTRADAS E SAIDAS
            PlanilhaDespesa.map((r) => {
                if (r.tipo === "Receita") {
                    entradas += Number(r.valor);
                } else {
                    saidas += Number(r.valor);
                }
            });

        }
        getTotal()
    }, []);

    const loadItens = async () => {
        if (planilha == 'planilha-despesas') {
            const Items = await getPlanilhaDespesas();
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
                            <img src={window.location.origin + "/static/media/admin-images/undraw_void_-3-ggu.svg"} />
                            <h1>Nenhuma planilha foi encontrada.</h1>
                            <p>Entre em contato com o desenvolvedor ou tente novamente mais tarde.</p>
                        </div>
                        :
                        <>
                            <div class="newItem">
                                <h3>Entradas: R$<span id="entradas">{entradasWrap.toFixed(2)}</span></h3>
                                <h3>Saídas: R$<span id="saidas">{saidasWrap.toFixed(2)}</span></h3>
                                <h3 id="saldoh3">Saldo: R$<span>{saldoWrap.toFixed(2)}</span></h3>
                            </div>
                            <div class="newItem">
                                <div class="headeritem">
                                    <div class="side1item">
                                        <h1>Adicionar um Item</h1>
                                        <p>Preencha todos os dados para adicionar o item ao banco de dados.</p>
                                    </div>
                                    <div>
                                        {AddItemOpen
                                            ?
                                            <button onClick={() => {
                                                setAddItemOpen(false)
                                            }}><i class="fa-solid fa-minus"></i></button>
                                            :
                                            <button onClick={() => {
                                                setAddItemOpen(true)
                                            }}><i class="fa-solid fa-plus"></i></button>
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
                                        <button onClick={handleSave}>Salvar</button>
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
                                        <tr className={item.tipo == "Receita" ? "color-green-receita" : "red-color-despesa"} id={item.$id} key={item.$id}>
                                            <td id="bggray">{item.descricao}</td>
                                            <td>R$ {item.valor}</td>
                                            <td id="bggray">
                                                {item.tipo == 'Receita'
                                                    ?
                                                    <>
                                                        <i class="fa-solid fa-circle-chevron-up"></i>
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
                        <div class="newItem">
                            <div class="headeritem">
                                <div class="side1item">
                                    <h1>Adicionar um Item</h1>
                                    <p>Preencha todos os dados para adicionar o item ao banco de dados.</p>
                                </div>
                                <div>
                                    {AddItemOpen
                                        ?
                                        <button onClick={() => {
                                            setAddItemOpen(false)
                                        }}><i class="fa-solid fa-minus"></i></button>
                                        :
                                        <button onClick={() => {
                                            setAddItemOpen(true)
                                        }}><i class="fa-solid fa-plus"></i></button>
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
                                    <tr id={item.$id} key={item.$id}>
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
