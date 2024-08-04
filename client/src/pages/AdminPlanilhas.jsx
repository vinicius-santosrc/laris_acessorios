import React, { useEffect, useState } from "react";
import NavigationLeft from "../components/AdminPage/NavigationLeft";
import db, { getUserData } from "../lib/appwrite";
import { getUser, GetUserAtual } from "../lib/database";
import Loading from "../components/AdminPage/Loading";
import { auth, CheckIfUserIsLogged } from "../lib/firebase";




export default function AdminPlanilhas() {
    const [user, setUser] = useState(null)
    const [status, userStatus] = useState(null)
    const [userDB, setUserDBAccount] = useState([])

    const DBUID = '651ca99af19b7afad3f1';
    const PRODUTOSUID = '651ca9adf3de7aad17d9';


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
        <div className="AdminPage-DashBoard">
            <NavigationLeft />
            <section className="Admin-ContentDashBoard">
                <div className="right-side-flex-box">
                    <img src={window.location.origin + "/static/media/admin-images/undraw_organizing_projects_re_9p1k.svg"} />
                    <h1>PLANILHAS</h1>
                    <h2>Organize, Planeje e Crie</h2>
                </div>
                <div className="left-side-flex-box">
                    <div className="exists-planilhas">
                        <h4>Planilhas Existentes</h4>
                        <div className="planilhas-exists-flex">
                            <button onClick={() => { window.location.href = '/admin/planilhas/planilha-itens' }}>
                                <h2><i className="fa-regular fa-gem"></i> Planilha Itens</h2>
                                <p>Armazenamento de dados de itens para compras</p>

                            </button>
                            <button onClick={() => { window.location.href = '/admin/planilhas/planilha-despesas' }}>
                                <h2><i className="fa-solid fa-hand-holding-dollar"></i> Planilha de Despesas</h2>
                                <p>Despesas e Receitas</p>

                            </button>
                        </div>


                    </div>
                </div>
            </section>
        </div>
    )
}