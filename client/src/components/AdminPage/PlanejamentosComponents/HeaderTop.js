/**
 * Creation Date: 09/01/2024
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

import { useEffect, useState } from "react"
import db, { getUserData } from "../../../lib/appwrite"
import Loading from "../Loading"
import { auth, CheckIfUserIsLogged } from "../../../lib/firebase"
import { GetUserAtual } from "../../../lib/database"

export default function HeaderTop() {
    const [user, setUser] = useState(null)
    const [status, userStatus] = useState(null)
    const [userDB, setUserDBAccount] = useState([])




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

    return (
        <div className="header-planejamentos-all">
            <div className="header-planejamentos">
                <div className="left-side-header-planejemanetos">
                    <div className="LogoPlanejamentos">
                        <img src={window.location.origin + "/static/media/logoplanejamentos.png"} />

                    </div>
                    <div className="wrap-buttons-header">
                        <button>Áreas de trabalho <i className="fa-solid fa-angle-down"></i></button>
                    </div>
                </div>
                <div className="right-side-header-show-options">
                    <div className="PHOTOURL0_USERATUAL">
                        <img src={userDB.PHOTOURL} />
                    </div>
                </div>
            </div>
            <div className="header-bottom">
                <div className="leftside-header-bottom">
                    <div className="wrap-name-atual">
                        <h2><i className="fa-solid fa-gem"></i> SEMANA LARI'S</h2>
                    </div>
                </div>
                <div className="rightside-header-bottom">
                    <div className="wrap-photos-atual">
                        {userDB.USUARIO == "vinicius_santoscs"
                            ?
                            <>
                                <img src='https://laris-acessorios.vercel.app/static/media/admin-images/users-images/fa6a33e4-a017-4cec-9f73-15a862b3f550.webp' />
                                <img src={userDB.PHOTOURL} />
                            </>
                            :
                            <>
                                <img src='https://laris-acessorios.vercel.app/static/media/admin-images/users-images/526a3551-95ea-4cea-a979-fbadcbbb5d9d.webp' />
                                <img src={userDB.PHOTOURL} />
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}