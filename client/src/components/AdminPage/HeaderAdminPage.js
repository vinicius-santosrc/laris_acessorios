/**
 * Creation Date: 09/01/2024
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

import React, { useEffect, useState } from "react"
import db, { getUserData } from "../../lib/appwrite"
import { GetUserAtual } from "../../lib/database";
import { auth } from "../../lib/firebase";

export default function HeaderAdminPage() {
    const [user, setUser] = useState(null)
    const [status, setStatus] = useState('Online')

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const res = await GetUserAtual(user.uid);
                    setUser(res);
                } catch (error) {
                    console.warn("Erro ao pegar usuário: ", error);
                    window.location.href = window.location.origin
                }
            } else {
                setUser(null);
                if (window.location.origin.includes("admin")) {
                    window.location.href = window.location.origin
                }
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <header>
            <div className="leftside-header">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input placeholder="Buscar" />
            </div>
            <div className="right-side-header">
                {auth.currentUser && user ?
                    <>
                        <button><i class="fa-regular fa-bell" onclick="notificacaoopen()"></i></button>
                        <button onClick={() => {auth.signOut(); window.location.href = window.location.origin + "/admin/login"}}>leave account</button>
                        <div>
                            <a className="account-details-header" href="#">
                                <img src={user.photoURL} alt="avatar image"/>
                                <div className="flex-details-account">
                                    <p>{user.nome_completo}</p>
                                    {status == "Online" ?
                                        <p id="useronline">Conectado</p>
                                        :
                                        <p id="useroffline">Sem conexão</p>
                                    }
                                </div>
                            </a>


                        </div>
                    </>
                    :
                    <></>
                }

            </div>
        </header >
    )
}