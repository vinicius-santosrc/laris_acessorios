import React, { useEffect, useState } from "react";
import db, { getUserData } from "../lib/appwrite";
import { useParams } from "react-router-dom";
import NavigationLeft from "../components/AdminPage/NavigationLeft";
import Swal from "sweetalert2";
import { ID } from "appwrite";

export default function PlanilhaPage() {
    const [user, setUser] = useState(null)
    const [status, userStatus] = useState(null)
    const [userDB, setUserDBAccount] = useState([])

    useEffect(() => {
        getUserData()
            .then((account) => {

                setUser(account)
                userStatus(account.status ? 'Online' : 'Offline')
                db.getDocument(
                    "651ca99af19b7afad3f1",
                    "652102213eeea3189590",
                    account.$id
                )
                    .then((r) => {
                        setUserDBAccount(r)
                    })

                if (!account) {
                    window.location.href = window.location.origin + "/admin/login"
                }
            })

    })

    const { planilha } = useParams();
    const DBUID = '651ca99af19b7afad3f1';
    const [AddItemOpen, setAddItemOpen] = useState(false)

    const collectionMap = {
        "planilha-itens": "6524bc3a390afb07a756",
        // Adicione mais mapeamentos conforme necessário
    };

    const collectionId = collectionMap[planilha.toLowerCase()]; // planilha é o nome da coleção


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

    useEffect(() => {
        loadItens();
    }, []);

    const handleEdit = (item) => {
        setCurrentItem(item);
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
            .catch(console.error);
    };

    const handleSave = () => {
        if (!currentItem.codigo || !currentItem.nameofitem || !currentItem.detalhe || !currentItem.preco_compra || !currentItem.custos || !currentItem.precorevenda || !currentItem.quantcompra || !currentItem.lucroporitem) {
            Swal.fire("Preencha todos os campos!");
            return;
        }

        if (itemId) {
            // Atualize o item no Appwrite
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
        } else {
            // Crie um novo item no Appwrite sem especificar o ID
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
                .catch(console.error);
        }
    };

    const loadItens = () => {
        db
            .listDocuments(DBUID, collectionId)
            .then((response) => {
                setItems(response.documents);

            })
            .catch(console.error);
    };

    return (
        <div className="AdminPage-DashBoard">
            <NavigationLeft />
            <div className="Admin-ContentDashBoard">
                {!collectionId
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
                                            <button onClick={() => handleDelete(item)}><i className="fa-solid fa-trash"></i></button>
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