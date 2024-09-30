/**
 * Creation Date: 09/01/2024
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

import { useEffect, useState } from "react"
import db, { getUserData } from "../../lib/appwrite"
import { GetUserAtual } from "../../lib/database";
import { auth } from "../../lib/firebase";

export default function HeaderAdminPage() {
    const [user, setUser] = useState(null)
    const [status, setStatus] = useState('Online')

    useEffect(() => {
        const GetAtual = async () => {
            const response = await GetUserAtual(auth.currentUser.uid);
            setUser(response);
            console.log(response);
        }

        GetAtual()

    }, [])

    return (
        <>
            <header>
                <div className="leftside-header">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input placeholder="Buscar" />
                    <img src="" />
                </div>
                <div className="right-side-header">
                    {auth.currentUser && user ?
                        <>
                            <button><i class="fa-regular fa-bell" onclick="notificacaoopen()"></i></button>
                            <div>
                                <a className="account-details-header" href="#">
                                    <img src={user.photoURL} />
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
        </>
    )
}