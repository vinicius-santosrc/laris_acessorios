/**
 * Creation Date: 13/01/2024
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

import { useParams } from "react-router-dom";
import NavigationLeft from "../components/AdminPage/NavigationLeft";
import { useEffect, useState } from "react";
import db from "../lib/appwrite";
import Swal from "sweetalert2";
import { Ring } from '@uiball/loaders'
import { users } from "../constants/users_const";
import { GetUserAtual } from "../lib/database";
import { auth } from "../lib/firebase";

export default function AdminMetasMeta() {
    const { meta } = useParams();
    const [userAtual, setuserAtual] = useState([]);
    const [MetaAtual, setMetaAtual] = useState([]);
    const [AnualMetaAtual, setAnualMetaAtual] = useState(0);
    const [MensalMetaAtual, setMensalMetaAtual] = useState(0);
    const [FixadoMetaAtual, setFixadoMetaAtual] = useState(null);

    const [StartMetaAnual, setStartMetaAnual] = useState(0);
    const [StartMetaMensal, setStartMetaMensal] = useState(0);
    const [StartFixadoMetaAtual, setStartFixadoMetaAtual] = useState(0);

    const DBUID = "651ca99af19b7afad3f1";
    const collectionMetas = "6526fb79b32651e0087a";

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
        db.getDocument(
            DBUID,
            collectionMetas,
            meta
        )
            .then((res) => {
                setMetaAtual(res);
                setAnualMetaAtual(res.anual);
                setMensalMetaAtual(res.mensal);
                setStartMetaAnual(res.anual);
                setStartMetaMensal(res.mensal);
                setFixadoMetaAtual(res.fixed);
                setStartFixadoMetaAtual(res.fixed);
            })
    }, [])

    function handleChangeAnual(e) {
        setAnualMetaAtual(e.target.value)
    }

    function handleChangeMensal(e) {
        setMensalMetaAtual(e.target.value)

    }

    function SaveMetaAtual() {
        Swal.fire({
            showConfirmButton: false,
            title: 'Carregando'


        })
        db.updateDocument(
            DBUID,
            collectionMetas,
            meta,
            {
                anual: parseFloat(AnualMetaAtual),
                mensal: parseFloat(MensalMetaAtual),
                fixed: FixadoMetaAtual == 'true'
            }
        )
            .then((r) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Alterações salvas com sucesso!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch((r) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Não foi possível salvar as alterações. Contate um Desenvolvedor.',
                    footer: '<a href="../admin/errors">Why do I have this issue?</a>'
                })
            })

    }

    function ExcluirMetaAtual() {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Você tem certeza?',
            text: "Não será possível recuperar os dados!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não, cancelar!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                db.deleteDocument(
                    DBUID,
                    collectionMetas,
                    meta
                ).then((r) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Sua meta foi excluída',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        window.location.href = "../metas"
                    })


                }).catch((r) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Não foi possível excluir. Contate um Desenvolvedor.',
                        footer: '<a href="../admin/errors">Por que está aparecendo esse erro?</a>'
                    })
                })

            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {

            }
        })

    }

    if (!MetaAtual.meta_name) {
        return (
            <div className="AdminPage-DashBoard">
                <NavigationLeft />
                <Ring
                    size={40}
                    lineWeight={5}
                    speed={2}
                    color="#EF59A0"
                />
            </div>
        )
    }

    function changeFixado(e) {
        setFixadoMetaAtual(e.target.value)
    }

    return (
        <div className="AdminPage-DashBoard">
            <NavigationLeft />
            <div className="editMeta">
                <h2>{MetaAtual.fixed ? <i className="fa-solid fa-thumbtack"></i> : null} {MetaAtual.meta_name == "META_MENSAL" ? "META ANUAL E MENSAL" : MetaAtual.meta_name} </h2>
                <div className="inpts">
                    <p>Anual</p>
                    <input type="number" value={AnualMetaAtual} onChange={(e) => { handleChangeAnual(e) }} />
                    <p>Mensal</p>
                    <input type="number" value={MensalMetaAtual} onChange={(e) => { handleChangeMensal(e) }} />
                </div>
                {AnualMetaAtual == StartMetaAnual && StartMetaMensal == MensalMetaAtual && StartFixadoMetaAtual == FixadoMetaAtual ?
                    null
                    :
                    <button onClick={SaveMetaAtual}>Salvar Alterações</button>
                }

                {MetaAtual.meta_name == "META_MENSAL"
                    ?
                    null
                    :
                    <select value={FixadoMetaAtual} onChange={(e) => {
                        changeFixado(e)
                    }}>
                        <option value={true}>Fixado</option>
                        <option value={false}>Não fixado</option>
                    </select>
                }

                {MetaAtual.meta_name == "META_MENSAL"
                    ?
                    null
                    :
                    <button onClick={ExcluirMetaAtual}>EXCLUIR</button>
                }

            </div>
        </div>
    )
}