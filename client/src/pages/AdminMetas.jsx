/**
 * Creation Date: 14/01/2024
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

import { useEffect, useState } from "react";
import NavigationLeft from "../components/AdminPage/NavigationLeft";
import db from "../lib/appwrite";
import { Ring } from '@uiball/loaders'
import { ID } from "appwrite";
import Swal from "sweetalert2";
import { auth } from "../lib/firebase";
import { GetUserAtual } from "../lib/database";
import { users } from "../constants/users_const";

export default function AdminMetas() {

    const [saldoAtual, setSaldoAtual] = useState(0);
    const [MetaPrincipal, setMetaPrincipal] = useState(0);
    const [SaldoTotal, setSaldo] = useState(0);
    const [MetasSecundarias, setMetasSecundarias] = useState(null);
    const [MetasFixadas, setMetasFixadas] = useState([]);
    const [addMeta, setaddMeta] = useState(false);
    const [newMeta, setNewMeta] = useState('Nova Meta');
    const [newMetaAnual, setNewMetaAnual] = useState(0);
    const [newMetaMensal, setNewMetaMensal] = useState(0);
    const [userAtual, setuserAtual] = useState([]);

    const DBUID = "651ca99af19b7afad3f1";
    const collectionMetas = "6526fb79b32651e0087a";
    const collectionSaldo = "6526ef810e37b1d693c1"

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const res = await GetUserAtual(user.uid);
                    setuserAtual(res);

                    if(window.location.origin.includes("admin") && res.label !== "admin" && users.admin.permissions.adminpage.canRead == 1) {
                        window.location.href = window.location.origin
                    }
                } catch (error) {
                    console.warn("Erro ao pegar usuário: ", error);
                    window.location.href = window.location.origin
                }
            } else {
                setuserAtual(null);
                if(window.location.origin.includes("admin")) {
                    window.location.href = window.location.origin
                }
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        let entradas = 0; // Inicialize as variáveis aqui
        let saidas = 0;

        db.getDocument(
            DBUID,
            collectionMetas,
            "6529bb6b64c8490376bd"
        )
            .then((res) => {
                setMetaPrincipal(res)
            })

        db
            .listDocuments(
                DBUID,
                collectionSaldo
            )
            .then((response) => {
                response.documents.map((r) => {
                    if (r.tipo === "Receita") {
                        entradas += Number(r.valor);
                    } else {
                        saidas += Number(r.valor);
                    }
                });
                const saldototal = entradas - saidas;
                setSaldo(saldototal);
            })
            .catch(console.error);


    }, [])



    useEffect(() => {
        db.listDocuments(
            DBUID,
            collectionMetas
        )
            .then((res) => {
                setMetasFixadas(res.documents.map((response) => {
                    if (response.meta_name == 'META_MENSAL' || response.fixed == false) {
                        return
                    }
                    else {
                        if (SaldoTotal >= response.anual && SaldoTotal >= response.mensal) {
                            return (
                                <div className="meta-card" id="greenbackground-card-metas">
                                    <a href={window.location.origin + '/admin/metas/' + response.$id}>
                                        <div className="top-card-meta">
                                            <h1> {response.meta_name}</h1>
                                        </div>
                                        <p>Parabéns! Você atingiu essa meta.</p>
                                        <p>Anual: <span>R${response.anual}</span></p>
                                        <p>Mensal: <span>R${response.mensal}</span></p>


                                    </a>

                                </div>
                            )
                        }
                        else {
                            return (
                                <div className="meta-card">
                                    <a href={window.location.origin + '/admin/metas/' + response.$id}>
                                        <div className="top-card-meta">
                                            <h1> {response.meta_name}</h1>
                                        </div>
                                        <p>Anual: <span>R${response.anual}</span></p>
                                        <p>Mensal: <span>R${response.mensal}</span></p>

                                    </a>

                                </div>
                            )
                        }
                    }
                }))
            })
    }, [SaldoTotal])

    useEffect(() => {
        db.listDocuments(
            DBUID,
            collectionMetas
        )
            .then((res) => {
                setMetasSecundarias(res.documents.map((response) => {
                    if (response.meta_name == 'META_MENSAL' || response.fixed == true) {
                        return
                    }
                    else {
                        if (SaldoTotal >= response.anual && SaldoTotal >= response.mensal) {
                            return (
                                <div className="meta-card" id="greenbackground-card-metas">
                                    <a href={window.location.origin + '/admin/metas/' + response.$id}>
                                        <div className="top-card-meta">
                                            <h1> {response.meta_name}</h1>
                                        </div>
                                        <p>Parabéns! Você atingiu essa meta.</p>
                                        <p>Anual: <span>R${response.anual}</span></p>
                                        <p>Mensal: <span>R${response.mensal}</span></p>


                                    </a>

                                </div>
                            )
                        }
                        else {
                            return (
                                <div className="meta-card">
                                    <a href={window.location.origin + '/admin/metas/' + response.$id}>
                                        <div className="top-card-meta">
                                            <h1> {response.meta_name}</h1>
                                        </div>
                                        <p>Anual: <span>R${response.anual}</span></p>
                                        <p>Mensal: <span>R${response.mensal}</span></p>

                                    </a>

                                </div>
                            )
                        }
                    }
                }))
            })
    }, [SaldoTotal])

    function handleCreateMeta(e) {
        e.preventDefault()
        db.createDocument(
            DBUID,
            collectionMetas,
            ID.unique(),
            {
                meta_name: newMeta,
                anual: newMetaAnual,
                mensal: newMetaMensal,
                fixed: false
            }
        )
            .then((r) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: 'Você criou uma meta.',

                })
                    .then((r) => {
                        window.location.reload()
                    })
            })
            .catch((e) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Não foi possível criar uma meta. Contate um Desenvolvedor.',
                    footer: '<a href="../errors">Por que deste erro?</a>'
                })
            })
    }


    return (
        <div className="AdminPage-DashBoard">
            <NavigationLeft />
            <div className="Content-Page-Metas">
                <section className="card-saldo-disponivel" onClick={() => {
                    window.location.href = window.location.origin + "/admin/planilhas/planilha-despesas"
                }}>
                    <h2>Saldo disponível</h2>
                    <p>R$<span>{SaldoTotal.toFixed(2)}</span></p>
                </section>
                {addMeta ?
                    <div className="add-meta">
                        <form onSubmit={(e) => { handleCreateMeta(e) }}>
                            <div className="title-create-metas">
                                <h2>Criação de Metas</h2>
                                <button onClick={() => {
                                    setaddMeta(false)
                                }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.46967 5.46967C5.76256 5.17678 6.23744 5.17678 6.53033 5.46967L12 10.9393L17.4697 5.46967C17.7626 5.17678 18.2374 5.17678 18.5303 5.46967C18.8232 5.76256 18.8232 6.23744 18.5303 6.53033L13.0607 12L18.5303 17.4697C18.8232 17.7626 18.8232 18.2374 18.5303 18.5303C18.2374 18.8232 17.7626 18.8232 17.4697 18.5303L12 13.0607L6.53033 18.5303C6.23744 18.8232 5.76256 18.8232 5.46967 18.5303C5.17678 18.2374 5.17678 17.7626 5.46967 17.4697L10.9393 12L5.46967 6.53033C5.17678 6.23744 5.17678 5.76256 5.46967 5.46967Z" fill="#0F172A" />
                                    </svg>
                                </button>
                            </div>
                            <input type='text' placeholder='Nome da Meta' value={newMeta} required onChange={e => setNewMeta(e.target.value)} />
                            <br />
                            <input type='number' placeholder='Meta Anual' value={newMetaAnual} required onChange={e => setNewMetaAnual(e.target.value)} />
                            <br />
                            <input type='number' placeholder='Meta Mensal' value={newMetaMensal} required onChange={e => setNewMetaMensal(e.target.value)} />
                            <br />
                            <button type="submit">Criar Meta</button>
                        </form>
                    </div>
                    :
                    <></>}
                <h1 className="title-section">Metas Principais</h1>
                <section className="meta-principal">
                    <div className="meta-card">
                        <a href={window.location.origin + '/admin/metas/' + MetaPrincipal.$id}>
                            <div className="top-card-meta">
                                <h1><i className="fa-solid fa-flag"></i> Meta Mensal e Anual</h1>
                            </div>
                            <p>Anual: <span>R${MetaPrincipal.anual}</span></p>
                            <p>Mensal: <span>R${MetaPrincipal.mensal}</span></p>

                        </a>

                    </div>
                    {MetasFixadas}
                    <div className="meta-card-add" onClick={() => {
                        setaddMeta(true)
                    }}>
                        <h2>ADICIONAR <i className="fa-solid fa-plus"></i></h2>
                    </div>
                </section>
                <h1 className="title-section">Metas Secundárias</h1>
                <section className="metas-secundarias">
                    {!MetasSecundarias ?
                        <Ring
                            size={40}
                            lineWeight={5}
                            speed={2}
                            color="#EF59A0"
                        />
                        :
                        <>{MetasSecundarias}</>
                    }
                </section>
            </div>
        </div>
    )
}